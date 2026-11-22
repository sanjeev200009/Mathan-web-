"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { GROUPS, PRODUCTS, addToBasket, productById, rs, useBasket } from "@/lib/shop";
import ProductCard from "./ProductCard";

// One vegetable's page: the photo large, its price per unit, how many, then "Add to basket" (stay) or
// "Buy now" (add and go straight to the order). Below, more from the same group.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

const WORDS = {
  en: {
    shop: "All vegetables",
    qty: "How many",
    add: "Add to basket",
    added: "Added to your basket",
    buy: "Buy now",
    inBasket: (n: number) => `${n} already in your basket`,
    view: "View basket",
    perks: ["Order today, at your door tomorrow", "Pay when your order arrives", "Picked fresh from local farms"],
    more: "More like this",
    total: "Total",
  },
  ta: {
    shop: "அனைத்து காய்கறிகள்",
    qty: "எத்தனை",
    add: "கூடையில் சேர்",
    added: "உங்கள் கூடையில் சேர்க்கப்பட்டது",
    buy: "இப்போதே வாங்கு",
    inBasket: (n: number) => `ஏற்கனவே ${n} உங்கள் கூடையில்`,
    view: "கூடையைப் பார்",
    perks: ["இன்று ஆர்டர், நாளை உங்கள் கதவில்", "பொருள் வந்த பிறகே பணம்", "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக"],
    more: "இது போன்றவை",
    total: "மொத்தம்",
  },
};

export default function ProductView({ id, t, lang }: { id: string; t: Dictionary; lang: Locale }) {
  const p = productById(id)!;
  const w = WORDS[lang];
  const router = useRouter();
  const { lines } = useBasket();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const group = t.nav[0].links[GROUPS.indexOf(p.group)];
  const others = PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => Number(b.group === p.group) - Number(a.group === p.group)).slice(0, 4);
  const already = lines[p.id] ?? 0;

  const add = () => {
    addToBasket(p.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={{ fontFamily: OS }}>
      <section className="frame grid gap-8 pb-16 pt-[clamp(20px,4vh,40px)] lg:grid-cols-2 lg:gap-16">
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-[14px] text-[#5b6460]">
            <Link href={`/${lang}/vegetables/`} className="hover:text-[#1c2a1e] hover:underline">
              {w.shop}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}${group.href}`} className="hover:text-[#1c2a1e] hover:underline">
              {group.label}
            </Link>
          </nav>
          <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.name[lang]} fetchPriority="high" className="size-full object-contain p-[8%] mix-blend-multiply" />
          </div>
        </div>

        <div className="lg:pt-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#4f7047]">{group.label}</p>
          <h1 className="mt-2 text-[clamp(34px,4vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1c2a1e]">{p.name[lang]}</h1>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-[clamp(28px,2.6vw,38px)] font-bold text-[#1c2a1e]">{rs(p.price)}</span>
            <span className="text-[16px] text-[#999fa6]">/ {p.unit[lang]}</span>
          </p>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.65] text-[#5b6460]">{p.line[lang]}</p>

          <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-[#e2e6dc] pt-6">
            <div>
              <p className="text-[14px] text-[#5b6460]">
                {w.qty} ({p.unit[lang]})
              </p>
              <div className="mt-2 flex h-12 items-center rounded-[10px] border border-[#dbdee5] bg-white">
                <button type="button" aria-label="-" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-12 text-[22px] hover:bg-[#eef3e3]">
                  −
                </button>
                <span className="w-10 text-center text-[17px] font-bold tabular-nums">{qty}</span>
                <button type="button" aria-label="+" onClick={() => setQty((q) => Math.min(50, q + 1))} className="h-full w-12 text-[22px] hover:bg-[#eef3e3]">
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-[14px] text-[#5b6460]">{w.total}</p>
              <p className="mt-2 text-[28px] font-bold leading-[48px] tabular-nums text-[#1c2a1e]">{rs(p.price * qty)}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={add}
              className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-[10px] bg-[#4f7047] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#3d5a37]"
            >
              {added ? `✓ ${w.added}` : w.add}
            </button>
            <button
              type="button"
              onClick={() => {
                addToBasket(p.id, qty);
                router.push(`/${lang}/order/`);
              }}
              className="inline-flex h-14 items-center justify-center rounded-[10px] bg-[#cbec4b] px-7 text-[16px] font-semibold text-[#022a09] transition-colors hover:bg-[#d8f36a]"
            >
              {w.buy}
            </button>
          </div>
          {already > 0 && (
            <p className="mt-3 text-[14px] text-[#5b6460]">
              {w.inBasket(already)} ·{" "}
              <Link href={`/${lang}/order/`} className="font-semibold text-[#4f7047] underline">
                {w.view}
              </Link>
            </p>
          )}

          <ul className="mt-8 space-y-2.5">
            {w.perks.map((s) => (
              <li key={s} className="flex items-center gap-3 text-[15px] text-[#444]">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#e8efda] text-[#4f7047]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {others.length > 0 && (
        <section className="frame pb-24">
          <h2 className="text-[24px] font-bold text-[#1c2a1e]">{w.more}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {others.map((x) => (
              <ProductCard key={x.id} p={x} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
