"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";

gsap.registerPlugin(ScrollTrigger);

// Special products (owner, 21-22 Nov): a half circle rising from the left edge of the screen carries the
// vegetable photographs round its rim. The section stays pinned while the visitor scrolls; the half circle
// turns so the next vegetable comes to the front, and the name, price and line beside it change with it.
// It settles on each vegetable. A click on the front photograph (or "View details") opens that product's
// details in the same place: the photograph grows, and the words become its tags, a quantity, the total
// and the order button. Scrolling on to another vegetable closes the details.
// The same look as the hero: Abhaya Libre ExtraBold in the hero's green, DM Sans, boxy buttons.
// Products and prices come from the dictionary (the first four, all vegetables).
const GREEN = "#4f7047";
const STEP = 90; // degrees between two vegetables on the rim (four vegetables fill the circle)
const NEAR = 1.15; // the front photograph's size against the others
const OPEN = 1.26; // and while its details are open

const WORDS = {
  en: { details: "View details", back: "Back", qty: "Quantity", total: "Total" },
  ta: { details: "விவரங்களைப் பார்", back: "பின்செல்", qty: "அளவு", total: "மொத்தம்" },
};

export default function SpecialWheel({ t, lang }: { t: Dictionary; lang: Locale }) {
  const p = t.products;
  const w = WORDS[lang];
  const items = p.items.slice(0, 4);
  const N = items.length;

  const section = useRef<HTMLElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const prog = useRef({ p: 0 });
  const trigger = useRef<ScrollTrigger | null>(null);
  const phoneRef = useRef(false);
  const openRef = useRef(false);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [dim, setDim] = useState({ w: 1440, h: 900 });

  // Layout (owner, 22 Nov: balanced, not too far and not too close). The page frame is the hero's: 6.25%
  // side margin (20-90px), at most 1600px wide (the .frame utility). Wide screens: the half circle comes
  // from the left edge and its front photograph ends near 42% of the frame; the words start one measured
  // gap after that photograph. Phones: the half circle sits at the top and the words below the photograph.
  const phone = dim.w < 768;
  const margin = Math.min(90, Math.max(20, dim.w * 0.0625));
  const frameW = Math.min(1600, dim.w - 2 * margin);
  const frameL = (dim.w - frameW) / 2;
  const SIZE = phone ? 0.6 : 0.62; // a photograph's width against the half circle's radius
  const reach = 0.7 + (SIZE * NEAR) / 2; // how far the front photograph reaches, in radii
  const R = phone ? Math.min(dim.w * 0.92, dim.h * 0.48) : Math.min(dim.h * 0.86, (frameL + frameW * 0.46) / reach);
  const rim = R * 0.7; // the vegetables sit on this radius
  const size = R * SIZE;
  const cy = phone ? dim.h * 0.06 + R * 0.35 : dim.h * 0.5;
  const photoEdge = rim + (size * NEAR) / 2; // right edge of the front photograph
  const gap = Math.min(150, Math.max(96, dim.w * 0.085));
  const textLeft = photoEdge + gap;
  const textW = Math.min(640, frameL + frameW - textLeft);
  const textTop = cy + (size * NEAR) / 2 + 28; // phones: just under the front photograph

  // Turn the half circle to "v" vegetables along (0 = the first at the front, 3 = the last).
  const apply = (v: number) => {
    gsap.set(group.current, { rotation: -v * STEP });
    const a = Math.round(v) % N;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.min(Math.abs(i - v), N - Math.abs(i - v)); // distance round the circle
      const near = Math.max(0, 1 - d);
      const big = openRef.current && i === a ? OPEN : NEAR;
      gsap.set(el, { rotation: v * STEP, scale: 1 + (big - 1) * near, opacity: 1 - (phoneRef.current ? 1 : 0.4) * Math.min(1, d) });
    });
    if (a !== activeRef.current) {
      // Another vegetable came to the front: its details start closed, at one.
      activeRef.current = a;
      openRef.current = false;
      setActive(a);
      setOpen(false);
      setQty(1);
    }
  };

  useEffect(() => {
    const el = section.current!;
    const measure = () => setDim({ w: el.clientWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    phoneRef.current = dim.w < 768; // read by the scroll callback, which outlives a render
    apply(prog.current.p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dim]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // The turning takes 0.8 of a screen per vegetable; then the section holds still for one more screen
      // while the next part (WhyUs) slides up over it as a layer (owner, 22 Nov).
      const turn = (N - 1) * 0.8;
      const total = turn + 1;
      const stops = [...items.map((_, i) => (i * 0.8) / total), 1];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${total * window.innerHeight}`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: stops, directional: false, inertia: false, delay: 0.12, duration: { min: 0.25, max: 0.6 }, ease: "power1.inOut" },
          invalidateOnRefresh: true,
        },
      });
      tl.to(prog.current, { p: N - 1, duration: turn, ease: "none", onUpdate: () => apply(prog.current.p) }).to({}, { duration: 1 });
      const tween = tl;
      trigger.current = tween.scrollTrigger ?? null;
    }, section);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N]);

  // Scroll to a vegetable (or just turn to it when the page is not pinned).
  const goTo = (i: number) => {
    const st = trigger.current;
    if (st) window.scrollTo({ top: st.start + ((i * 0.8) / ((N - 1) * 0.8 + 1)) * (st.end - st.start), behavior: "smooth" });
    else {
      prog.current.p = i;
      apply(i);
    }
  };

  // Open or close the details of the vegetable at the front; its photograph grows or settles back.
  const toggle = (next: boolean) => {
    openRef.current = next;
    setOpen(next);
    if (!next) setQty(1);
    gsap.to(cards.current[active], { scale: next ? OPEN : NEAR, duration: 0.6, ease: "power3.out" });
  };

  const item = items[active];
  const order = `${WHATSAPP.href}?text=${encodeURIComponent(`${p.order}: ${item.name} x${qty} (${item.tags[0]})`)}`;
  const btn = "inline-flex h-[clamp(48px,7vh,56px)] items-center justify-center rounded-[10px] px-7 text-[16px] font-bold transition-colors duration-200";

  return (
    <section ref={section} aria-labelledby="special-wheel" className="relative h-svh min-h-[600px] overflow-clip bg-[#f6f7f1]">
      <h2 id="special-wheel" className="sr-only">
        {p.title}
      </h2>

      {/* The half circle: only its right half shows, rising from the left edge. */}
      <div aria-hidden="true" className="absolute rounded-full bg-[#e8efda]" style={{ left: -R, top: cy - R, width: R * 2, height: R * 2 }} />
      <div aria-hidden="true" className="absolute rounded-full border border-[#4f7047]/20" style={{ left: -rim, top: cy - rim, width: rim * 2, height: rim * 2 }} />
      <div aria-hidden="true" className="absolute rounded-full border border-dashed border-[#4f7047]/20" style={{ left: -R * 0.4, top: cy - R * 0.4, width: R * 0.8, height: R * 0.8 }} />

      {/* The turning rim, with the vegetables on it. The front one opens its details; the others come forward. */}
      <div ref={group} className="absolute" style={{ left: 0, top: cy, width: 0, height: 0 }}>
        {items.map((it, i) => {
          const a = (i * STEP * Math.PI) / 180;
          return (
            <button
              key={it.name}
              type="button"
              ref={(el) => {
                cards.current[i] = el;
              }}
              aria-label={i === active ? `${it.name}: ${w.details}` : it.name}
              onClick={() => (i === active ? toggle(!open) : goTo(i))}
              className="absolute cursor-pointer overflow-hidden rounded-full border-[6px] border-white bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]"
              style={{ width: size, height: size, left: rim * Math.cos(a) - size / 2, top: rim * Math.sin(a) - size / 2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.img} alt="" className="size-full object-cover" />
            </button>
          );
        })}
      </div>

      {/* The words beside it change with the vegetable at the front. */}
      <div
        className={phone ? "absolute" : "absolute top-1/2 -translate-y-1/2"}
        style={{
          fontFamily: '"DM Sans Variable", "DM Sans", "Noto Sans Tamil", sans-serif',
          ...(phone ? { left: margin, right: margin, top: textTop } : { left: textLeft, width: textW }),
        }}
      >
        <p className="text-[14px] font-medium uppercase tracking-[0.06em] text-[#444]">{p.title}</p>
        <div key={`${active}-${open}`} className="enter">
          <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.08em] text-[#4f7047]">{item.group}</p>
          <h3
            className={`mt-1 leading-[0.9] tracking-[-0.05em] ${open ? "text-[clamp(40px,min(5vw,9.5vh),84px)]" : "text-[clamp(44px,min(6.6vw,12.5vh),112px)]"}`}
            style={{ fontFamily: '"Abhaya Libre", "Times New Roman", "Noto Sans Tamil", serif', fontWeight: 800, color: GREEN }}
          >
            {item.name}
          </h3>

          {!open ? (
            <>
              <p className="mt-[clamp(12px,2.4vh,20px)] flex items-baseline gap-3">
                <span className="text-[clamp(28px,min(3vw,6vh),46px)] font-bold leading-none text-black">
                  {p.unit} {item.price}
                </span>
                <span className="text-[16px] text-[#999fa6]">/ {item.tags[0]}</span>
              </p>
              <p className="mt-4 max-w-[38ch] text-[clamp(16px,1.15vw,19px)] leading-[1.55] text-[#505050]">{item.line}</p>
              <div className="mt-[clamp(16px,3.2vh,28px)] flex flex-wrap gap-3">
                <a href={order} className={`${btn} bg-[#4f7047] text-white hover:bg-[#444]`}>
                  {p.shop}
                </a>
                <button type="button" onClick={() => toggle(true)} className={`${btn} border border-[#444]/30 text-[#222] hover:bg-[#444] hover:text-white`}>
                  {w.details}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 max-w-[42ch] text-[clamp(16px,1.15vw,19px)] leading-[1.55] text-[#505050]">{item.line}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-[8px] border border-[#dbdee5] px-3 py-1.5 text-[14px] text-[#444]">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-[#dbdee5] pt-5">
                <div>
                  <p className="text-[14px] text-[#999fa6]">{w.qty}</p>
                  <div className="mt-2 flex items-center rounded-[10px] border border-[#dbdee5]">
                    <button type="button" aria-label="-" onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-12 text-[22px] hover:bg-[#eef3e3]">
                      −
                    </button>
                    <span className="w-12 text-center text-[18px] font-bold tabular-nums">{qty}</span>
                    <button type="button" aria-label="+" onClick={() => setQty((q) => Math.min(20, q + 1))} className="size-12 text-[22px] hover:bg-[#eef3e3]">
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-[#999fa6]">{w.total}</p>
                  <p className="mt-2 text-[clamp(26px,min(2.6vw,5vh),36px)] font-bold leading-[48px] tabular-nums text-black">
                    {p.unit} {(item.price * qty).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={order} className={`${btn} bg-[#4f7047] text-white hover:bg-[#444]`}>
                  {p.shop}
                </a>
                <button type="button" onClick={() => toggle(false)} className={`${btn} border border-[#444]/30 text-[#222] hover:bg-[#444] hover:text-white`}>
                  {w.back}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-[clamp(18px,3.6vh,32px)] flex items-center gap-4">
          <span className="text-[14px] tabular-nums text-[#444]">
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {items.map((it, i) => (
              <button
                key={it.name}
                type="button"
                aria-label={it.name}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#4f7047]" : "w-2 bg-[#4f7047]/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
