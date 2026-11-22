"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";

// The site's hero, after the owner's reference (16 Nov): full-screen photo slides under a deep green
// tint, a see-through bar on top (name left, categories right, language), a small label, one centred
// uppercase line, an outlined button, slide numbers down the left and a scroll hint.
// The slides change by themselves every 6 seconds (not with reduced motion); the numbers pick one.
// Photos (hero-1..3.jpg) are from Unsplash, free to use: leafy greens, vegetables on black, a market.
export default function HomeHero({ t, lang }: { t: Dictionary; lang: Locale }) {
  const { slides } = t.front;
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setAt((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
    // `at` restarts the clock after a number is pressed, so a picked slide gets its full six seconds.
  }, [at, slides.length]);

  const other = lang === "en" ? "ta" : "en";

  return (
    <section className="relative isolate flex h-svh min-h-[520px] flex-col overflow-hidden bg-[#10240c] text-white">
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.img}
          src={s.img}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 -z-20 size-full object-cover transition-[opacity,scale] duration-[1400ms] ease-ui ${i === at ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
        />
      ))}
      {/* The green tint: darker at the top (the bar) and the foot, so white words read on any photo. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_34_10/0.86),rgb(18_44_12/0.58)_38%,rgb(18_44_12/0.62)_62%,rgb(10_26_6/0.92))]" />

      <header className="js-rise flex items-center justify-between gap-6 px-5 py-5 md:px-12 md:py-7">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-[#b5e36b]/70">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 text-[#b5e36b]">
              <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold uppercase tracking-[0.08em]">Pasumai Fresh</span>
        </Link>
        <nav className="flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.14em]">
          {t.shelf.items.map((c) => (
            <Link key={c.slug} href={`/${lang}${c.slug}`} className="hidden text-white/85 transition-colors duration-150 hover:text-[#b5e36b] lg:block">
              {c.label}
            </Link>
          ))}
          <Link href={`/${other}`} hrefLang={other} className="flex min-h-11 items-center text-white/85 transition-colors duration-150 hover:text-[#b5e36b]">
            {other === "ta" ? "தமிழ்" : "EN"}
          </Link>
        </nav>
      </header>

      <div className="js-rise flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center md:px-24">
        {/* key: the words re-enter (the 8px rise) each time the slide changes. */}
        <div key={at} className="enter flex flex-col items-center">
          <p className="flex items-center gap-3 text-[12px] font-medium text-white/85">
            <span aria-hidden="true" className="h-px w-6 bg-white/60" />
            {slides[at].label}
          </p>
          <h2 className="mt-4 max-w-[26ch] text-balance text-[clamp(22px,3.3vw,44px)] font-medium uppercase leading-[1.25] tracking-[0.04em]">
            {slides[at].title}
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href={`/${lang}${t.shelf.items[0].slug}`}
            className="border border-white/70 px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] outline outline-1 outline-offset-4 outline-white/30 transition-colors duration-200 hover:bg-white hover:text-[#10240c]"
          >
            {t.front.shop}
          </Link>
          <a
            href={WHATSAPP.href}
            className="flex min-h-11 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#b5e36b] hover:text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-4" />
            {t.whatsapp}
          </a>
        </div>
      </div>

      {/* Slide numbers: down the left on a laptop, along the foot on a phone. */}
      <ol className="absolute inset-x-0 bottom-5 flex justify-center gap-5 md:inset-x-auto md:bottom-auto md:left-12 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-3">
        {slides.map((s, i) => (
          <li key={s.img}>
            <button
              type="button"
              onClick={() => setAt(i)}
              aria-label={`${t.front.slide} ${i + 1}`}
              aria-current={i === at ? "true" : undefined}
              className="flex min-h-11 min-w-11 items-center justify-center border-b border-transparent text-[11px] tabular-nums text-white/55 transition-colors duration-200 hover:text-white aria-[current=true]:border-[#b5e36b] aria-[current=true]:text-[#b5e36b]"
            >
              0{i + 1}
            </button>
          </li>
        ))}
      </ol>

      <p className="absolute bottom-8 left-12 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl] md:flex">
        {t.front.scroll}
        <span aria-hidden="true" className="h-8 w-px bg-white/50" />
      </p>
    </section>
  );
}
