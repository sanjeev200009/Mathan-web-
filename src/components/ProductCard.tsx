"use client";

import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";
import { addToBasket, rs, setQty, useBasket, type Product } from "@/lib/shop";

// One vegetable in a list: the photo and name open its page, and the basket control sits right on the
// card - "Add" once, then - / + in place, so buying takes one click and never leaves the list.
export const CARD_WORDS = {
  en: { add: "Add", less: "One less", more: "One more", inBasket: "in basket" },
  ta: { add: "சேர்", less: "ஒன்று குறை", more: "ஒன்று கூட்டு", inBasket: "கூடையில்" },
};

export function Stepper({ id, qty, lang, big, wide }: { id: string; qty: number; lang: Locale; big?: boolean; wide?: boolean }) {
  const w = CARD_WORDS[lang];
  const h = big ? "h-12" : "h-10";
  return (
    <div className={`flex ${h} items-center justify-between overflow-hidden rounded-[10px] bg-[#4f7047] text-white ${wide ? "max-sm:w-full" : ""}`}>
      <button type="button" aria-label={w.less} onClick={() => setQty(id, qty - 1)} className={`${big ? "w-12" : "w-10"} h-full text-[20px] transition-colors hover:bg-[#3d5a37]`}>
        −
      </button>
      <span className="min-w-8 text-center text-[15px] font-bold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button type="button" aria-label={w.more} onClick={() => setQty(id, qty + 1)} className={`${big ? "w-12" : "w-10"} h-full text-[20px] transition-colors hover:bg-[#3d5a37]`}>
        +
      </button>
    </div>
  );
}

export default function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const { lines } = useBasket();
  const qty = lines[p.id] ?? 0;
  const href = `/${lang}/product/${p.id}/`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-[#e8ebe3] bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(2,42,9,0.45)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={p.name[lang]} loading="lazy" decoding="async" className="size-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        {qty > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#cbec4b] px-2.5 py-1 text-[12px] font-bold text-[#022a09]">
            {qty} {CARD_WORDS[lang].inBasket}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={href} className="text-[17px] font-bold leading-tight text-[#1c2a1e] hover:underline">
          {p.name[lang]}
        </Link>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#5b6460]">{p.line[lang]}</p>
        <div className="mt-auto flex flex-col items-stretch gap-2.5 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="whitespace-nowrap leading-none">
            <span className="text-[19px] font-bold text-[#1c2a1e]">{rs(p.price)}</span>
            <span className="ml-1 text-[13px] text-[#999fa6]">/ {p.unit[lang]}</span>
          </p>
          {qty > 0 ? (
            <Stepper id={p.id} qty={qty} lang={lang} wide />
          ) : (
            <button
              type="button"
              onClick={() => addToBasket(p.id)}
              className="flex h-10 items-center justify-center gap-1.5 rounded-[10px] bg-[#4f7047] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#3d5a37]"
            >
              <span className="text-[18px] leading-none">+</span>
              {CARD_WORDS[lang].add}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
