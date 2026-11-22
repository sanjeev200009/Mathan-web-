import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { Icon, LeafMark } from "./icons";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";

// The top bar, after the owner's reference: the categories on the left, the name in the middle,
// search, language and cart on the right. One white bar with a hairline, held at the top.
export default function SiteHeader({ lang, t, cartCount = 0 }: { lang: Locale; t: Dictionary; cartCount?: number }) {
  const home = `/${lang}`;
  const nav = t.nav.map((n) => ({
    label: n.label,
    href: home + n.slug,
    all: n.all,
    links: n.links.map((l) => ({ label: l.label, href: home + l.href })),
  }));

  // Solid, never blurred: a backdrop-filter here would trap the phone menu's fixed sheet inside the bar.
  // HIDDEN for now (owner, 10 Nov: "keep bg image only, hide all"); remove `hidden` to bring it back.
  return (
    <header hidden className="sticky top-0 z-50 border-b border-line bg-ground">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ground focus:px-4 focus:py-3 focus:ring-1 focus:ring-line">
        {t.skip}
      </a>
      <div className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
        {/* Left: the menu button on a phone, the three category menus on a desktop. */}
        <div className="flex items-center">
          <MobileMenu lang={lang} t={t} nav={nav} />
          <nav aria-label={t.categories} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href} className="group relative">
                  <Link
                    href={n.href}
                    className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[15px] text-ink transition-colors duration-150 hover:bg-panel group-focus-within:bg-panel"
                  >
                    {n.label}
                    <Icon name="chevron" className="size-4 text-muted transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  {/* Opens after 150ms on hover, at once on keyboard focus; fades up 4px. */}
                  <div className="invisible absolute left-0 top-full z-10 translate-y-1 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-ui)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="w-max min-w-64 rounded-2xl bg-ground p-2 shadow-[0_24px_48px_-24px_rgb(20_23_20/0.3)] ring-1 ring-line">
                      <ul>
                        {n.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="flex min-h-11 items-center rounded-xl px-3 text-[15px] transition-colors duration-150 hover:bg-panel">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href={n.href} className="group/all mt-1 flex min-h-11 items-center justify-between gap-6 rounded-xl border-t border-line px-3 text-[15px] font-medium hover:bg-panel">
                        {n.all}
                        <Icon name="arrow" className="size-4 transition-transform duration-150 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Middle: the name. */}
        <Link href={home} className="flex min-h-11 items-center gap-2" aria-label={`Pasumai Fresh, ${t.home}`}>
          <LeafMark className="size-6 lg:size-7" />
          <span className="text-[21px] font-medium tracking-[-0.04em] lg:text-[25px]">Pasumai Fresh</span>
        </Link>

        {/* Right: search, language, cart. */}
        <div className="flex items-center justify-end gap-1 lg:gap-3">
          <form action={`${home}/search`} role="search" className="relative hidden items-center xl:flex">
            <label htmlFor="q-top" className="sr-only">
              {t.search.label}
            </label>
            <input
              id="q-top"
              name="q"
              type="search"
              placeholder={t.search.placeholder}
              className="h-11 w-48 rounded-full bg-panel pl-4 pr-11 text-[14px] text-ink transition-shadow duration-150 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-forest/30"
            />
            <button type="submit" aria-label={t.search.button} className="absolute right-0 grid size-11 place-items-center rounded-full text-muted hover:text-ink">
              <Icon name="search" className="size-4" />
            </button>
          </form>
          <div className="hidden lg:block">
            <LangSwitch lang={lang} label={t.language} />
          </div>
          <Link href={`${home}/cart`} className="group flex min-h-11 items-center gap-2.5 pl-2" aria-label={`${t.cart}, ${cartCount} ${t.cartItems}`}>
            <span className="hidden text-[15px] lg:inline">
              {t.cart} <sup className="text-[11px] text-muted tabular-nums">{cartCount}</sup>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-forest text-white transition-transform duration-150 ease-[var(--ease-ui)] group-hover:-translate-y-0.5 group-active:scale-95">
              <Icon name="bag" className="size-[18px]" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
