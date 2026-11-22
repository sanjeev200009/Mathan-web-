import Link from "next/link";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import type { Content } from "@/lib/content";
import { Icon, type IconName } from "./icons";

// The Verdantix-style home page sections (owner, 21 Nov), written for Pasumai Fresh. No hooks in this
// file: the motion is added from outside by SiteMotion through data- attributes
// (data-reveal, data-stagger, data-scrub, data-count, data-parallax, data-stack).
// The reference is a Webflow template; this is our own build of the same structure and feel.

const btnLime =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-lime px-6 text-[15px] font-medium text-night transition-colors duration-200 hover:bg-white";

function Eyebrow({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span className={`eyebrow ${dark ? "!border-white/20 !bg-white/8 text-white" : ""}`} data-reveal>
      <i className={`size-1.5 rounded-full ${dark ? "bg-lime" : "bg-deep"}`} />
      {children}
    </span>
  );
}

export function Hero({ c }: { c: Content }) {
  const h = c.hero;
  // A familiar grocery-shop hero: bright and calm. The offer and two buttons on the left, the basket on a
  // soft green panel with two real prices on the right, and photo shortcuts to the departments below.
  const price = (id: string) => c.shop.items.find((i) => i.id === id)!;
  const picks = [price("tomato"), price("kingcoconut")];
  const dept: Record<string, string> = { veg: "/img/cat-vegetables.jpg", fruit: "/img/cat-fruits.jpg", green: "/img/cat-greens.jpg", coconut: "/img/cat-coconut.jpg", spice: "/img/cat-groceries.jpg" };
  const shortcuts = c.shop.cats.filter(([id]) => dept[id]);
  return (
    <header data-hero className="relative isolate flex min-h-svh flex-col bg-[#f4f1e8] text-night">
      <div className="wrap grid flex-1 items-center gap-8 pb-8 pt-28 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-24">
        <div>
          <p className="js-rise inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-[14px] font-medium">
            <Icon name="truck" className="size-4 text-deep" />
            {h.fact}
          </p>
          <h1 className="js-rise mt-5 max-w-[13ch] text-balance text-[clamp(40px,5vw,76px)] font-semibold leading-[1.02] tracking-[-0.035em] lang-ta:text-[clamp(30px,3.8vw,56px)] lang-ta:leading-[1.15] lang-ta:tracking-normal">
            {h.before} <span className="text-deep">{h.accent}</span>
          </h1>
          <p className="js-rise mt-5 max-w-[44ch] text-[clamp(16px,1.3vw,19px)] leading-relaxed text-night/70">{h.lead}</p>
          <div className="js-rise mt-8 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-night px-7 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-deep">
              {h.primary}
              <Icon name="arrow" className="size-4" />
            </a>
            <a href={WHATSAPP.href} className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border border-night/25 px-7 text-[16px] font-semibold transition-colors duration-200 hover:bg-night hover:text-white">
              {h.secondary}
            </a>
          </div>
        </div>

        <div className="js-rise relative h-[min(420px,56svh)] overflow-hidden rounded-[28px] bg-[#dcebb8] lg:h-[min(560px,64svh)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/hero-vegetables.webp" alt="" width={1516} height={1037} fetchPriority="high" className="absolute -bottom-[6%] left-1/2 w-[112%] max-w-none -translate-x-1/2" />
          {picks.map((p, i) => (
            <div key={p.id} className={`absolute flex items-center gap-3 rounded-xl bg-white p-2 pr-4 shadow-[0_10px_30px_-12px_rgb(2_42_9/0.4)] ${i === 0 ? "left-4 top-4" : "bottom-5 right-4"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" className="size-12 rounded-lg object-cover" />
              <p className="leading-tight">
                <span className="block text-[15px] font-semibold">{p.name}</span>
                <span className="block text-[13px] text-night/60">
                  Rs. {p.price} · {p.unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <nav aria-label={c.shop.title} className="js-rise wrap pb-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shortcuts.map(([id, , label]) => (
            <li key={id}>
              <a
                href="#products"
                onClick={() => window.dispatchEvent(new CustomEvent("shop-cat", { detail: id }))}
                className="group flex items-center gap-3 rounded-xl border border-night/10 bg-white p-2 pr-4 transition-colors duration-200 hover:border-night"
              >
                <span className="size-14 shrink-0 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dept[id]} alt="" className="size-full object-cover transition-transform duration-500 ease-ui group-hover:scale-105" />
                </span>
                <span className="text-[15px] font-semibold">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Marquee({ c }: { c: Content }) {
  // A quiet strip of the shop's departments: plain words, small dots, no pictures.
  return (
    <section aria-label={c.marqueeLead} className="overflow-hidden border-b border-night/10 bg-white py-5">
      <ul className="marquee flex [--marquee-time:45s]" aria-hidden="true">
        {Array.from({ length: 6 }, () => c.marquee).flat().map((w, i) => (
          <li key={i} className="mr-8 flex shrink-0 items-center gap-8 text-[15px] font-medium uppercase tracking-[0.08em] text-night/70">
            {w}
            <i className="size-1 rounded-full bg-deep" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About({ c }: { c: Content }) {
  const a = c.about;
  return (
    <section id="about" className="wrap scroll-mt-20 py-20 md:py-32">
      <Eyebrow>{a.eyebrow}</Eyebrow>
      {/* Every word is its own span; SiteMotion lights them one by one as the page scrolls. */}
      <p data-scrub className="mt-8 max-w-[28ch] text-[clamp(28px,4.4vw,64px)] font-medium leading-[1.12] tracking-[-0.03em] lang-ta:leading-[1.35] lang-ta:tracking-normal">
        {a.scrub.split(" ").map((w, i) => (
          <span key={i} data-word>
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="mt-16 overflow-hidden rounded-[28px] md:mt-24" data-reveal>
        <div className="aspect-[16/8] overflow-hidden bg-mist">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-pimg src="/img/banner-basket.jpg" alt="" loading="lazy" className="size-full scale-[1.15] object-cover" />
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <h2 className="h2x max-w-[14ch]" data-reveal>
          {a.title}
        </h2>
        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {a.features.map((f) => (
            <article key={f.title} className="group rounded-[24px] bg-mist p-7 transition-colors duration-300 hover:bg-night hover:text-white">
              <span className="flex size-12 items-center justify-center rounded-full bg-lime text-night">
                <Icon name={f.icon as IconName} className="size-5" />
              </span>
              <h3 className="mt-10 text-[22px] font-medium tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/70">{f.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function How({ c }: { c: Content }) {
  const h = c.how;
  return (
    <section id="how" className="wrap scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[640px] text-center">
        <Eyebrow>{h.eyebrow}</Eyebrow>
        <h2 className="h2x mt-6" data-reveal>
          {h.title}
        </h2>
        <p className="mt-4 text-[17px] text-muted" data-reveal>
          {h.lead}
        </p>
      </div>

      <ol data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {h.steps.map((s) => (
          <li key={s.n} className="relative rounded-[28px] bg-mist p-8 pt-10 text-center">
            <span className="absolute left-6 top-6 text-[14px] font-medium text-deep">{s.n}</span>
            <span aria-hidden="true" className="mx-auto flex size-24 items-center justify-center rounded-full bg-lime text-[46px]">{s.emoji}</span>
            <h3 className="mt-8 text-[26px] font-medium tracking-[-0.02em]">{s.title}</h3>
            <p className="mx-auto mt-3 max-w-[30ch] text-[16px] leading-relaxed text-muted">{s.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Solutions({ c }: { c: Content }) {
  const s = c.solutions;
  return (
    <section className="bg-night py-20 text-white md:py-32">
      <div className="wrap">
        <div className="max-w-[640px]">
          <Eyebrow dark>{s.eyebrow}</Eyebrow>
          <h2 className="h2x mt-6" data-reveal>
            {s.title}
          </h2>
        </div>
        <ul data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {s.cards.map((card, i) => (
            <li key={card.title} className="group relative aspect-[3/4] overflow-hidden rounded-[28px] bg-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.img} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 ease-ui group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(2_42_9/0.1),rgb(2_42_9/0.85))]" />
              <span className="absolute left-6 top-6 flex size-10 items-center justify-center rounded-full bg-lime text-[14px] font-medium text-night">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-[28px] font-medium tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-white/75">{card.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer({ c, t, lang }: { c: Content; t: Dictionary; lang: Locale }) {
  const f = t.more.footer;
  const social = [
    { name: "Facebook", icon: "/icons/facebook.svg", href: "https://www.facebook.com/" },
    { name: "Instagram", icon: "/icons/instagram.svg", href: "https://www.instagram.com/" },
    { name: "YouTube", icon: "/icons/youtube.svg", href: "https://www.youtube.com/" },
    { name: "TikTok", icon: "/icons/tiktok.svg", href: "https://www.tiktok.com/" },
  ];
  return (
    <footer className="overflow-hidden bg-night text-white">
      <div className="wrap pt-20 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="h2x max-w-[14ch]" data-reveal>
            {c.footer.cta.split(",")[0]}
            {c.footer.cta.includes(",") && <>, <span className="accent text-lime">{c.footer.cta.split(",")[1]?.trim()}</span></>}
          </h2>
          <div className="max-w-[360px]" data-reveal>
            <p className="text-[16px] text-white/70">{c.footer.ctaLead}</p>
            <a href={WHATSAPP.href} className={`${btnLime} mt-5`}>
              {c.footer.button}
              <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/15 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[20px] font-medium">Pasumai Fresh</p>
            <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-white/65">{f.about}</p>
          </div>
          <nav aria-label={f.links}>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-lime">{f.links}</h3>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li><Link href={`/${lang}`} className="text-white/80 hover:text-white">{f.home}</Link></li>
              {c.nav.links.map(([label, href]) => (
                <li key={href}><a href={href} className="text-white/80 hover:text-white">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-lime">{f.contact}</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-white/80">
              <li><a href={WHATSAPP.href} className="hover:text-white">{WHATSAPP.label}</a></li>
              <li>{f.place}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-lime">{f.follow}</h3>
            <ul className="mt-4 flex gap-3">
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} aria-label={s.name} className="flex size-10 items-center justify-center rounded-lg bg-white transition-transform hover:-translate-y-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The wordmark, as large as the page is wide, rising into view. */}
      <p aria-hidden="true" data-wordmark className="select-none whitespace-nowrap text-center text-[clamp(56px,16.5vw,300px)] font-medium leading-[0.8] tracking-[-0.06em] text-white/[0.07]">
        Pasumai Fresh
      </p>
      <div className="wrap flex flex-wrap justify-between gap-3 py-6 text-[13px] text-white/50">
        <span>© 2026 Pasumai Fresh. {f.rights}</span>
        <span>{f.photos}</span>
      </div>
    </footer>
  );
}
