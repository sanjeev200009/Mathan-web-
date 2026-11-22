"use client";

import { useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { Icon } from "./icons";

// A row of cards that snaps as you swipe or press the arrows; the dots follow where you are.
// ponytail: the three customers are samples (see content.ts).
export default function Testimonials({ c }: { c: Content }) {
  const t = c.testimonials;
  const track = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement;
    setAt(Math.round(el.scrollLeft / (card.offsetWidth + 20)));
  };

  return (
    <section className="overflow-hidden py-20 md:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="eyebrow" data-reveal>
              <i className="size-1.5 rounded-full bg-deep" />
              {t.eyebrow}
            </span>
            <h2 className="h2x mt-6" data-reveal>
              {t.title}
            </h2>
          </div>
          <div className="flex gap-2" data-reveal>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d === -1 ? t.prev : t.next}
                onClick={() => go(d)}
                className="flex size-12 items-center justify-center rounded-lg bg-mist transition-colors duration-200 hover:bg-night hover:text-white"
              >
                <Icon name="arrow" className={`size-5 ${d === -1 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <ul
          ref={track}
          onScroll={onScroll}
          data-stagger
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {t.items.map((it, i) => (
            <li key={it.name} className="w-[min(88vw,520px)] shrink-0 snap-start">
              <figure className={`flex h-full min-h-[320px] flex-col justify-between rounded-[28px] p-8 md:p-10 ${i === 1 ? "bg-night text-white" : "bg-mist"}`}>
                <blockquote className="text-[clamp(20px,2vw,28px)] font-medium leading-[1.25] tracking-[-0.02em]">“{it.quote}”</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-lime text-[16px] font-medium text-night">{it.name[0]}</span>
                  <span>
                    <span className="block text-[16px] font-medium">{it.name}</span>
                    <span className={`block text-[14px] ${i === 1 ? "text-white/60" : "text-muted"}`}>{it.place}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2" aria-hidden="true">
          {t.items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === at ? "w-8 bg-night" : "w-1.5 bg-night/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
