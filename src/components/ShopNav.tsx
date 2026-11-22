"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { GROUPS, GROUP_IMG, PRODUCTS, rs, useBasket } from "@/lib/shop";

// The shop's navbar (owner, 22 Nov: "a proper navbar for the e-commerce vegetable selling website").
// What a vegetable shop's bar must have: the name home, the categories, a search, the language, a quick
// way to WhatsApp, and the basket with its count and total, always one click from the order page.
// One bar, three places: "hero" sits inside the home hero; "float" slides in from the top once the home
// hero has scrolled away; "page" stays at the top of every other page.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

export const NAV_WORDS = {
  en: {
    shop: "All vegetables",
    cats: "Categories",
    search: "Search vegetables",
    basket: "Basket",
    empty: "Your basket",
    whatsapp: "WhatsApp us",
    count: (n: number) => `${n} ${n === 1 ? "vegetable" : "vegetables"}`,
    soon: "Coming soon",
    menuLine: "Picked fresh from local farms",
    strip: ["Order today, at your door tomorrow", "Cash on delivery", "Fresh from local farms"],
  },
  ta: {
    shop: "அனைத்து காய்கறிகள்",
    cats: "வகைகள்",
    search: "காய்கறிகளைத் தேடுங்கள்",
    basket: "கூடை",
    empty: "உங்கள் கூடை",
    whatsapp: "WhatsApp",
    count: (n: number) => `${n} காய்கறிகள்`,
    soon: "விரைவில்",
    menuLine: "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக",
    strip: ["இன்று ஆர்டர், நாளை உங்கள் கதவில்", "பொருள் வந்த பிறகே பணம்", "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக"],
  },
};

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" />
    </svg>
  );
}

