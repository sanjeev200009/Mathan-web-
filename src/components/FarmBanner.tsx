"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

gsap.registerPlugin(ScrollTrigger);

// The ribbon section (owner, 22 Nov: the bento was too predictable; "the whole section relies on the
// ribbon"). One curved ribbon enters at the top left, swings back and forth down the section and leaves at
// the bottom right. A lime ribbon sits behind it as a wipe, the shop's words run along it, and every card
// (the farmer, the four vegetable groups, the shop link) sits on one of its bends. As you scroll the ribbon
// draws itself (lime first, green after), its words slide, and each card pops up the moment the ribbon
// reaches it. Owner's earlier choices still hold: vegetables only, "straight from farmers", menu names.
// The path is built in real pixels from the section's size (not a stretched viewBox), so the ribbon keeps
// its width and the text on it is never squashed.
const OS =
  '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';

const COPY = {
  en: {
    eyebrow: "What we sell",
    title: "Vegetables, straight from the farmer",
    lead: "We buy from local farms ourselves, with no middleman in between, so what reaches you is fresher and fairly priced.",
    all: "All vegetables",
    shop: "Shop",
    end: "Everything on the ribbon, in one place",
    farmTag: "Straight from farmers",
    farmTitle: "From their field to your kitchen",
    farmLine: "No middleman, no long storage. The farmer, us, then you.",
    notes: [
      "From village farms",
      "From the hill country",
      "Potatoes, yams and more",
      "Leafy greens and herbs",
    ],
    ribbon: [
      "Straight from farmers",
      "No middleman",
      "Picked fresh",
      "Fair price",
      "Local vegetables",
      "Up-country",
      "Tubers",
      "Greens",
    ],
  },
  ta: {
    eyebrow: "நாங்கள் விற்பவை",
    title: "விவசாயியிடமிருந்து நேரடியாக காய்கறிகள்",
    lead: "இடைத்தரகர் இல்லாமல் உள்ளூர் தோட்டங்களிலிருந்து நாங்களே வாங்குகிறோம். அதனால் உங்களுக்கு வருவது புதியது, நியாயமான விலையில்.",
    all: "அனைத்து காய்கறிகள்",
    shop: "வாங்க",
    end: "ரிப்பனில் உள்ள அனைத்தும், ஒரே இடத்தில்",
    farmTag: "விவசாயிகளிடமிருந்து நேரடியாக",
    farmTitle: "அவர்களின் வயலிலிருந்து உங்கள் சமையலறைக்கு",
    farmLine: "இடைத்தரகர் இல்லை, நீண்ட சேமிப்பு இல்லை. விவசாயி, நாங்கள், பிறகு நீங்கள்.",
    notes: [
      "கிராமத் தோட்டங்களிலிருந்து",
      "மலையகத்திலிருந்து",
      "உருளை, கிழங்கு வகைகள்",
      "கீரைகள், மூலிகைகள்",
    ],
    ribbon: [
      "விவசாயிகளிடமிருந்து நேரடியாக",
      "இடைத்தரகர் இல்லை",
      "புதிதாகப் பறித்தது",
      "நியாயமான விலை",
      "நாட்டுக் காய்கறிகள்",
      "மலையகக் காய்கறிகள்",
      "கிழங்குகள்",
      "கீரைகள்",
    ],
  },
};

// One picture per group, in the menu's order: local, up-country, tubers, greens.
const PICS = [
  { src: "/img/cat-vegetables.jpg", fit: "cover" },
  { src: "/img/banner-basket.jpg", fit: "cover" },
  { src: "/img/p-potato.jpg", fit: "contain" }, // a potato on white: shown whole on a warm ground
  { src: "/img/cat-greens.jpg", fit: "cover" },
] as const;

type Pt = { x: number; y: number };
const TILT = [-4, 5, -5, 4, -3, 3]; // each card leans a little, as if hung on the ribbon

// Where the ribbon goes, as parts of the section's width and height. Stops 1-6 hold the cards:
// farmer, the four groups, the shop link. The first and last points are off screen.
function route(phone: boolean): Pt[] {
  return phone
    ? [
        { x: -0.3, y: 0.15 },
        { x: 0.5, y: 0.2 },
        { x: 0.33, y: 0.36 },
        { x: 0.67, y: 0.5 },
        { x: 0.33, y: 0.64 },
        { x: 0.67, y: 0.78 },
        { x: 0.5, y: 0.92 },
        { x: 1.3, y: 0.97 },
      ]
    : [
        { x: -0.12, y: 0.27 },
        { x: 0.7, y: 0.17 },
        { x: 0.24, y: 0.36 },
        { x: 0.74, y: 0.5 },
        { x: 0.27, y: 0.65 },
        { x: 0.72, y: 0.79 },
        { x: 0.32, y: 0.93 },
        { x: 1.12, y: 0.98 },
      ];
}

