import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Icon, type IconName } from "./icons";

// Why choose us (owner's shop design, 19 Nov): the design's five reasons beside one tall photograph.
// Photo left, heading and the five rows right; a phone puts the photo on top.
export default function WhyUs({ t }: { t: Dictionary }) {
  const w = t.more.why;

  return (
    <section className="wrap grid items-center gap-8 py-16 md:py-24 lg:grid-cols-[5fr_6fr] lg:gap-16">
      <div className="group overflow-hidden rounded-[24px] bg-panel max-lg:aspect-[4/3] lg:h-[min(78svh,680px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={w.img}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-ui group-hover:scale-[1.03]"
        />
      </div>

      <div>
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-leaf">{w.eyebrow}</p>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(30px,3.2vw,46px)] font-medium leading-[1.08] tracking-[-0.03em]">{w.title}</h2>
        <p className="mt-3 text-[15px] text-muted">{w.lead}</p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {w.items.map((item) => (
            <li key={item.title} className="flex items-center gap-5 py-4 md:py-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e3efe5] text-forest">
                <Icon name={item.icon as IconName} className="size-5" />
              </span>
              <span>
                <span className="block text-[17px] font-medium leading-tight">{item.title}</span>
                <span className="mt-1 block text-[14px] text-muted">{item.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
