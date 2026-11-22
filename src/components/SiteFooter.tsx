"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";

gsap.registerPlugin(ScrollTrigger);

// The footer (owner, 22 Nov: "match the vibe of my website"). It closes the page in the site's own
// language: a deep-green panel with a rounded top (like the WhatsApp section's layer), one clear ask
// (order on WhatsApp), a stitched lime line like the ribbon's stitching, the vegetable groups only (the
// shop sells vegetables), what ordering is like, contact, and the hero's "pasumai" word set huge along
// the bottom edge, its letters rising in when the footer arrives. Open Sans like the sections above.
// ponytail: the social links point at each network's home until the shop's own pages are known.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';
const AL = '"Abhaya Libre", "Times New Roman", serif';

const COPY = {
  en: {
    about: "Fresh vegetables straight from local farms, delivered to your door in Colombo.",
    cta: "Fresh vegetables, at your door tomorrow.",
    ctaLine: "Order today on WhatsApp. You pay when it arrives.",
    order: "Order on WhatsApp",
    shop: "Shop",
    all: "All vegetables",
    help: "How it works",
    steps: ["Order today, at your door tomorrow", "Pay when your order arrives", "Picked fresh from local farms"],
    top: "Back to top",
  },
  ta: {
    about: "உள்ளூர் தோட்டங்களிலிருந்து நேரடியாக புதிய காய்கறிகள், கொழும்பில் உங்கள் வீட்டு கதவில்.",
    cta: "புதிய காய்கறிகள், நாளை உங்கள் கதவில்.",
    ctaLine: "இன்றே WhatsApp-இல் ஆர்டர் செய்யுங்கள். பொருள் வந்த பிறகே பணம்.",
    order: "WhatsApp-இல் ஆர்டர்",
    shop: "கடை",
    all: "அனைத்து காய்கறிகள்",
    help: "எப்படி வேலை செய்கிறது",
    steps: ["இன்று ஆர்டர், நாளை உங்கள் கதவில்", "பொருள் வந்த பிறகே பணம்", "உள்ளூர் தோட்டங்களிலிருந்து புதிதாக"],
    top: "மேலே செல்ல",
  },
};

const SOCIAL = [
  { name: "Facebook", icon: "/icons/facebook.svg", href: "https://www.facebook.com/" },
  { name: "Instagram", icon: "/icons/instagram.svg", href: "https://www.instagram.com/" },
  { name: "YouTube", icon: "/icons/youtube.svg", href: "https://www.youtube.com/" },
  { name: "TikTok", icon: "/icons/tiktok.svg", href: "https://www.tiktok.com/" },
];

// The ribbon's stitch, as a line: short lime dashes.
const STITCH = { backgroundImage: "repeating-linear-gradient(90deg, #cbec4b 0 10px, transparent 10px 18px)" };

const head = "text-[12px] font-semibold uppercase tracking-[0.14em] text-[#cbec4b]";
const link = "inline-flex min-h-10 items-center text-[15px] text-white/75 transition-colors duration-200 hover:text-white";

