"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { useCart } from "./Cart";
import { Icon } from "./icons";

// Shop by category (owner, 21 Nov): category pills with their emoji, then a row of product cards that
// slides by itself, stops while a hand or the keyboard is on it, and has arrows on both sides.
// A product with a photo shows the photo; the rest show their emoji, gently floating.
const TINT: Record<string, string> = {
  veg: "#e9f4d0",
  fruit: "#fde6d3",
  green: "#daf0d6",
  coconut: "#dff0ea",
  spice: "#fbe0d8",
  meat: "#f8dbe0",
};

export default function Shop({ c }: { c: Content }) {
  const s = c.shop;
  const { add, setQty, qtyOf } = useCart();
  const [cat, setCat] = useState("all");
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLUListElement>(null);
  const list = cat === "all" ? s.items : s.items.filter((i) => i.cat === cat);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const w = first.offsetWidth + 16;
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 8) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  // The hero's department shortcuts pick a category here.
  useEffect(() => {
    const on = (e: Event) => {
      setCat((e as CustomEvent<string>).detail);
      track.current?.scrollTo({ left: 0 });
    };
    window.addEventListener("shop-cat", on);
    return () => window.removeEventListener("shop-cat", on);
  }, []);

  // The automatic slide: one card every 3.5 s, unless paused or the visitor asked for less motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => step(1), 3500);
    return () => clearInterval(t);
  });

  return (
    <section id="products" className="scroll-mt-20 bg-mist py-20 md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="eyebrow" data-reveal>
              <i className="size-1.5 rounded-full bg-deep" />
              {s.eyebrow}
            </span>
            <h2 className="h2x mt-6" data-reveal>
              {s.title}
            </h2>
            <p className="mt-4 text-[17px] text-muted" data-reveal>
              {s.lead}
            </p>
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d === -1 ? s.prev : s.next}
                onClick={() => step(d)}
                className="flex size-12 items-center justify-center rounded-lg bg-white transition-colors duration-200 hover:bg-night hover:text-white"
              >
                <Icon name="arrow" className={`size-5 ${d === -1 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={s.title}>
          {[["all", "✨", s.all], ...s.cats].map(([id, emoji, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={cat === id}
              onClick={() => {
                setCat(id);
                track.current?.scrollTo({ left: 0 });
              }}
              className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-white px-4 text-[15px] font-medium transition-colors duration-200 hover:bg-lime aria-pressed:bg-night aria-pressed:text-white"
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="wrap mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {list.map((item, i) => {
          const q = qtyOf(item.id);
          return (
            <li key={item.id} className="w-[min(72vw,260px)] shrink-0 snap-start">
              <article className="group flex h-full flex-col rounded-[24px] bg-white p-3 transition-transform duration-300 ease-ui hover:-translate-y-1">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[18px]" style={{ background: TINT[item.cat] }}>
                  {item.img ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-ui group-hover:scale-105" />
                      <span aria-hidden="true" className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-[18px]">{item.emoji}</span>
                    </>
                  ) : (
                    <span aria-hidden="true" className="text-[88px] drop-shadow-md" style={{ animation: `bob 3.2s ease-in-out ${(i % 5) * -0.6}s infinite` }}>
                      {item.emoji}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                  <h3 className="text-[19px] font-medium tracking-[-0.01em]">{item.name}</h3>
                  <p className="text-[13px] text-muted">{item.unit}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-[18px] font-medium">Rs. {item.price}</p>
                    {q === 0 ? (
                      <button
                        type="button"
                        onClick={() => add({ id: item.id, name: item.name, price: item.price, unit: item.unit, emoji: item.emoji })}
                        className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-night px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-deep"
                      >
                        {c.cart.add}
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full bg-lime p-1 text-night">
                        <button type="button" aria-label="-" onClick={() => setQty(item.id, q - 1)} className="flex size-8 items-center justify-center rounded-full text-[18px] hover:bg-white/60">−</button>
                        <span className="w-6 text-center text-[15px] font-semibold">{q}</span>
                        <button type="button" aria-label="+" onClick={() => setQty(item.id, q + 1)} className="flex size-8 items-center justify-center rounded-full text-[18px] hover:bg-white/60">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