export default function ShopNav({ t, lang, mode }: { t: Dictionary; lang: Locale; mode: "hero" | "float" | "page" }) {
  const w = NAV_WORDS[lang];
  const groups = t.nav[0].links;
  const other = lang === "en" ? "ta" : "en";
  const router = useRouter();
  const { count, total } = useBasket();
  const [menu, setMenu] = useState(false);
  const [shown, setShown] = useState(mode !== "float");
  const badge = useRef<HTMLSpanElement>(null);
  const last = useRef(count);
  const bar = useRef<HTMLElement>(null);

  // The floating bar arrives once the hero has gone by, and leaves again near the top.
  useEffect(() => {
    if (mode !== "float") return;
    const f = () => setShown(window.scrollY > window.innerHeight * 0.85);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [mode]);

  // The basket count jumps when something is added, so the customer sees it went in.
  useEffect(() => {
    if (count > last.current && badge.current) gsap.fromTo(badge.current, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
    last.current = count;
  }, [count]);

  // The categories menu closes on Escape or a click elsewhere.
  useEffect(() => {
    if (!menu) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const click = (e: MouseEvent) => !bar.current?.contains(e.target as Node) && setMenu(false);
    window.addEventListener("keydown", key);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("click", click);
    };
  }, [menu]);

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    router.push(`/${lang}/vegetables/${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  const wrap =
    mode === "float"
      ? `fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${shown ? "translate-y-0" : "-translate-y-full"}`
      : mode === "page"
        ? "sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md"
        : "relative z-30";

  return (
    <header ref={bar} className={wrap} style={{ fontFamily: OS }} aria-hidden={mode === "float" && !shown ? true : undefined}>
      {mode === "page" && (
        <div className="bg-[#022a09] text-[12.5px] text-white/80">
          <div className="frame flex h-9 items-center justify-center gap-x-8 sm:justify-between">
            <ul className="flex items-center gap-x-6">
              {w.strip.map((x, i) => (
                <li key={x} className={`flex items-center gap-2 ${i ? "max-lg:hidden" : ""}`}>
                  <span className="size-1.5 rounded-full bg-[#cbec4b]" />
                  {x}
                </li>
              ))}
            </ul>
            <a href={WHATSAPP.href} target="_blank" rel="noopener" className="font-semibold text-[#cbec4b] hover:underline max-sm:hidden">
              WhatsApp {WHATSAPP.label}
            </a>
          </div>
        </div>
      )}
      <nav aria-label="Main" className={`frame flex items-center gap-4 ${mode === "hero" ? "h-full" : "h-[68px]"}`}>
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#4f7047] text-[#cbec4b]">
            <Leaf className="size-[18px]" />
          </span>
          <span className="text-[16px] font-extrabold uppercase tracking-[0.02em] text-[#1c2a1e] max-sm:hidden">Pasumai Fresh</span>
        </Link>

        {/* The categories: as links on a wide screen, behind one button otherwise */}
        <ul className="ml-3 hidden shrink-0 items-center gap-0.5 whitespace-nowrap min-[1680px]:flex">
          <li>
            <Link href={`/${lang}/vegetables/`} className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-[#1c2a1e] transition-colors hover:bg-[#eef3e3]">
              {w.shop}
            </Link>
          </li>
          {groups.map((g) => (
            <li key={g.href}>
              <Link href={`/${lang}${g.href}`} className="rounded-full px-3.5 py-2 text-[15px] text-[#444] transition-colors hover:bg-[#eef3e3] hover:text-[#1c2a1e]">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative flex items-center gap-0.5 whitespace-nowrap min-[1680px]:hidden">
          <button
            type="button"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            className="flex h-10 items-center gap-2 rounded-full px-3.5 text-[15px] font-semibold text-[#1c2a1e] transition-colors hover:bg-[#eef3e3]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <span className="max-md:sr-only">{w.cats}</span>
          </button>
          <Link href={`/${lang}/vegetables/`} className="hidden rounded-full px-3.5 py-2 text-[15px] font-semibold text-[#1c2a1e] transition-colors hover:bg-[#eef3e3] lg:block">
            {w.shop}
          </Link>
          {menu && (
            <div className="absolute left-0 top-12 z-50 w-[min(92vw,520px)] rounded-[18px] border border-black/5 bg-white p-3 shadow-[0_30px_60px_-24px_rgba(2,42,9,0.4)]">
              <div className="grid grid-cols-2 gap-2">
                {groups.map((g, i) => {
                  const n = PRODUCTS.filter((p) => p.group === GROUPS[i]).length;
                  return (
                    <Link
                      key={g.href}
                      onClick={() => setMenu(false)}
                      href={`/${lang}${g.href}`}
                      className="group flex items-center gap-3 rounded-[14px] bg-[#f6f7f1] p-3 transition-colors hover:bg-[#eef3e3]"
                    >
                      <span className="size-12 shrink-0 overflow-hidden rounded-[12px] bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={GROUP_IMG[GROUPS[i]]} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold leading-tight text-[#1c2a1e]">{g.label}</span>
                        <span className="mt-0.5 block text-[12px] text-[#5b6460]">{n ? w.count(n) : w.soon}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-[14px] bg-[#022a09] px-4 py-3 text-white">
                <span className="text-[13px] text-white/75">{w.menuLine}</span>
                <Link onClick={() => setMenu(false)} href={`/${lang}/vegetables/`} className="shrink-0 text-[14px] font-semibold text-[#cbec4b] hover:underline">
                  {w.shop} →
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
          <form role="search" onSubmit={search} className="relative hidden md:block">
            <input
              name="q"
              type="search"
              placeholder={w.search}
              aria-label={w.search}
              className="h-10 w-[clamp(170px,18vw,260px)] rounded-full border border-[#dbdee5] bg-white pl-10 pr-4 text-[14px] text-[#1c2a1e] outline-none transition-colors placeholder:text-[#999fa6] focus:border-[#4f7047]"
            />
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999fa6]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </form>
          <Link href={`/${lang}/vegetables/`} aria-label={w.search} className="flex size-10 items-center justify-center rounded-full text-[#1c2a1e] hover:bg-[#eef3e3] md:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link
            href={`/${other}`}
            hrefLang={other}
            className="flex h-10 items-center rounded-full px-3 text-[14px] font-semibold text-[#444] hover:bg-[#eef3e3] hover:text-[#1c2a1e]"
          >
            {other === "ta" ? "தமிழ்" : "EN"}
          </Link>
          <a href={WHATSAPP.href} target="_blank" rel="noopener" aria-label={w.whatsapp} className="hidden size-10 items-center justify-center rounded-full hover:bg-[#eef3e3] sm:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-5" />
          </a>
          <Link
            href={`/${lang}/order/`}
            aria-label={`${w.basket}: ${count}`}
            className="relative flex h-10 items-center gap-2 rounded-full bg-[#4f7047] pl-3 pr-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#3d5a37]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 9h14l-1.5 10.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z" />
              <path d="M9 9 12 4l3 5" />
            </svg>
            <span className="max-sm:hidden">{count ? rs(total) : w.basket}</span>
            <span
              ref={badge}
              className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#cbec4b] px-1 text-[11px] font-bold text-[#022a09] ${count ? "" : "hidden"}`}
            >
              {count}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
