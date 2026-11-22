"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { addToBasket } from "@/lib/shop";
import ShopNav from "./ShopNav";

// The hero, after the owner's Figma frame "Hero" (1440 x 990), read from the .fig file.
// 22 Nov: it is a real layout now, not a scaled picture of the frame, so it fills the screen at every size:
// - the words, buttons, nav and offer card are ordinary type and boxes sized with the screen;
// - only the picture side (the leaf with the dish and the small leaves) keeps the design's own coordinates,
//   cut to the part x 600..1440, y 0..860 of the frame, and is scaled to fill the right of the screen.
// Every colour, size, rotation, shadow and vector path is the file's own. Fonts: Abhaya Libre ExtraBold and
// DM Sans are the design's; DM Sans bold stands in for Circular Std and Gilroy (paid faces).
const DM = '"DM Sans Variable", "DM Sans", "Noto Sans Tamil", sans-serif';
const AL = '"Abhaya Libre", "Times New Roman", serif';
const SX = 600; // the picture side starts at this x of the design frame
const SW = 840;
const SH = 860;
// Wide screens show the picture side from design y 150 (the sky above the leaf is cut) down to y 760
// (the lowest small leaf may be cut), starting just under the nav.
const TOP = 150;
const VIS = 610;
const GAP = 110; // the least space between the end of the words and the leaf
const LEAF_X = 40; // where the leaf starts inside the picture side, in design px

const mx = (a: number, b: number, c: number, d: number, e: number, f: number) => `matrix(${a},${b},${c},${d},${e},${f})`;

// The design's slanted button: its own vector, mirrored for the green one.
function Slant({ flip, fill }: { flip?: boolean; fill: string }) {
  return (
    <svg viewBox="0 0 223 65" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
      <g transform={flip ? "translate(223 65) scale(-1 -1)" : undefined}>
        <path fill={fill} d="M24.04 6.21 C25.58 2.46 29.23 0.00 33.30 0.00 L213.00 0.00 C218.52 0.00 223.00 4.48 223.00 10.00 L223.00 55.00 C223.00 60.52 218.52 65.00 213.00 65.00 L14.89 65.00 C7.79 65.00 2.95 57.79 5.64 51.21 L24.04 6.21 Z" />
      </g>
    </svg>
  );
}

