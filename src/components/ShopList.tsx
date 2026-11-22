"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { GROUPS, GROUP_IMG, PRODUCTS, rs, useBasket, type Group } from "@/lib/shop";
import ProductCard from "./ProductCard";

// The shop page (owner, 22 Nov: "click the categories and check out quickly"; then "too minimal... the
// page doesn't show any detail"). A banner for the group with its vegetables drawn, big category tiles
// with pictures and counts, search and sort, the cards (each adds in place), then how ordering works and
// a help panel - so a customer always knows where they are, what to do next and how it will arrive.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

type Sort = "recommended" | "low" | "high" | "name";

const WORDS = {
  en: {
    eyebrow: "Shop",
    all: "All vegetables",
    lead: "Picked fresh from local farms and brought to your door in Colombo. Order today, at your door tomorrow.",
    leads: {
      local: "Everyday vegetables from village farms, for the curries you cook every day.",
      upcountry: "Cool-climate vegetables grown in the hill country.",
      tubers: "Potatoes and other roots for curries, fries and roasting.",
      greens: "Leafy greens and herbs, picked fresh.",
    },
    search: "Search in the shop",
    sort: "Sort",
    sorts: { recommended: "Recommended", low: "Price: low to high", high: "Price: high to low", name: "Name: A to Z" },
    count: (n: number) => `${n} ${n === 1 ? "vegetable" : "vegetables"}`,
    for: "for",
    clear: "Clear search",
    none: "We are adding these soon.",
    noneLine: "Ask us on WhatsApp what came in fresh today - we will tell you what we have.",
    ask: "Ask on WhatsApp",
    how: "How ordering works",
    steps: [
      ["Pick your vegetables", "Add what you need to the basket - change it any time."],
      ["Send your order", "One button writes the whole order into WhatsApp for you."],
      ["Pay when it arrives", "We confirm on WhatsApp and deliver tomorrow. Cash on delivery."],
    ],
    help: "Can't find what you need?",
    helpLine: "Tell us on WhatsApp and we will check what came in fresh today.",
    basket: "Go to my order",
  },
  ta: {
    eyebrow: "கடை",
    all: "அனைத்து காய்கறிகள்",
    lead: "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக, கொழும்பில் உங்கள் வீட்டு கதவுக்கு. இன்று ஆர்டர், நாளை உங்கள் கதவில்.",
    leads: {
      local: "தினசரி சமையலுக்கு கிராமத் தோட்டங்களிலிருந்து காய்கறிகள்.",
      upcountry: "மலையகத்தில் வளர்ந்த குளிர் காலநிலைக் காய்கறிகள்.",
      tubers: "கறி, பொரியல் மற்றும் வறுவலுக்கு உருளைக்கிழங்கு மற்றும் கிழங்கு வகைகள்.",
      greens: "புதிதாகப் பறித்த கீரைகள் மற்றும் மூலிகைகள்.",
    },
    search: "கடையில் தேடுங்கள்",
    sort: "வரிசை",
    sorts: { recommended: "பரிந்துரை", low: "விலை: குறைவு முதல்", high: "விலை: அதிகம் முதல்", name: "பெயர்: அ முதல்" },
    count: (n: number) => `${n} காய்கறிகள்`,
    for: "தேடல்",
    clear: "தேடலை அழி",
    none: "இவற்றை விரைவில் சேர்க்கிறோம்.",
    noneLine: "இன்று என்ன புதிதாக வந்தது என்று WhatsApp-இல் கேளுங்கள் - எங்களிடம் உள்ளதைச் சொல்வோம்.",
    ask: "WhatsApp-இல் கேளுங்கள்",
    how: "ஆர்டர் செய்வது எப்படி",
    steps: [
      ["காய்கறிகளைத் தேர்ந்தெடுங்கள்", "தேவையானதை கூடையில் சேருங்கள் - எப்போது வேண்டுமானாலும் மாற்றலாம்."],
      ["ஆர்டரை அனுப்புங்கள்", "ஒரே பொத்தான் முழு ஆர்டரையும் WhatsApp-இல் எழுதும்."],
      ["வந்ததும் பணம்", "WhatsApp-இல் உறுதிப்படுத்தி நாளை அனுப்புவோம். Cash on delivery."],
    ],
    help: "தேவையானது கிடைக்கவில்லையா?",
    helpLine: "WhatsApp-இல் சொல்லுங்கள், இன்று என்ன புதிதாக வந்தது என்று பார்க்கிறோம்.",
    basket: "என் ஆர்டருக்கு",
  },
};

