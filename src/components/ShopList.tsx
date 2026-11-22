"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { GROUPS, PRODUCTS, type Group } from "@/lib/shop";
import ProductCard from "./ProductCard";

// The shop page (owner, 22 Nov: "click the categories and check out quickly"): every vegetable, one
// group at a time from the chips or the navbar (?type=), and the navbar's search (?q=). Each card adds to
// the basket in place.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

const WORDS = {
  en: {
    eyebrow: "Shop",
    all: "All vegetables",
    lead: "Picked fresh from local farms. Order today, at your door tomorrow.",
    search: "Search vegetables",
    found: (n: number) => `${n} ${n === 1 ? "vegetable" : "vegetables"}`,
    for: "for",
    clear: "Clear search",
    none: "We are adding these soon.",
    noneLine: "Ask us on WhatsApp what came in fresh today.",
    ask: "Ask on WhatsApp",
  },
  ta: {
    eyebrow: "கடை",
    all: "அனைத்து காய்கறிகள்",
    lead: "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக. இன்று ஆர்டர், நாளை உங்கள் கதவில்.",
    search: "காய்கறிகளைத் தேடுங்கள்",
    found: (n: number) => `${n} காய்கறிகள்`,
    for: "தேடல்",
    clear: "தேடலை அழி",
    none: "இவற்றை விரைவில் சேர்க்கிறோம்.",
    noneLine: "இன்று என்ன புதிதாக வந்தது என்று WhatsApp-இல் கேளுங்கள்.",
    ask: "WhatsApp-இல் கேளுங்கள்",
  },
};

export default function ShopList({ t, lang }: { t: Dictionary; lang: Locale }) {
  const w = WORDS[lang];
  const sp = useSearchParams();
  const type = (GROUPS as string[]).includes(sp.get("type") ?? "") ? (sp.get("type") as Group) : null;
  const q = (sp.get("q") ?? "").trim().toLowerCase();
  const labels = t.nav[0].links.map((l) => l.label); // same order as GROUPS
  const list = PRODUCTS.filter(
    (p) => (!type || p.group === type) && (!q || `${p.name.en} ${p.name.ta} ${p.line[lang]}`.toLowerCase().includes(q)),
  );
  const title = type ? labels[GROUPS.indexOf(type)] : w.all;

  const chip = (on: boolean) =>
    `inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-[14px] font-semibold transition-colors ${
      on ? "border-[#4f7047] bg-[#4f7047] text-white" : "border-[#dbdee5] bg-white text-[#444] hover:border-[#4f7047] hover:text-[#1c2a1e]"
    }`;

  return (
    <section className="frame pb-24 pt-[clamp(28px,5vh,56px)]" style={{ fontFamily: OS }}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#4f7047]">{w.eyebrow}</p>
      <h1 className="mt-2 text-[clamp(30px,3.4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] text-[#1c2a1e]">{title}</h1>
      <p className="mt-3 max-w-[56ch] text-[clamp(15px,1.05vw,17px)] leading-[1.6] text-[#5b6460]">{w.lead}</p>

      <nav aria-label={w.all} className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <Link href={`/${lang}/vegetables/`} className={chip(!type)}>
          {w.all}
        </Link>
        {GROUPS.map((g, i) => (
          <Link key={g} href={`/${lang}/vegetables/?type=${g}`} className={`${chip(type === g)} shrink-0`}>
            {labels[i]}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-[14px] text-[#5b6460]">
        {w.found(list.length)}
        {q && (
          <>
            {" "}
            {w.for} “{sp.get("q")}” ·{" "}
            <Link href={`/${lang}/vegetables/${type ? `?type=${type}` : ""}`} className="font-semibold text-[#4f7047] underline">
              {w.clear}
            </Link>
          </>
        )}
      </p>

      {list.length ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[18px] border border-dashed border-[#cfd6c5] bg-white px-6 py-14 text-center">
          <p className="text-[19px] font-bold text-[#1c2a1e]">{w.none}</p>
          <p className="mt-2 text-[15px] text-[#5b6460]">{w.noneLine}</p>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#4f7047] px-6 text-[15px] font-semibold text-white hover:bg-[#3d5a37]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0 invert" />
            {w.ask}
          </a>
        </div>
      )}
    </section>
  );
}
