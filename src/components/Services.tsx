import Link from "next/link";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { Icon, type IconName } from "./icons";

// How an order reaches you (owner's shop design, 19 Nov): three service cards - home delivery, store
// pickup, cash on delivery - then the design's two banners, "Good food, good life" with its basket and
// "Your order, on its way" with the WhatsApp button. One screen on a laptop, stacked on a phone.
export default function Services({ t, lang }: { t: Dictionary; lang: Locale }) {
  const s = t.more.services;
  const banners = [
    { ...s.food, href: `/${lang}${t.shelf.items[0].slug}`, outside: false },
    { ...s.order, href: WHATSAPP.href, outside: true },
  ];

  return (
    // A soft leaf-green band, so the long white page gets one change of ground (owner, 19 Nov: "not up
    // to the standard").
    <section className="bg-[#eef4ea]">
    <div className="wrap py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-leaf">{s.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(30px,3.2vw,46px)] font-medium leading-[1.08] tracking-[-0.03em]">{s.title}</h2>
        </div>
        <p className="max-w-[40ch] text-[15px] text-muted">{s.lead}</p>
      </div>

      <ul className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
        {s.items.map((item) => (
          <li key={item.title} className="flex items-start gap-4 rounded-[24px] bg-white p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-white">
              <Icon name={item.icon as IconName} className="size-[22px]" />
            </span>
            <span>
              <span className="block text-[17px] font-medium leading-tight">{item.title}</span>
              <span className="mt-1 block text-[14px] leading-snug text-muted">{item.line}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid gap-3 md:mt-4 md:gap-4 lg:grid-cols-[7fr_5fr]">
        {banners.map((b) => (
          <Link
            key={b.title}
            href={b.href}
            {...(b.outside ? { target: "_blank", rel: "noopener" } : {})}
            className="group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[24px] p-6 text-white md:min-h-[320px] md:p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 ease-ui group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_26_6/0.86),rgb(10_26_6/0.55)_45%,rgb(10_26_6/0.05)_80%)]" />
            <span className="max-w-[18ch] text-[clamp(26px,2.6vw,38px)] font-medium leading-[1.1] tracking-[-0.02em]">
              {b.title}
            </span>
            <span className="mt-2 text-[15px] text-white/80">{b.line}</span>
            <span className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-white px-5 text-[13px] font-medium text-forest transition-transform duration-150 ease-ui group-hover:-translate-y-px">
              {b.outside && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/icons/whatsapp.svg" alt="" className="size-4" />
              )}
              {b.cta}
              <Icon name="arrowUpRight" className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
    </section>
  );
}
