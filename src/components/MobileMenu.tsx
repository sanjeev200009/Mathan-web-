"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { Icon, LeafMark } from "./icons";
import LangSwitch from "./LangSwitch";

type NavGroup = { label: string; href: string; all: string; links: { label: string; href: string }[] };

// Under 1024px: a full-screen sheet with search, every category and its groups, language and WhatsApp.
// Closes on a tap on any link or the close button, or Escape; focus returns to the menu button.
export default function MobileMenu({ lang, t, nav }: { lang: Locale; t: Dictionary; nav: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open && wasOpen.current) trigger.current?.focus();
    wasOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="phone-menu"
        aria-label={open ? t.menu.close : t.menu.open}
        onClick={() => setOpen(true)}
        className="-ml-2.5 grid size-11 place-items-center rounded-full transition-colors duration-150 hover:bg-panel lg:hidden"
      >
        <Icon name="menu" className="size-5" />
      </button>

      {open && (
        <div id="phone-menu" role="dialog" aria-modal="true" aria-label={t.menu.label} className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ground lg:hidden">
          <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-line">
            <span className="flex items-center gap-2 text-[21px] font-medium tracking-[-0.04em]">
              <LeafMark />
              Pasumai Fresh
            </span>
            <button type="button" autoFocus onClick={close} aria-label={t.menu.close} className="-mr-2.5 grid size-11 place-items-center rounded-full hover:bg-panel">
              <Icon name="close" className="size-5" />
            </button>
          </div>

          <div className="wrap flex flex-col gap-6 py-5">
            <form action={`/${lang}/search`} role="search" className="relative flex items-center">
              <label htmlFor="q-menu" className="sr-only">
                {t.search.label}
              </label>
              <input id="q-menu" name="q" type="search" placeholder={t.search.placeholder} className="h-12 w-full rounded-full bg-panel pl-5 pr-12 text-[16px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-forest/30" />
              <button type="submit" aria-label={t.search.button} className="absolute right-0.5 grid size-11 place-items-center rounded-full text-muted">
                <Icon name="search" className="size-4" />
              </button>
            </form>

            <nav aria-label={t.categories} className="flex flex-col gap-6">
              {nav.map((n) => (
                <div key={n.href}>
                  <Link href={n.href} onClick={close} className="flex min-h-11 items-center justify-between text-[20px] font-medium tracking-[-0.02em]">
                    {n.label}
                    <Icon name="arrow" className="size-4 text-muted" />
                  </Link>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {n.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={close} className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] ring-1 ring-line">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="wrap mt-auto flex items-center justify-between gap-4 border-t border-line py-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
            <LangSwitch lang={lang} label={t.language} />
            <a href={WHATSAPP.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-[15px] font-medium text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/whatsapp.svg" alt="" width={20} height={20} className="size-5" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
