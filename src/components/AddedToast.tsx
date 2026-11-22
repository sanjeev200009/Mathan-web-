"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/[lang]/dictionaries";
import { ADDED, productById, rs, useBasket } from "@/lib/shop";
import Veg from "./Veg";

// The "added" pop-up (owner, 22 Nov: buying must feel easy). Whatever adds to the basket - a card, the
// hero, the wheel, a product page - shows this for a few seconds: what went in, the basket's total, and a
// button straight to the order. It sits above the phone's bottom bars.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';
const WORDS = {
  en: { added: "Added to your basket", view: "View basket", close: "Close" },
  ta: { added: "உங்கள் கூடையில் சேர்க்கப்பட்டது", view: "கூடையைப் பார்", close: "மூடு" },
};

export default function AddedToast({ lang }: { lang: Locale }) {
  const w = WORDS[lang];
  const { count, total } = useBasket();
  const [shown, setShown] = useState<{ id: string; qty: number; n: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ id: string; qty: number }>).detail;
      setShown((s) => ({ ...d, n: (s?.n ?? 0) + 1 }));
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setShown(null), 3600);
    };
    window.addEventListener(ADDED, on);
    return () => {
      window.removeEventListener(ADDED, on);
      clearTimeout(timer.current);
    };
  }, []);

  const p = shown && productById(shown.id);
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-24 left-1/2 z-[60] w-[min(92vw,380px)] -translate-x-1/2 transition-all duration-300 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 ${
        p ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ fontFamily: OS }}
    >
      {p && (
        <div key={shown.n} className="enter flex items-center gap-3 rounded-[18px] border border-black/5 bg-white p-3 pr-4 shadow-[0_24px_60px_-20px_rgba(2,42,9,0.45)]">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-[#eef3e3]">
            <Veg kind={p.kind} className="size-11" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-semibold text-[#4f7047]">✓ {w.added}</p>
            <p className="truncate text-[15px] font-bold text-[#1c2a1e]">
              {p.name[lang]} × {shown.qty}
            </p>
            <p className="text-[12.5px] text-[#5b6460]">
              {count} · {rs(total)}
            </p>
          </div>
          <Link href={`/${lang}/order/`} onClick={() => setShown(null)} className="shrink-0 rounded-[10px] bg-[#4f7047] px-3.5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-[#3d5a37]">
            {w.view}
          </Link>
          <button type="button" aria-label={w.close} onClick={() => setShown(null)} className="-mr-1 text-[18px] leading-none text-[#999fa6] hover:text-[#1c2a1e]">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