export default function SiteFooter({ t, lang }: { t: Dictionary; lang: Locale }) {
  const c = COPY[lang];
  const f = t.more.footer;
  const veg = t.nav[0];
  const other = lang === "en" ? "ta" : "en";
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-foot", { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 80%" } });
      gsap.from(".js-letter", { yPercent: 70, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.06, scrollTrigger: { trigger: ".js-word", start: "top 95%" } });
      gsap.from(".js-stitch", { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: ".js-stitch", start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#022a09] text-white" style={{ fontFamily: OS }}>
      <div className="frame pt-[clamp(56px,9vh,104px)]">
        {/* The one ask */}
        <div className="js-foot grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(30px,3.6vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] lang-ta:max-w-[22ch] lang-ta:text-[clamp(24px,2.8vw,42px)] lang-ta:leading-[1.3]">
              {c.cta}
            </h2>
            <p className="mt-4 text-[clamp(15px,1.1vw,18px)] leading-[1.6] text-white/70">{c.ctaLine}</p>
          </div>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener"
            className="group inline-flex h-[56px] items-center gap-3 self-start rounded-[10px] bg-[#cbec4b] px-7 text-[16px] font-semibold text-[#022a09] transition-colors duration-200 hover:bg-[#d8f36a] lg:self-end"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0" />
            {c.order}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        <div aria-hidden="true" className="js-stitch mt-[clamp(40px,6vh,64px)] h-[2px] opacity-70" style={STITCH} />

        {/* The columns */}
        <div className="grid gap-10 py-[clamp(40px,6vh,64px)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="js-foot">
            <a href={`/${lang}`} className="inline-flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#cbec4b] text-[#022a09]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
                  <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" />
                </svg>
              </span>
              <span>
                <span className="block text-[19px] font-bold leading-tight">Pasumai Fresh</span>
                <span className="block text-[13px] text-white/60">{f.tagline}</span>
              </span>
            </a>
            <p className="mt-5 max-w-[32ch] text-[15px] leading-[1.65] text-white/65">{c.about}</p>
          </div>

          <nav aria-label={c.shop} className="js-foot">
            <h3 className={head}>{c.shop}</h3>
            <ul className="mt-3">
              {veg.links.map((g) => (
                <li key={g.href}>
                  <a href={`/${lang}${g.href}`} className={link}>
                    {g.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`/${lang}${veg.slug}`} className={`${link} gap-1.5 font-semibold text-[#cbec4b] hover:text-[#e2f79a]`}>
                  {c.all} →
                </a>
              </li>
            </ul>
          </nav>

          <div className="js-foot">
            <h3 className={head}>{c.help}</h3>
            <ul className="mt-4 space-y-3">
              {c.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[15px] leading-snug text-white/75">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#cbec4b]/60 text-[11px] font-bold text-[#cbec4b]">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="js-foot">
            <h3 className={head}>{f.contact}</h3>
            <ul className="mt-3">
              <li>
                <a href={WHATSAPP.href} target="_blank" rel="noopener" className={`${link} gap-3`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/whatsapp.svg" alt="" className="size-5" />
                  {WHATSAPP.label}
                </a>
              </li>
              <li className="flex min-h-10 items-center gap-3 text-[15px] text-white/75">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbec4b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {f.place}
              </li>
            </ul>
            <ul className="mt-4 flex gap-2.5" aria-label={f.follow}>
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.name}
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#cbec4b] hover:bg-[#cbec4b]/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" className="max-h-[18px] max-w-[18px] brightness-0 invert" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The last line */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 py-5 text-[13px] text-white/50">
          <p>© 2026 Pasumai Fresh. {f.rights}</p>
          <p className="flex items-center gap-5">
            <a href={`/${other}`} hrefLang={other} className="inline-flex min-h-10 items-center text-white/75 hover:text-white">
              {other === "ta" ? "தமிழ்" : "English"}
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex min-h-10 items-center gap-2 text-white/75 hover:text-white"
            >
              {c.top}
              <span className="flex size-7 items-center justify-center rounded-full border border-white/25 transition-transform duration-300 group-hover:-translate-y-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </button>
          </p>
        </div>
      </div>

      {/* The hero's word, huge, its lower part running off the page */}
      <div aria-hidden="true" className="js-word pointer-events-none flex select-none justify-center overflow-hidden">
        <span
          className="-mb-[0.32em] -mt-[0.2em] block whitespace-nowrap text-[clamp(110px,26vw,460px)] leading-none tracking-[-0.06em] text-[#cbec4b]/[0.14]"
          style={{ fontFamily: AL, fontWeight: 800 }}
        >
          {"pasumai".split("").map((ch, i) => (
            <span key={i} className="js-letter inline-block">
              {ch}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
