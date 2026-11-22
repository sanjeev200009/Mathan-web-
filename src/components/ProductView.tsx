"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { GROUPS, PRODUCTS, addToBasket, productById, rs, useBasket } from "@/lib/shop";
import ProductCard from "./ProductCard";

// One vegetable's page (owner, 22 Nov: "the product page is too minimal... doesn't show any detail").
// Left: the photo with its cartoon twin and a "picked fresh" badge. Right: the price, how many and the
// total, Add to basket / Buy now, a question on WhatsApp, and how it reaches you (delivery, pickup,
// payment). Below: tabs (about, how to store, cooking ideas, delivery and payment), "make it a meal"
// with the vegetables it goes with (one click adds them all), and more from the shop. On a phone the
// add button stays at the bottom of the screen.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

type Tab = "about" | "store" | "cook" | "delivery";

const WORDS = {
  en: {
    home: "Home",
    shop: "Shop",
    fresh: "Picked fresh",
    per: "per",
    qty: "How many",
    add: "Add to basket",
    added: "Added to your basket",
    buy: "Buy now",
    inBasket: (n: number) => `${n} already in your basket`,
    view: "View basket",
    ask: "Ask about this on WhatsApp",
    askText: (n: string) => `Hello Pasumai Fresh, I have a question about ${n}:`,
    ways: [
      ["Home delivery", "Order today, at your door tomorrow in Colombo."],
      ["Pick it up", "Choose pickup on the order page and collect it from the shop."],
      ["Pay when it arrives", "Cash on delivery. We confirm the total on WhatsApp."],
    ],
    tabs: { about: "About", store: "How to keep it", cook: "Cooking ideas", delivery: "Delivery and payment" },
    deliveryText:
      "Send your order from the order page; it opens WhatsApp with everything written. We reply to confirm the total and the delivery time, bring it to your door tomorrow, and you pay when it arrives. You can also choose to pick it up.",
    meal: "Make it a meal",
    mealLine: "These go well together.",
    addAll: "Add all three",
    addedAll: "All added",
    more: "More from the shop",
    total: "Total",
  },
  ta: {
    home: "முகப்பு",
    shop: "கடை",
    fresh: "புதிதாகப் பறித்தது",
    per: "ஒவ்வொரு",
    qty: "எத்தனை",
    add: "கூடையில் சேர்",
    added: "உங்கள் கூடையில் சேர்க்கப்பட்டது",
    buy: "இப்போதே வாங்கு",
    inBasket: (n: number) => `ஏற்கனவே ${n} உங்கள் கூடையில்`,
    view: "கூடையைப் பார்",
    ask: "இதைப் பற்றி WhatsApp-இல் கேளுங்கள்",
    askText: (n: string) => `வணக்கம் Pasumai Fresh, ${n} பற்றி ஒரு கேள்வி:`,
    ways: [
      ["வீட்டிற்கு விநியோகம்", "இன்று ஆர்டர், நாளை கொழும்பில் உங்கள் கதவில்."],
      ["நீங்களே பெறலாம்", "ஆர்டர் பக்கத்தில் pickup தேர்ந்தெடுத்து கடையில் பெற்றுக்கொள்ளுங்கள்."],
      ["வந்ததும் பணம்", "Cash on delivery. மொத்தத் தொகையை WhatsApp-இல் உறுதிப்படுத்துவோம்."],
    ],
    tabs: { about: "பற்றி", store: "எப்படி வைப்பது", cook: "சமையல் யோசனைகள்", delivery: "விநியோகம் மற்றும் பணம்" },
    deliveryText:
      "ஆர்டர் பக்கத்திலிருந்து உங்கள் ஆர்டரை அனுப்புங்கள்; எல்லாம் எழுதப்பட்ட WhatsApp திறக்கும். மொத்தத் தொகையையும் விநியோக நேரத்தையும் உறுதிப்படுத்தி, நாளை உங்கள் கதவுக்கு கொண்டு வருவோம்; வந்ததும் பணம் செலுத்துங்கள். நீங்களே பெற்றுக்கொள்ளவும் தேர்ந்தெடுக்கலாம்.",
    meal: "ஒரு உணவாக்குங்கள்",
    mealLine: "இவை ஒன்றாக நன்றாகப் பொருந்தும்.",
    addAll: "மூன்றையும் சேர்",
    addedAll: "அனைத்தும் சேர்க்கப்பட்டது",
    more: "கடையில் மேலும்",
    total: "மொத்தம்",
  },
};

