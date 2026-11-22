import Link from "next/link";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { Icon } from "./icons";

// The footer (owner's shop design, 19 Nov): deep forest green with the name and tagline, quick links
// to the categories, contact (WhatsApp, the city), the four social networks in their own colours, and
// a bottom line with the year, the language switch and the photo credit.
// ponytail: the social links point at each network's home until the shop's own pages are known.
const SOCIAL = [
  { name: "Facebook", icon: "/icons/facebook.svg", href: "https://www.facebook.com/" },
  { name: "Instagram", icon: "/icons/instagram.svg", href: "https://www.instagram.com/" },
  { name: "YouTube", icon: "/icons/youtube.svg", href: "https://www.youtube.com/" },
  { name: "TikTok", icon: "/icons/tiktok.svg", href: "https://www.tiktok.com/" },
];

export default function SiteFooter({ t, lang }: { t: Dictionary; lang: Locale }) {
  const f = t.more.footer;
  const other = lang === "en" ? "ta" : "en";

  return (
    <footer className="bg-forest text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={`/${lang}`} className="inline-flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-[#b5e36b]/70">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 text-[#b5e36b]">
                <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" />
              </svg>
            </span>
            <span>
              <span className="block text-[18px] font-semibold leading-tight">Pasumai Fresh</span>
              <span className="block text-[13px] text-white/65">{f.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-white/70">{f.about}</p>
        </div>

        <nav aria-label={f.links}>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#b5e36b]">{f.links}</h2>
          <ul className="mt-3">
            <li>
              <Link href={`/${lang}`} className="inline-flex min-h-11 items-center text-[15px] text-white/80 transition-colors hover:text-white">
                {f.home}
              </Link>
            </li>
            {t.shelf.items.map((c) => (
              <li key={c.slug}>
                <Link href={`/${lang}${c.slug}`} className="inline-flex min-h-11 items-center text-[15px] text-white/80 transition-colors hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#b5e36b]">{f.contact}</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a href={WHATSAPP.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 text-white/85 hover:text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/whatsapp.svg" alt="" className="size-5" />
                {WHATSAPP.label}
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/85">
              <Icon name="pin" className="size-5 text-[#b5e36b]" />
              {f.place}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#b5e36b]">{f.follow}</h2>
          <ul className="mt-4 flex gap-3">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.name}
                  className="flex size-11 items-center justify-center rounded-full bg-white transition-transform duration-150 ease-ui hover:-translate-y-0.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="max-h-5 max-w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-[13px] text-white/60">
          <p>
            © 2026 Pasumai Fresh. {f.rights}
          </p>
          <p className="flex items-center gap-4">
            <span>{f.photos}</span>
            <Link href={`/${other}`} hrefLang={other} className="inline-flex min-h-11 items-center text-white/85 hover:text-white">
              {other === "ta" ? "தமிழ்" : "English"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