// The hero's leaves, scattered in the banner (owner, 22 Nov: leaves, not drawings). Turned and flipped
// differently so they read as nature, not a pattern.
const LEAVES = [
  { src: "/img/hero/leaf-b.webp", w: 30, x: 6, y: 14, r: -18, f: false },
  { src: "/img/hero/leaf-a.webp", w: 20, x: 46, y: 4, r: 30, f: true },
  { src: "/img/hero/leaf-c.webp", w: 24, x: 70, y: 34, r: -8, f: false },
  { src: "/img/hero/leaf-a.webp", w: 16, x: 30, y: 56, r: -120, f: false },
  { src: "/img/hero/leaf-c.webp", w: 18, x: 58, y: 62, r: 40, f: true },
];

export default function ShopList({ t, lang }: { t: Dictionary; lang: Locale }) {
  const w = WORDS[lang];
  const { count, total } = useBasket();
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const type = (GROUPS as string[]).includes(sp.get("type") ?? "") ? (sp.get("type") as Group) : null;
  const q = (sp.get("q") ?? "").trim().toLowerCase();
  const sort = ((["recommended", "low", "high", "name"] as Sort[]).includes(sp.get("sort") as Sort) ? sp.get("sort") : "recommended") as Sort;
  const labels = t.nav[0].links.map((l) => l.label); // same order as GROUPS
  const list = PRODUCTS.filter(
    (p) => (!type || p.group === type) && (!q || `${p.name.en} ${p.name.ta} ${p.line[lang]}`.toLowerCase().includes(q)),
  ).sort((a, b) =>
    sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "name" ? a.name[lang].localeCompare(b.name[lang]) : 0,
  );
  const title = type ? labels[GROUPS.indexOf(type)] : w.all;
  const lead = type ? w.leads[type] : w.lead;

  // Change one part of the address (search, sort) and keep the rest.
  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(sp.toString());
    if (v) next.set(k, v);
    else next.delete(k);
    router.replace(`${path}${next.size ? `?${next}` : ""}`, { scroll: false });
  };
  const hrefFor = (g: Group | null) => `/${lang}/vegetables/${g ? `?type=${g}` : ""}`;

  return (
    <div style={{ fontFamily: OS }}>
      {/* The banner */}
      <section className="frame pt-[clamp(20px,4vh,40px)]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#022a09] px-[clamp(24px,4vw,64px)] py-[clamp(32px,6vh,64px)] text-white">
          <div className="relative z-10 max-w-[560px]">
            <nav aria-label="Breadcrumb" className="flex gap-1.5 text-[13px] text-white/60">
              <Link href={`/${lang}`} className="hover:text-white">
                Pasumai Fresh
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={hrefFor(null)} className="hover:text-white">
                {w.eyebrow}
              </Link>
            </nav>
            <h1 className="mt-3 text-[clamp(32px,4vw,60px)] font-bold leading-[1.05] tracking-[-0.02em]">{title}</h1>
            <p className="mt-3 text-[clamp(15px,1.1vw,18px)] leading-[1.6] text-white/75">{lead}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#cbec4b] px-4 py-1.5 text-[13px] font-bold text-[#022a09]">
              {w.count(list.length)}
            </p>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute right-[2%] max-md:bottom-0 max-md:h-[46%] max-md:w-[58%] max-md:opacity-90 md:inset-y-0 md:w-[46%]">
            {LEAVES.map((l, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={l.src}
                alt=""
                className="leaf-float absolute drop-shadow-[0_14px_18px_rgba(0,0,0,0.3)]"
                style={{ width: `${l.w}%`, left: `${l.x}%`, top: `${l.y}%`, rotate: `${l.r}deg`, scale: l.f ? "-1 1" : undefined, animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The categories, as tiles with pictures */}
      <nav aria-label={w.all} className="frame mt-5">
        <ul className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:px-0">
          {([null, ...GROUPS] as (Group | null)[]).map((g) => {
            const on = g === type;
            const n = g ? PRODUCTS.filter((p) => p.group === g).length : PRODUCTS.length;
            return (
              <li key={g ?? "all"} className="shrink-0">
                <Link
                  href={hrefFor(g)}
                  scroll={false}
                  className={`group flex h-full min-w-[170px] items-center gap-3 rounded-[18px] border p-3 transition-colors ${
                    on ? "border-[#4f7047] bg-[#eef3e3]" : "border-[#e8ebe3] bg-white hover:border-[#4f7047]"
                  }`}
                >
                  <span className="size-14 shrink-0 overflow-hidden rounded-[14px] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g ? GROUP_IMG[g] : "/img/banner-basket.webp"} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap text-[15px] font-bold leading-tight text-[#1c2a1e]">{g ? labels[GROUPS.indexOf(g)] : w.all}</span>
                    <span className="mt-0.5 block text-[12.5px] text-[#5b6460]">{w.count(n)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Search and sort */}
      <section className="frame mt-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e6dc] pb-4">
          <p className="text-[14px] text-[#5b6460]">
            <span className="font-semibold text-[#1c2a1e]">{w.count(list.length)}</span>
            {q && (
              <>
                {" "}
                {w.for} “{sp.get("q")}” ·{" "}
                <button type="button" onClick={() => setParam("q", "")} className="font-semibold text-[#4f7047] underline">
                  {w.clear}
                </button>
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              key={q}
              type="search"
              defaultValue={sp.get("q") ?? ""}
              placeholder={w.search}
              aria-label={w.search}
              onKeyDown={(e) => e.key === "Enter" && setParam("q", e.currentTarget.value.trim())}
              className="h-11 w-[220px] rounded-[10px] border border-[#dbdee5] bg-white px-4 text-[14px] outline-none focus:border-[#4f7047]"
            />
            <label className="flex h-11 items-center gap-2 rounded-[10px] border border-[#dbdee5] bg-white pl-4 pr-2 text-[14px] text-[#5b6460]">
              {w.sort}
              <select value={sort} onChange={(e) => setParam("sort", e.target.value === "recommended" ? "" : e.target.value)} className="h-full bg-transparent pr-1 font-semibold text-[#1c2a1e] outline-none">
                {(Object.keys(w.sorts) as Sort[]).map((k) => (
                  <option key={k} value={k}>
                    {w.sorts[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {list.length ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} lang={lang} group={labels[GROUPS.indexOf(p.group)]} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-[22px] border border-dashed border-[#cfd6c5] bg-white px-6 py-14 text-center">
            <div className="flex -space-x-4" aria-hidden="true">
              {LEAVES.slice(0, 3).map((l, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={l.src} alt="" className="leaf-float w-16" style={{ rotate: `${l.r}deg`, animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <p className="mt-4 text-[20px] font-bold text-[#1c2a1e]">{w.none}</p>
            <p className="mt-2 max-w-[46ch] text-[15px] text-[#5b6460]">{w.noneLine}</p>
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#4f7047] px-6 text-[15px] font-semibold text-white hover:bg-[#3d5a37]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0 invert" />
              {w.ask}
            </a>
          </div>
        )}
      </section>

      {/* How ordering works */}
      <section className="frame pb-10">
        <h2 className="text-[22px] font-bold text-[#1c2a1e]">{w.how}</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {w.steps.map(([h, line], i) => (
            <li key={h} className="flex gap-4 rounded-[18px] border border-[#e8ebe3] bg-white p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#cbec4b] text-[15px] font-bold text-[#022a09]">{i + 1}</span>
              <span>
                <span className="block text-[16px] font-bold text-[#1c2a1e]">{h}</span>
                <span className="mt-1 block text-[14px] leading-snug text-[#5b6460]">{line}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Phone: the basket stays in reach */}
      {count > 0 && (
        <Link
          href={`/${lang}/order/`}
          className="fixed inset-x-3 bottom-3 z-40 flex h-14 items-center justify-between rounded-[16px] bg-[#022a09] px-5 text-white shadow-[0_20px_40px_-16px_rgba(2,42,9,0.6)] md:hidden"
        >
          <span className="text-[14px]">
            <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-[#cbec4b] text-[12px] font-bold text-[#022a09]">{count}</span>
            {rs(total)}
          </span>
          <span className="text-[15px] font-semibold text-[#cbec4b]">{w.basket} →</span>
        </Link>
      )}

      {/* Help */}
      <section className="frame pb-28">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[22px] bg-[#e8efda] px-[clamp(20px,3vw,40px)] py-6">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-c.webp" alt="" aria-hidden="true" className="leaf-float w-16 shrink-0 -rotate-12" />
            <div>
              <p className="text-[19px] font-bold text-[#1c2a1e]">{w.help}</p>
              <p className="mt-1 text-[15px] text-[#444]">{w.helpLine}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={WHATSAPP.href} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#4f7047] px-5 text-[15px] font-semibold text-white hover:bg-[#3d5a37]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0 invert" />
              {w.ask}
            </a>
            <Link href={`/${lang}/order/`} className="inline-flex h-12 items-center rounded-[10px] border border-[#4f7047] bg-white px-5 text-[15px] font-semibold text-[#1c2a1e] hover:bg-[#f6f7f1]">
              {w.basket} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