const ICONS = [
  <path key="t" d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />,
  <path key="s" d="M4 10l8-6 8 6v10H4zM10 20v-6h4v6" />,
  <path key="c" d="M3 7h18v10H3zM12 12a2 2 0 1 0 0-.01M6 10v4M18 10v4" />,
];

export default function ProductView({ id, t, lang }: { id: string; t: Dictionary; lang: Locale }) {
  const p = productById(id)!;
  const w = WORDS[lang];
  const router = useRouter();
  const { lines } = useBasket();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [tab, setTab] = useState<Tab>("about");
  const labels = t.nav[0].links;
  const group = labels[GROUPS.indexOf(p.group)];
  const meal = [p, ...p.pairs.map((x) => productById(x)!).filter(Boolean)];
  const others = PRODUCTS.filter((x) => x.id !== p.id && !p.pairs.includes(x.id));
  const already = lines[p.id] ?? 0;

  const add = () => {
    addToBasket(p.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };
  const buy = () => {
    addToBasket(p.id, qty);
    router.push(`/${lang}/order/`);
  };

  const tabText: Record<Tab, string> = { about: p.line[lang], store: p.store[lang], cook: p.uses[lang], delivery: w.deliveryText };

  return (
    <div style={{ fontFamily: OS }}>
      <section className="frame grid gap-8 pb-14 pt-[clamp(20px,4vh,36px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        {/* The photo */}
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-[14px] text-[#5b6460]">
            <Link href={`/${lang}`} className="hover:text-[#1c2a1e] hover:underline">
              {w.home}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}/vegetables/`} className="hover:text-[#1c2a1e] hover:underline">
              {w.shop}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${lang}${group.href}`} className="hover:text-[#1c2a1e] hover:underline">
              {group.label}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#1c2a1e]">{p.name[lang]}</span>
          </nav>
          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-[#e8ebe3] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.name[lang]} fetchPriority="high" className="size-full object-contain p-[9%]" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#cbec4b] px-4 py-2 text-[13px] font-bold text-[#022a09]">
              <span className="size-2 rounded-full bg-[#4f7047]" />
              {w.fresh}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-a.webp" alt="" aria-hidden="true" className="leaf-float pointer-events-none absolute -bottom-3 right-5 w-[16%] rotate-[24deg] drop-shadow-[0_10px_14px_rgba(2,42,9,0.2)]" />
          </div>
        </div>

        {/* The buying side */}
        <div className="lg:pt-10">
          <Link href={`/${lang}${group.href}`} className="inline-flex rounded-full bg-[#e8efda] px-3 py-1 text-[12.5px] font-semibold text-[#4f7047] hover:bg-[#dbe7c8]">
            {group.label}
          </Link>
          <h1 className="mt-3 text-[clamp(34px,4vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1c2a1e]">{p.name[lang]}</h1>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-[clamp(28px,2.6vw,38px)] font-bold text-[#1c2a1e]">{rs(p.price)}</span>
            <span className="text-[16px] text-[#5b6460]">
              {w.per} {p.unit[lang]}
            </span>
          </p>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.65] text-[#444]">{p.line[lang]}</p>

          <div className="mt-7 rounded-[20px] border border-[#e8ebe3] bg-white p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[14px] font-semibold text-[#1c2a1e]">
                  {w.qty} <span className="font-normal text-[#5b6460]">({p.unit[lang]})</span>
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
              <div className="text-right">
                <p className="text-[14px] text-[#5b6460]">{w.total}</p>
                <p className="mt-1 text-[30px] font-bold tabular-nums text-[#1c2a1e]">{rs(p.price * qty)}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={add} className="inline-flex h-14 items-center justify-center rounded-[12px] bg-[#4f7047] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#3d5a37]">
                {added ? `✓ ${w.added}` : w.add}
              </button>
              <button type="button" onClick={buy} className="inline-flex h-14 items-center justify-center rounded-[12px] bg-[#cbec4b] px-6 text-[16px] font-semibold text-[#022a09] transition-colors hover:bg-[#d8f36a]">
                {w.buy} →
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
          </div>

          <a
            href={`${WHATSAPP.href}?text=${encodeURIComponent(w.askText(p.name[lang]))}`}
            target="_blank"
            rel="noopener"
            className="mt-3 flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[#dbdee5] bg-white text-[15px] font-semibold text-[#1c2a1e] hover:border-[#4f7047]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-5" />
            {w.ask}
          </a>

          <ul className="mt-6 divide-y divide-[#eef0ea] rounded-[20px] border border-[#e8ebe3] bg-white">
            {w.ways.map(([h, line], i) => (
              <li key={h} className="flex gap-4 px-5 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8efda] text-[#4f7047]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ICONS[i]}
                  </svg>
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-[#1c2a1e]">{h}</span>
                  <span className="mt-0.5 block text-[14px] text-[#5b6460]">{line}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The tabs */}
      <section className="frame pb-14">
        <div className="rounded-[24px] border border-[#e8ebe3] bg-white p-[clamp(18px,2.4vw,32px)]">
          <div role="tablist" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {(Object.keys(w.tabs) as Tab[]).map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`h-11 shrink-0 whitespace-nowrap rounded-full px-5 text-[14.5px] font-semibold transition-colors ${
                  tab === k ? "bg-[#022a09] text-white" : "text-[#444] hover:bg-[#eef3e3]"
                }`}
              >
                {w.tabs[k]}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="mt-5 flex items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" className="hidden size-20 shrink-0 rounded-[14px] border border-[#eef0ea] object-contain p-1 sm:block" />
            <p key={tab} className="enter max-w-[70ch] text-[17px] leading-[1.7] text-[#444]">
              {tabText[tab]}
            </p>
          </div>
        </div>
      </section>

      {/* Make it a meal */}
      {meal.length > 1 && (
        <section className="frame pb-14">
          <div className="rounded-[24px] bg-[#022a09] p-[clamp(20px,3vw,40px)] text-white">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[clamp(22px,2vw,30px)] font-bold">{w.meal}</h2>
                <p className="mt-1 text-[15px] text-white/70">{w.mealLine}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  meal.forEach((x) => addToBasket(x.id, 1));
                  setAddedAll(true);
                  setTimeout(() => setAddedAll(false), 2200);
                }}
                className="inline-flex h-12 items-center rounded-[12px] bg-[#cbec4b] px-6 text-[15px] font-semibold text-[#022a09] hover:bg-[#d8f36a]"
              >
                {addedAll ? `✓ ${w.addedAll}` : `${w.addAll} · ${rs(meal.reduce((n, x) => n + x.price, 0))}`}
              </button>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {meal.map((x, i) => (
                <li key={x.id} className="flex items-center gap-4 rounded-[16px] bg-white/[0.07] p-3">
                  <span className="size-16 shrink-0 overflow-hidden rounded-[12px] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.img} alt="" loading="lazy" className="size-full object-contain p-1.5" />
                  </span>
                  <span className="min-w-0">
                    <Link href={`/${lang}/product/${x.id}/`} className="block font-bold hover:underline">
                      {x.name[lang]}
                    </Link>
                    <span className="text-[14px] text-white/70">
                      {rs(x.price)} / {x.unit[lang]}
                    </span>
                  </span>
                  {i < meal.length - 1 && (
                    <span aria-hidden="true" className="ml-auto hidden text-[22px] text-[#cbec4b] sm:block">
                      +
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="frame pb-28">
          <h2 className="text-[24px] font-bold text-[#1c2a1e]">{w.more}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {others.map((x) => (
              <ProductCard key={x.id} p={x} lang={lang} group={labels[GROUPS.indexOf(x.group)].label} />
            ))}
          </div>
        </section>
      )}

      {/* Phone: the add button stays in reach */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/5 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold text-[#1c2a1e]">{p.name[lang]}</p>
          <p className="text-[13px] text-[#5b6460]">
            {qty} × {rs(p.price)} = <span className="font-bold text-[#1c2a1e]">{rs(p.price * qty)}</span>
          </p>
        </div>
        <button type="button" onClick={add} className="h-12 rounded-[12px] bg-[#4f7047] px-5 text-[15px] font-semibold text-white">
          {added ? "✓" : w.add}
        </button>
      </div>
    </div>
  );
}