// A smooth ribbon through the points: each bend leaves and arrives level, so a card sits flat on it.
function pathOf(p: Pt[]) {
  let d = `M${p[0].x},${p[0].y}`;
  for (let i = 1; i < p.length; i++) {
    const a = p[i - 1];
    const b = p[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    d += ` C${a.x + dx * 0.95},${a.y + dy * 0.08} ${b.x - dx * 0.95},${b.y - dy * 0.08} ${b.x},${b.y}`;
  }
  return d;
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function FarmBanner({
  t,
  lang,
}: {
  t: Dictionary;
  lang: Locale;
}) {
  const c = COPY[lang];
  const veg = t.nav[0];
  const root = useRef<HTMLElement>(null);
  const ribbon = useRef<SVGPathElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 0, vh: 0 });

  useLayoutEffect(() => {
    const f = () =>
      setDim({ w: root.current!.clientWidth, vh: window.innerHeight });
    f();
    const ro = new ResizeObserver(f);
    ro.observe(root.current!);
    return () => ro.disconnect();
  }, []);

  const phone = dim.w > 0 && dim.w < 768;
  const H = phone ? Math.max(3400, dim.vh * 4.4) : Math.max(2100, dim.vh * 3.1);
  const pts = route(phone).map((p) => ({ x: p.x * dim.w, y: p.y * H }));
  const d = dim.w ? pathOf(pts) : "";
  // The thin lime ribbon behind: the same route pushed a little left and right in turn, so it weaves
  // across the main ribbon instead of copying it.
  const d2 = dim.w
    ? pathOf(
        pts.map((p, i) => ({
          x: p.x + (i % 2 ? -1 : 1) * dim.w * (phone ? 0.1 : 0.07),
          y: p.y + H * 0.025,
        })),
      )
    : "";
  const band = phone ? 44 : 60; // the main ribbon's width
  const cardW = phone ? dim.w * 0.6 : Math.min(380, dim.w * 0.24);
  const farmW = phone ? dim.w * 0.84 : Math.min(470, dim.w * 0.31);
  const words =
    Array.from({ length: 12 }, () => c.ribbon)
      .flat()
      .join("   ✦   ") + "   ✦   ";

  // The section holds still (pinned) while the scroll draws the ribbon; the tall stage behind the screen
  // slides up so the ribbon's growing tip always stays in view, and each card pops as the tip reaches it.
  // Owner (22 Nov): the ribbon must start when you are inside the section and finish at its end, both
  // ways, slowly enough to follow - so the scroll length is long and the scrub soft.
  useEffect(() => {
    const path = ribbon.current;
    const st = stage.current;
    if (!dim.w || !path || !st) return;
    const L = path.getTotalLength();
    const sec = root.current!;
    const draws = sec.querySelectorAll<SVGPathElement>(".js-draw");
    const cards = Array.from(sec.querySelectorAll<HTMLElement>(".js-card"));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const offs: (() => void)[] = [];
    // Where each card sits along the ribbon, as a part of its length: the nearest of 600 samples.
    const samples = Array.from({ length: 601 }, (_, i) =>
      path.getPointAtLength((L * i) / 600),
    );
    const at = pts.slice(1, -1).map((p) => {
      let best = 0;
      samples.forEach((s, i) => {
        if (
          Math.hypot(s.x - p.x, s.y - p.y) <
          Math.hypot(samples[best].x - p.x, samples[best].y - p.y)
        )
          best = i;
      });
      return best / 600;
    });

    const ctx = gsap.context(() => {
      draws.forEach((p) => {
        const len = p.getTotalLength() + 2;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(cards, {
        scale: 0.3,
        opacity: 0,
        rotate: (i: number) => TILT[i] - 16,
        y: 60,
      });
      if (reduce) {
        // No pin and no drawing: the whole stage shows at once and the page scrolls through it.
        gsap.set(draws, { strokeDashoffset: 0 });
        gsap.set(cards, {
          scale: 1,
          opacity: 1,
          rotate: (i: number) => TILT[i],
          y: 0,
        });
        return;
      }

      // The camera: keep the ribbon's tip a little below the middle of the screen, never past the ends.
      const vh = sec.clientHeight;
      const lowest = -(H - vh);
      // The tip's height jumps about (flat on the sideways stretches, fast on the downward ones), so the
      // camera eases toward it instead of copying it: a steady glide, never a stop-start.
      const camY = gsap.quickTo(st, "y", { duration: 1.1, ease: "power3.out" });
      // The view holds still until the tip passes the line it follows: the ribbon starts lower on the page
      // than that line on a short window, and following at once pushed the heading under the section above
      // before anyone had scrolled (owner's screenshot, 22 Nov, 860px wide).
      const line = Math.max(vh * 0.58, path.getPointAtLength(0).y);
      const follow = (p: number) => {
        const tip = path.getPointAtLength(L * p);
        camY(gsap.utils.clamp(lowest, 0, line - tip.y));
      };
      const draw = { p: 0 };
      const HOLD = 0.06; // a short still moment first, to read the heading
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${H * 1.6}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
      tl.to({}, { duration: HOLD })
        .to(draws, { strokeDashoffset: 0, duration: 1 }, HOLD)
        .to(draw, { p: 1, duration: 1, onUpdate: () => follow(draw.p) }, HOLD)
        .to({}, { duration: 0.08 }); // the finished ribbon rests on screen before the page moves on
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            scale: 1,
            opacity: 1,
            rotate: TILT[i],
            y: 0,
            duration: 0.06,
            ease: "back.out(1.8)",
          },
          HOLD + Math.max(0, at[i] - 0.05),
        );
      });

      // The words drift along the ribbon on their own, for ever (one phrase set = one seamless loop).
      const text = sec.querySelector<SVGTextElement>(".js-text");
      if (text) {
        const cycle = text.getComputedTextLength() / 12;
        gsap.fromTo(
          ".js-words",
          { attr: { startOffset: 0 } },
          {
            attr: { startOffset: -cycle },
            duration: cycle / 40,
            ease: "none",
            repeat: -1,
          },
        );
      }

      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".js-tilt")!;
        gsap.to(inner, {
          y: -8,
          duration: 2.2 + i * 0.25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        // Hover: the face leans toward the pointer, straightens on the ribbon and lifts. It works on the
        // inner face, so it never fights the scroll timeline that owns the card itself.
        const rx = gsap.quickTo(inner, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const ry = gsap.quickTo(inner, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        const move = (e: PointerEvent) => {
          const r = inner.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        };
        const enter = () =>
          gsap.to(inner, {
            rotation: -TILT[i],
            scale: 1.05,
            duration: 0.5,
            ease: "power3.out",
          });
        const leave = () => {
          rx(0);
          ry(0);
          gsap.to(inner, {
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        offs.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        });
      });
    }, sec);
    return () => {
      offs.forEach((f) => f());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rebuilt when the size changes (pts follows dim)
  }, [dim.w, dim.vh, lang]);

  // The card itself pops and leans; its inner face floats and tilts in 3D.
  const card = "js-card group absolute block [perspective:900px]";
  const face =
    "js-tilt relative size-full overflow-hidden rounded-[22px] shadow-[0_30px_60px_-28px_rgba(2,42,9,0.55)] transition-shadow duration-500 will-change-transform group-hover:shadow-[0_45px_80px_-30px_rgba(2,42,9,0.7)]";
  // The round arrow opens into a "Shop" pill on hover.
  const pill = (light: boolean) => (
    <span
      className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-[10px] text-[13px] font-semibold ${light ? "bg-white text-[#1c2a1e]" : "bg-[#4f7047] text-white"}`}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 group-hover:mr-1.5 group-hover:max-w-[90px] group-hover:opacity-100">
        {c.shop}
      </span>
      <Arrow />
    </span>
  );

  return (
    <section
      ref={root}
      aria-labelledby="farm-banner"
      className="relative h-svh min-h-[600px] overflow-clip bg-[#f6f7f1] motion-reduce:h-auto"
      style={{ fontFamily: OS }}
    >
      {/* The tall stage: everything on it moves up together as the ribbon draws */}
      <div
        ref={stage}
        className="relative will-change-transform"
        style={{ height: dim.w ? H : "300vh" }}
      >
        {/* The words at the top, before the ribbon arrives */}
        <div className="js-head frame relative z-10 pt-[clamp(48px,9vh,110px)]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#4f7047]">
            {c.eyebrow}
          </p>
          <h2
            id="farm-banner"
            className="mt-3 max-w-[13ch] text-[clamp(32px,min(4.4vw,8vh),68px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1c2a1e] lang-ta:max-w-[16ch] lang-ta:text-[clamp(26px,min(3.2vw,6vh),48px)] lang-ta:leading-[1.25]"
          >
            {c.title}
          </h2>
          <p className="mt-4 max-w-[40ch] text-[clamp(15px,1.1vw,18px)] leading-[1.6] text-[#5b6460] lg:max-w-[34ch]">
            {c.lead}
          </p>
        </div>

        {/* The ribbons. Behind: a thin lime ribbon weaving across. In front: a stitched ribbon - lime edges,
          deep green face, a dashed stitch line inside each edge, the words in cream - with a soft shadow.
          The front one is revealed by a mask so it draws itself. */}
        {d && (
          <svg
            className="pointer-events-none absolute inset-0"
            width={dim.w}
            height={H}
            viewBox={`0 0 ${dim.w} ${H}`}
            aria-hidden="true"
          >
            <defs>
              <path id="ribbon-line" d={d} />
              <mask
                id="ribbon-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={dim.w}
                height={H}
              >
                <path
                  className="js-draw"
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeWidth={band + 50}
                />
              </mask>
            </defs>
            <path
              className="js-draw"
              d={d2}
              fill="none"
              stroke="#cbec4b"
              strokeWidth={Math.round(band * 0.34)}
              strokeLinecap="round"
            />
            <g mask="url(#ribbon-mask)">
              <path
                d={d}
                fill="none"
                stroke="#022a09"
                strokeOpacity="0.16"
                strokeWidth={band}
                transform="translate(0 14)"
              />
              <path
                ref={ribbon}
                d={d}
                fill="none"
                stroke="#cbec4b"
                strokeWidth={band}
              />
              <path d={d} fill="none" stroke="#034f10" strokeWidth={band - 8} />
              <path
                d={d}
                fill="none"
                stroke="#cbec4b"
                strokeOpacity="0.8"
                strokeWidth={band - 16}
                strokeDasharray="8 6"
              />
              <path
                d={d}
                fill="none"
                stroke="#034f10"
                strokeWidth={band - 19}
              />
              <text
                className="js-text"
                fill="#f3f7e4"
                fontSize={phone ? 13 : 15}
                fontWeight="700"
                letterSpacing="0.12em"
                dy={phone ? 4.5 : 5.5}
                style={{ textTransform: "uppercase" }}
              >
                <textPath
                  className="js-words"
                  href="#ribbon-line"
                  startOffset="0"
                >
                  {words}
                </textPath>
              </text>
            </g>
          </svg>
        )}

        {/* The cards, each on one bend of the ribbon */}
        {d && (
          <>
            <figure
              className={card}
              style={{
                left: pts[1].x - farmW / 2,
                top: pts[1].y - (farmW * 1.15) / 2,
                width: farmW,
                height: farmW * 1.15,
              }}
            >
              <div className={face}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/why-hands.jpg"
                  alt=""
                  className="absolute inset-0 size-full object-cover object-[50%_35%] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022a09]/85 via-[#022a09]/15 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#cbec4b] px-4 py-2 text-[13px] font-semibold text-[#022a09]">
                  {c.farmTag}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-[clamp(18px,2vw,30px)] text-white">
                  <p className="max-w-[16ch] text-[clamp(22px,2.2vw,34px)] font-bold leading-[1.12] lang-ta:text-[clamp(18px,1.6vw,26px)] lang-ta:leading-[1.3]">
                    {c.farmTitle}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-white/85">
                    {c.farmLine}
                  </p>
                </figcaption>
              </div>
            </figure>

            {veg.links.map((g, i) => {
              const p = pts[i + 2];
              const cover = PICS[i].fit === "cover";
              return (
                <a
                  key={g.href}
                  href={`/${lang}${g.href}`}
                  className={card}
                  style={{
                    left: p.x - cardW / 2,
                    top: p.y - (cardW * 0.82) / 2,
                    width: cardW,
                    height: cardW * 0.82,
                  }}
                >
                  <span
                    className={`${face} block ${cover ? "bg-[#e8efda]" : "bg-[#efe9df]"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PICS[i].src}
                      alt=""
                      className={`absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.08] ${cover ? "object-cover" : "object-contain p-[2%] pb-[18%] mix-blend-multiply"}`}
                    />
                    {cover && (
                      <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                    )}
                    <span
                      className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 ${cover ? "text-white" : "text-[#1c2a1e]"}`}
                    >
                      <span>
                        <span className="block text-[clamp(16px,1.3vw,20px)] font-semibold leading-tight">
                          {g.label}
                        </span>
                        <span
                          className={`mt-1 block text-[13px] ${cover ? "text-white/80" : "text-[#5b6460]"}`}
                        >
                          {c.notes[i]}
                        </span>
                      </span>
                      {pill(cover)}
                    </span>
                  </span>
                </a>
              );
            })}

            <a
              href={`/${lang}${veg.slug}`}
              className={card}
              style={{
                left: pts[6].x - cardW / 2,
                top: pts[6].y - (cardW * 0.6) / 2,
                width: cardW,
                height: cardW * 0.6,
              }}
            >
              <span
                className={`${face} flex flex-col justify-between bg-[#4f7047] p-6 text-white transition-colors duration-300 group-hover:bg-[#3d5a37]`}
              >
                <span className="text-[14px] leading-snug text-white/80">
                  {c.end}
                </span>
                <span className="flex items-center justify-between gap-3 text-[clamp(20px,1.6vw,26px)] font-bold">
                  {c.all}
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#cbec4b] text-[#022a09] transition-transform duration-500 group-hover:rotate-45">
                    <Arrow />
                  </span>
                </span>
              </span>
            </a>
          </>
        )}
      </div>
    </section>
  );
}