export default function PixelHero({ t, lang }: { t: Dictionary; lang: Locale }) {
  const box = useRef<HTMLElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const [weight, setWeight] = useState(1); // the hero's 1 kg / 2 kg choice, for its Add to cart
  const words = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  const [wide, setWide] = useState(true);
  const [navPx, setNavPx] = useState(0);
  useLayoutEffect(() => {
    const el = box.current!;
    const f = () => {
      const w = el.clientWidth;
      const isWide = w >= 1024;
      setWide(isWide);
      if (!isWide) {
        setK(Math.min(w, 640) / SW); // narrow screens: the picture fills the width, under the words
        return;
      }
      // Wide screens: as big as the room under the nav allows, but the leaf must start GAP after the words.
      const top = nav.current!.offsetHeight;
      const wordsRight = Math.max(...Array.from(words.current!.children).map((c) => c.getBoundingClientRect().right - el.getBoundingClientRect().left));
      const byHeight = (el.clientHeight - top) / VIS;
      const byWords = (w - wordsRight - GAP) / (SW - LEAF_X);
      setNavPx(top);
      setK(Math.max(0.5, Math.min(byHeight, byWords)));
    };
    f();
    const ro = new ResizeObserver(f);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const navH = "clamp(64px,11vh,104px)";
  const bh = "clamp(52px,7vh,65px)"; // button height; the width keeps the design's 223:65

  return (
    <header ref={box} className="relative isolate overflow-hidden bg-white pb-10 lg:h-svh lg:min-h-[600px] lg:pb-0" style={{ fontFamily: DM }}>
      {/* Nav: the shop's navbar (owner, 22 Nov), in the place and height of the design's */}
      <div ref={nav} className="relative z-30" style={{ height: navH }}>
        <ShopNav t={t} lang={lang} mode="hero" />
      </div>

      {/* The words */}
      <div ref={words} className="frame relative z-10 pt-6 lg:flex lg:h-[calc(100%-clamp(64px,11vh,104px))] lg:flex-col lg:items-start lg:justify-center lg:pb-[clamp(56px,10vh,110px)] lg:pt-0">
            <p className="text-[clamp(13px,1.1vw,16px)] font-medium uppercase leading-[28px] tracking-[0.06em] text-[#444]">Fresh from local farms</p>
            <p className="relative mt-[clamp(10px,3.2vh,43px)] w-fit pb-[0.2em]" style={{ fontSize: "clamp(76px, min(12.6vw, 18.4vh), 200px)" }}>
              <span aria-hidden="true" className="absolute" style={{ left: "2.665em", top: "-0.198em", width: "0.511em", height: "0.786em" }}>
                <svg viewBox="0 0 93 143" className="size-full" fill="#3c5f67" opacity={0.1}>
                  <path d="M93.00 66.05 C93.00 38.51 85.78 19.29 71.33 8.40 C63.84 2.80 55.10 0.00 45.12 0.00 C26.47 0.00 13.33 6.73 5.71 20.20 C1.90 27.01 0.00 34.88 0.00 43.81 C0.00 60.76 6.44 72.56 19.31 79.22 C25.88 82.55 33.56 84.21 42.36 84.21 C51.43 84.06 59.44 81.49 66.40 76.49 C66.14 103.88 62.85 121.66 56.55 129.83 C52.87 134.53 48.14 136.87 42.36 136.87 C34.88 136.87 30.28 133.16 28.57 125.75 C28.18 124.24 27.78 121.74 27.39 118.26 C26.60 110.84 25.09 106.08 22.86 103.96 C20.89 102.14 18.19 101.23 14.78 101.23 C8.47 101.23 4.33 104.26 2.36 110.31 C1.84 111.98 1.58 113.64 1.58 115.31 C1.58 123.93 6.24 131.05 15.57 136.64 C22.79 140.88 30.87 143.00 39.80 143.00 C56.22 143.00 69.29 136.04 79.01 122.12 C88.34 108.50 93.00 89.81 93.00 66.05 Z M25.61 39.95 C25.75 17.55 32.44 6.28 45.71 6.13 C59.37 6.43 66.27 18.54 66.40 42.45 C66.27 65.14 59.31 76.57 45.51 76.72 C33.69 76.72 27.12 67.26 25.81 48.35 C25.68 45.62 25.61 42.82 25.61 39.95 Z" />
                </svg>
              </span>
              <span className="relative block whitespace-nowrap tracking-[-0.08em] text-[#4f7047]" style={{ fontFamily: AL, fontWeight: 800, lineHeight: 0.549 }}>
                pasumai
              </span>
            </p>
            <h1 className="sr-only">Pasumai Fresh: fresh vegetables delivered in Colombo</h1>
            <p className="mt-[clamp(10px,2.4vh,30px)] text-[14px] leading-[18px] text-[#505050]">Today&apos;s harvest</p>
            <p className="mt-[9px] max-w-[29.5em] text-[clamp(16px,1.15vw,20px)] leading-[1.45] text-[#505050]">
              Vegetables, fruits, greens and king coconut, picked fresh and brought to your door in Colombo. Order today, at your door tomorrow.
            </p>
            <fieldset className="mt-[clamp(12px,2.4vh,24px)] w-full max-w-[390px] border-b border-[#dbdee5] pb-[clamp(12px,3.4vh,34px)]">
              <legend className="text-[16px] leading-[28px] text-[#999fa6]">weight</legend>
              <div className="mt-[7px] flex gap-[30px] pl-[2px]">
                {["1 kg", "2 kg"].map((label, i) => (
                  <label key={label} className="flex cursor-pointer items-center gap-[11px] text-[16px] leading-[28px] text-black">
                    <input type="radio" name="hero-weight" checked={weight === i + 1} onChange={() => setWeight(i + 1)} className="peer sr-only" />
                    <span aria-hidden="true" className="size-[19px] rounded-full border-2 border-[#dbdee5] peer-checked:border-[6px] peer-checked:border-[#4f7047] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#4f7047]" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-[clamp(18px,5vh,51px)] flex" style={{ height: bh }}>
              <button type="button" onClick={() => addToBasket("tomato", weight)} className="relative flex h-full items-center justify-center text-[clamp(14px,min(3.8vw,2.3vh),18px)] font-bold whitespace-nowrap text-white transition-transform duration-200 hover:-translate-y-0.5" style={{ width: wide ? `max(212px, calc(${bh} * 3.4308))` : "50%", filter: "drop-shadow(0 1.85px 1.6px rgba(79,112,71,0.024))" }}>
                <Slant flip fill="#4f7047" />
                <span className="relative -translate-x-[4%]">Add To Cart</span>
              </button>
              <a href={WHATSAPP.href} className="relative flex h-full items-center justify-center text-[clamp(14px,min(3.8vw,2.3vh),18px)] font-bold whitespace-nowrap text-white transition-transform duration-200 hover:-translate-y-0.5" style={{ width: wide ? `max(212px, calc(${bh} * 3.4308))` : "calc(50% + 7px)", marginLeft: `calc(${bh} * -0.1077)`, filter: "drop-shadow(0 1.85px 1.6px rgba(68,68,68,0.024))" }}>
                <Slant fill="#444" />
                <span className="relative translate-x-[4%]">Order on WhatsApp</span>
              </a>
            </div>
      </div>

      {/* Watch our story: bottom left on a wide screen */}
      <div className="frame relative z-10 mt-8 lg:absolute lg:inset-x-0 lg:bottom-[clamp(20px,5.5vh,56px)] lg:mt-0">
        <a href="#story" className="inline-flex items-center gap-[17px] text-[16px] font-medium uppercase leading-[28px] tracking-[0.06em] text-[#444] hover:text-black">
          <span aria-hidden="true" className="size-[30px] rounded-full bg-[#444]" />
          Watch our story
        </a>
      </div>

      {/* The picture side: the design's own drawing, scaled. Behind the words on a wide screen. */}
      <div aria-hidden="true" className="pointer-events-none relative z-0 mx-auto lg:absolute lg:right-0 lg:top-0" style={wide ? { width: SW * k, height: VIS * k, top: navPx } : { width: SW * k, height: SH * k, marginTop: 16 - 70 * k }}>
        <div className="absolute left-0 origin-top-left" style={{ width: SW, height: SH, top: wide ? -TOP * k : 0, transform: `scale(${k})` }}>
          <div className="absolute left-0 top-0 origin-top-left overflow-hidden" style={{ width: 775.9552, height: 815.1889, transform: mx(0.660671, 0.750675, -0.750675, 0.660671, 1074.21875 - SX, -143.435379) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-food.webp" alt="" fetchPriority="high" className="absolute left-0 top-0 max-w-none origin-top-left" style={{ width: 398.9997, height: 452.492, transform: mx(1, 0, 0, 1, 268.134399, 213.114212), filter: "drop-shadow(0 4px 72px rgba(0,0,0,0.25))" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-food.webp" alt="" className="absolute left-0 top-0 max-w-none origin-top-left" style={{ width: 565.6839, height: 642.0147, transform: mx(0.915748, -0.401753, 0.401753, 0.915748, 0, 227.265106) }} />
          </div>
          <div className="absolute overflow-hidden" style={{ left: 647 - SX, top: 151, width: 764, height: 679 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-a.webp" alt="" className="absolute left-0 top-0 max-w-none origin-top-left" style={{ width: 39.598, height: 44.312, transform: mx(-0.707107, -0.707107, 0.707107, -0.707107, 250.333008, 59.33334) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-a.webp" alt="" className="absolute left-0 top-0 max-w-none origin-top-left" style={{ width: 71.0887, height: 79.5516, transform: mx(0.917437, 0.39788, 0.39788, -0.917437, 543, 514.983948) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-b.webp" alt="" className="absolute max-w-none" style={{ left: 0, top: 551, width: 81, height: 49 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero/leaf-c.webp" alt="" className="absolute max-w-none" style={{ left: 662, top: 593, width: 102, height: 86, filter: "drop-shadow(0 4px 7px rgba(0,0,0,0.25))" }} />
          </div>
        </div>
      </div>

      {/* The two dots on the right */}
      <div aria-hidden="true" className="absolute z-10 hidden flex-col gap-[15px] lg:flex" style={{ right: "clamp(16px,4.3vw,62px)", top: "41.7%" }}>
        <span className="size-[30px] rounded-full bg-[#262626]" />
        <span className="size-[30px] rounded-full bg-[#262626]" />
      </div>

      {/* Offer card: over the leaf, bottom right on a wide screen */}
      <div className="frame relative z-20 lg:absolute lg:bottom-[clamp(16px,5.6vh,55px)] lg:right-[clamp(24px,5.2vw,75px)] lg:mt-0 lg:w-[clamp(440px,38vw,552px)]" style={{ marginTop: k && !wide ? -40 * k : undefined }}>
        <div className="rounded-[20px] border-2 border-dashed border-[#e2e3e1] bg-white/70 backdrop-blur-[37px]">
          <div className="flex items-center justify-between px-[clamp(20px,2.3vw,33px)] pt-[clamp(18px,2.8vh,27px)] text-black">
            <p className="text-[14px] font-bold uppercase leading-none">Today&apos;s offer</p>
            <div className="flex items-center gap-[14px] text-[11px] font-bold uppercase leading-none">
              <button type="button" className="flex items-center gap-[7px] text-[#616161] hover:text-black">
                <svg width="8" height="11" viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M6.21 0.29 C6.60 0.68 6.60 1.32 6.21 1.71 L3.41 4.50 L7.00 4.50 C7.55 4.50 8.00 4.95 8.00 5.50 C8.00 6.05 7.55 6.50 7.00 6.50 L3.41 6.50 L6.21 9.29 C6.60 9.68 6.60 10.32 6.21 10.71 C5.82 11.10 5.18 11.10 4.79 10.71 L0.29 6.21 C-0.10 5.82 -0.10 5.18 0.29 4.79 L4.79 0.29 C5.18 -0.10 5.82 -0.10 6.21 0.29 Z" /></svg>
                Prev
              </button>
              <button type="button" className="flex items-center gap-[7px] hover:opacity-60">
                Next
                <svg width="8" height="11" viewBox="0 0 8 11" fill="currentColor" aria-hidden="true"><path d="M1.79 0.29 C2.18 -0.10 2.82 -0.10 3.21 0.29 L7.71 4.79 C8.10 5.18 8.10 5.82 7.71 6.21 L3.21 10.71 C2.82 11.10 2.18 11.10 1.79 10.71 C1.40 10.32 1.40 9.68 1.79 9.29 L4.59 6.50 L1.00 6.50 C0.45 6.50 0.00 6.05 0.00 5.50 C0.00 4.95 0.45 4.50 1.00 4.50 L4.59 4.50 L1.79 1.71 C1.40 1.32 1.40 0.68 1.79 0.29 Z" /></svg>
              </button>
            </div>
          </div>
          <div aria-hidden="true" className="mt-[clamp(18px,2.8vh,28px)] h-[2px] bg-[radial-gradient(circle,#e2e2e1_1px,transparent_1.2px)] bg-[length:5px_2px]" />
          <div className="flex flex-wrap items-center gap-[clamp(10px,1vw,14px)] px-[clamp(16px,1.9vw,27px)] py-[clamp(12px,2vh,18px)] lg:flex-nowrap">
            <div className="size-[clamp(64px,8.6vh,88px)] shrink-0 overflow-hidden rounded-full bg-[#c4c4c4] shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/p-tomato.webp" alt="" className="size-full object-cover" />
            </div>
            <div className="min-w-0 flex-1 font-bold uppercase text-black">
              <p className="whitespace-nowrap text-[clamp(14px,1.25vw,20px)] leading-tight">Fresh tomato</p>
              <p className="mt-[clamp(8px,1.6vh,17px)] text-[14px] leading-none">1 kg</p>
            </div>
            <div className="font-bold uppercase text-black">
              <p className="whitespace-nowrap text-[clamp(13px,1.15vw,20px)] leading-tight line-through">Rs. 150</p>
              <p className="whitespace-nowrap text-[clamp(20px,1.8vw,30px)] leading-tight">Rs. 120</p>
            </div>
            <button type="button" onClick={() => addToBasket("tomato")} className="inline-flex h-[35px] shrink-0 items-center justify-center whitespace-nowrap rounded-full max-lg:basis-full lg:ml-[clamp(4px,1vw,14px)] bg-[#f4d98b] px-[14px] text-[11px] font-bold uppercase text-black hover:bg-[#efcd6a]">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
