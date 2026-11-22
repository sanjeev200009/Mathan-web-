"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";

// The questions, one open at a time. The answer opens by animating its grid row from 0fr to 1fr,
// so no height is measured and nothing jumps.
export default function Faq({ c }: { c: Content }) {
  const f = c.faq;
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="wrap scroll-mt-20 py-20 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <span className="eyebrow" data-reveal>
            <i className="size-1.5 rounded-full bg-deep" />
            {f.eyebrow}
          </span>
          <h2 className="h2x mt-6 max-w-[12ch]" data-reveal>
            {f.title}
          </h2>
        </div>
        <ul data-stagger className="divide-y divide-night/10 border-y border-night/10">
          {f.items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.q}>
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(18px,1.7vw,24px)] font-medium tracking-[-0.02em]"
                >
                  {it.q}
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${on ? "rotate-45 bg-lime" : "bg-mist"}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-500 ease-ui" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <p className="overflow-hidden pr-14 text-[16px] leading-relaxed text-muted">
                    <span className="block pb-6">{it.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
