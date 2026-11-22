"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WHATSAPP, type Locale } from "@/app/[lang]/dictionaries";
import type { Content } from "@/lib/content";
import { CartButton } from "./Cart";
import { Icon } from "./icons";

// The fixed top bar: logo, links, language, cart and the order button. Dark ink over the light hero,
// a dark bar with white ink once the page has moved. Hidden until the opening scene has played.
export default function VNav({ lang, c }: { lang: Locale; c: Content }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const rest = usePathname().replace(/^\/(ta|en)(?=\/|$)/, "");
  const dark = solid || open; // the bar is dark, so its ink is white

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const langs = (["ta", "en"] as const).map((l) => (
    <Link
      key={l}
      href={`/${l}${rest}`}
      hrefLang={l}
      lang={l}
      aria-current={l === lang ? "true" : undefined}
      className={`rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
        dark ? "text-white/60 hover:text-white aria-[current=true]:bg-white/15 aria-[current=true]:text-white" : "text-night/60 hover:text-night aria-[current=true]:bg-night/10 aria-[current=true]:text-night"
      }`}
    >
      {l === "ta" ? "தமிழ்" : "EN"}
    </Link>
  ));

  return (
    <header id="site-nav" className={`fixed inset-x-0 top-0 z-50 ${dark ? "text-white" : "text-night"}`}>
      <div
        className={`mx-auto mt-3 flex h-14 w-[min(1280px,100%-24px)] items-center justify-between rounded-xl pl-4 pr-2 ${
          dark ? "bg-night/92 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ transition: "background-color 300ms, box-shadow 300ms" }}
      >
        <Link href={`/${lang}`} className="flex items-center gap-2.5" aria-label="Pasumai Fresh">
          <span className="flex size-8 items-center justify-center rounded-lg bg-lime text-night">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5">
              <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" />
            </svg>
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
            Pasumai Fresh
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {c.nav.links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`rounded-lg px-4 py-2 text-[15px] transition-colors ${dark ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-night/80 hover:bg-night/8 hover:text-night"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center sm:flex" role="group" aria-label="Language">
            {langs}
          </div>
          <CartButton label={c.cart.open} dark={!dark} />
          <a
            href={WHATSAPP.href}
            className={`hidden h-10 items-center rounded-lg px-5 text-[14px] font-semibold transition-colors sm:inline-flex ${dark ? "bg-white text-night hover:bg-lime" : "bg-night text-white hover:bg-deep"}`}
          >
            {c.nav.cta}
          </a>
          <button
            type="button"
            aria-label={open ? c.nav.close : c.nav.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex size-10 items-center justify-center rounded-lg lg:hidden ${dark ? "bg-white text-night" : "bg-night text-white"}`}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="mx-auto mt-2 w-[min(1280px,100%-24px)] rounded-xl bg-night/95 p-3 text-white backdrop-blur-md lg:hidden">
          {c.nav.links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-[17px] hover:bg-white/10">
              {label}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-3">
            <div className="flex">{langs}</div>
            <a href={WHATSAPP.href} className="inline-flex h-10 items-center rounded-lg bg-lime px-5 text-[14px] font-semibold text-night">
              {c.nav.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
