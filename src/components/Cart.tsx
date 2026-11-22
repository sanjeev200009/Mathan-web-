"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WHATSAPP } from "@/app/[lang]/dictionaries";
import type { Content } from "@/lib/content";
import { Icon } from "./icons";

// The cart (owner, 21 Nov: "add cart feature"). Lines are kept in this browser (localStorage) and the
// checkout is the order on WhatsApp with the whole list written out - the shop takes orders there.
// ponytail: no online payment yet; add a checkout page when payments are chosen.
export type CartLine = { id: string; name: string; price: number; unit: string; emoji?: string; qty: number };
type Add = Omit<CartLine, "qty">;

const KEY = "pasumai-cart-v1";
const Ctx = createContext<{
  lines: CartLine[];
  count: number;
  total: number;
  add: (l: Add) => void;
  setQty: (id: string, qty: number) => void;
  qtyOf: (id: string) => number;
  openDrawer: () => void;
} | null>(null);

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};

export default function CartProvider({ c, children }: { c: Content; children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // Read after hydration so server and browser first agree (an empty cart), then fill it in.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const add = useCallback((l: Add) => setLines((p) => (p.some((x) => x.id === l.id) ? p.map((x) => (x.id === l.id ? { ...x, qty: x.qty + 1 } : x)) : [...p, { ...l, qty: 1 }])), []);
  const setQty = useCallback((id: string, qty: number) => setLines((p) => (qty <= 0 ? p.filter((x) => x.id !== id) : p.map((x) => (x.id === id ? { ...x, qty } : x)))), []);
  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      add,
      setQty,
      qtyOf: (id: string) => lines.find((l) => l.id === id)?.qty ?? 0,
      openDrawer: () => setOpen(true),
    }),
    [lines, add, setQty],
  );

  const k = c.cart;
  const order = `${WHATSAPP.href}?text=${encodeURIComponent(
    `${k.order}\n${lines.map((l) => `- ${l.name} x${l.qty} (${l.unit}) = Rs. ${l.qty * l.price}`).join("\n")}\n${k.total}: Rs. ${value.total}`,
  )}`;

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={k.close}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-night/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          role="dialog"
          aria-label={k.title}
          className={`absolute right-0 top-0 flex h-full w-[min(420px,100%)] flex-col bg-white shadow-2xl transition-transform duration-500 ease-ui ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <h2 className="text-[22px] font-medium tracking-[-0.02em]">
              {k.title} <span className="text-muted">({value.count})</span>
            </h2>
            <button type="button" tabIndex={open ? 0 : -1} aria-label={k.close} onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-lg bg-mist hover:bg-night hover:text-white">
              <Icon name="close" className="size-5" />
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
              <span className="text-[56px]" aria-hidden="true">🛒</span>
              <p className="text-[17px] text-muted">{k.empty}</p>
            </div>
          ) : (
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-4 py-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-mist text-[28px]" aria-hidden="true">{l.emoji ?? "🥬"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] font-medium">{l.name}</p>
                    <p className="text-[13px] text-muted">
                      Rs. {l.price} · {l.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-mist p-1">
                    <button type="button" tabIndex={open ? 0 : -1} aria-label="-" onClick={() => setQty(l.id, l.qty - 1)} className="flex size-8 items-center justify-center rounded-full text-[18px] hover:bg-white">−</button>
                    <span className="w-6 text-center text-[15px] font-medium">{l.qty}</span>
                    <button type="button" tabIndex={open ? 0 : -1} aria-label="+" onClick={() => setQty(l.id, l.qty + 1)} className="flex size-8 items-center justify-center rounded-full text-[18px] hover:bg-white">+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && (
            <div className="border-t border-line p-6">
              <p className="flex items-center justify-between text-[18px] font-medium">
                <span>{k.total}</span>
                <span>Rs. {value.total.toLocaleString("en-US")}</span>
              </p>
              <a href={order} tabIndex={open ? 0 : -1} className="mt-4 flex h-13 items-center justify-center gap-2 rounded-lg bg-night text-[16px] font-medium text-white transition-colors hover:bg-deep">
                {k.checkout}
                <Icon name="arrow" className="size-4" />
              </a>
              <button type="button" tabIndex={open ? 0 : -1} onClick={() => lines.forEach((l) => setQty(l.id, 0))} className="mt-3 w-full text-center text-[14px] text-muted hover:text-night">
                {k.clear}
              </button>
            </div>
          )}
        </aside>
      </div>
    </Ctx.Provider>
  );
}

// The bag button in the top bar, with the number of items.
export function CartButton({ label, dark }: { label: string; dark?: boolean }) {
  const { count, openDrawer } = useCart();
  return (
    <button type="button" aria-label={label} onClick={openDrawer} className={`relative flex size-10 items-center justify-center rounded-lg transition-colors ${dark ? "bg-night/8 text-night hover:bg-night hover:text-white" : "bg-white/12 text-white hover:bg-white hover:text-night"}`}>
      <Icon name="bag" className="size-5" />
      {count > 0 && (
        <span key={count} className="absolute -right-1 -top-1 flex min-w-5 animate-[pop_300ms_ease-out] items-center justify-center rounded-full bg-lime px-1 text-[11px] font-semibold text-night">
          {count}
        </span>
      )}
    </button>
  );
}
