import type { CSSProperties } from "react";

// Cartoon vegetables (owner, 22 Nov: the photos behind the ribbon looked like still pictures with their
// backgrounds; "a cartoon type of touch, only without background, like the leaf"). Drawn here, not
// downloaded: one style for all (a dark-green outline, flat colour, one soft highlight), crisp at any size,
// a few hundred bytes each, and no licence question. Each is drawn in a 120 x 120 box.
const INK = "#1c2a1e";
const SW = 3.2; // outline width

export type VegKind =
  | "tomato"
  | "onion"
  | "chilli"
  | "potato"
  | "carrot"
  | "brinjal"
  | "cabbage"
  | "pumpkin"
  | "greens"
  | "garlic"
  | "beans"
  | "cucumber";

export const VEG_KINDS: VegKind[] = ["tomato", "onion", "chilli", "potato", "carrot", "brinjal", "cabbage", "pumpkin", "greens", "garlic", "beans", "cucumber"];

const s = { stroke: INK, strokeWidth: SW, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const shine = { fill: "#fff", opacity: 0.45 };

function Draw({ kind }: { kind: VegKind }) {
  switch (kind) {
    case "tomato":
      return (
        <>
          <path {...s} fill="#ef4a3a" d="M60 34c26 0 44 15 44 38s-19 36-44 36-44-13-44-36 18-38 44-38z" />
          <path fill="#c9322a" d="M20 78c6 16 22 26 40 26s34-10 40-26c-8 12-22 19-40 19s-32-7-40-19z" />
          <ellipse {...shine} cx="38" cy="56" rx="9" ry="6" transform="rotate(-30 38 56)" />
          <path {...s} fill="#5c9a3a" d="M60 40 47 33l10-2-6-10 11 6 4-10 3 11 11-5-6 10 11 3-14 5z" />
          <path {...s} fill="none" d="M62 24c0-7 3-11 8-13" />
        </>
      );
    case "onion":
      return (
        <>
          <path {...s} fill="#a3426b" d="M60 26c4 10 14 16 26 26 14 12 14 32 2 44-8 8-18 11-28 11s-20-3-28-11c-12-12-12-32 2-44 12-10 22-16 26-26z" />
          <path fill="none" stroke="#7d2d52" strokeWidth="2.4" strokeLinecap="round" d="M60 36c-10 14-22 26-20 46M60 36c10 14 22 26 20 46M60 38v56" />
          <ellipse {...shine} cx="44" cy="64" rx="6" ry="10" transform="rotate(20 44 64)" />
          <path {...s} fill="none" d="M60 26c-2-8 0-14 6-18M60 26c4-6 10-8 16-6" />
          <path {...s} fill="none" d="M52 106l-4 7M60 107v8M68 106l4 7" />
        </>
      );
    case "chilli":
      return (
        <>
          <path {...s} fill="#3f9a3a" d="M30 30c10-6 22-2 26 8 10 22 26 42 50 54 4 2 2 8-3 8-34-2-62-24-74-56-3-6-4-11 1-14z" />
          <path fill="#2e7b2b" d="M44 52c10 22 28 38 52 44-24 0-46-16-56-40z" />
          <path {...shine} d="M40 40c6 14 14 26 26 36-14-6-24-18-30-32z" />
          <path {...s} fill="#5c9a3a" d="M28 30c-2-6 2-12 8-12s10 6 8 12c-4 4-12 4-16 0z" />
          <path {...s} fill="none" d="M36 18c-2-6 0-10 4-13" />
        </>
      );
    case "potato":
      return (
        <>
          <path {...s} fill="#d8a35b" d="M20 66c-4-20 12-36 34-38 24-2 46 6 50 26 4 22-12 40-38 42-26 2-42-10-46-30z" />
          <path fill="#c18942" d="M24 76c6 12 20 20 40 18 22-2 34-14 38-28-4 18-18 30-40 31-18 1-32-7-38-21z" />
          <ellipse {...shine} cx="44" cy="48" rx="11" ry="6" transform="rotate(-12 44 48)" />
          <g fill={INK}>
            <circle cx="70" cy="50" r="2.4" />
            <circle cx="84" cy="68" r="2.2" />
            <circle cx="52" cy="76" r="2.4" />
            <circle cx="36" cy="62" r="2" />
          </g>
        </>
      );
    case "carrot":
      return (
        <>
          <path {...s} fill="#f28a2e" d="M42 38c10-6 24-4 30 6 4 8 2 16-6 26L34 108c-3 4-8 2-7-3l8-50c1-8 2-13 7-17z" />
          <path fill="none" stroke="#c86818" strokeWidth="2.4" strokeLinecap="round" d="M44 56l10 3M40 70l9 3M37 84l7 2" />
          <path {...shine} d="M44 44c-4 6-5 14-6 24 3-10 6-17 10-22z" />
          <path {...s} fill="#5c9a3a" d="M58 38c-2-12 2-22 10-28 2 10-2 20-6 28M64 40c6-10 16-14 28-12-6 8-16 12-26 14M54 38c-8-8-20-10-30-6 8 6 18 8 28 8" />
        </>
      );
    case "brinjal":
      return (
        <>
          <path {...s} fill="#6b3a8f" d="M52 34c16-4 30 8 34 26 6 26-2 48-22 52-20 4-36-12-38-34-2-20 8-40 26-44z" />
          <path fill="#55297a" d="M30 88c6 14 18 22 32 20 16-2 24-14 26-30-4 16-14 26-28 27-14 1-24-6-30-17z" />
          <ellipse {...shine} cx="46" cy="60" rx="6" ry="13" transform="rotate(14 46 60)" />
          <path {...s} fill="#5c9a3a" d="M44 38c4-8 12-12 22-10 8 2 12 8 14 14-8-4-14-2-18 2-6-6-12-8-18-6z" />
          <path {...s} fill="none" d="M62 28c2-8 6-14 12-16" />
        </>
      );
    case "cabbage":
      return (
        <>
          <path {...s} fill="#9fcf6a" d="M60 22c26 0 44 18 44 42s-18 44-44 44-44-20-44-44 18-42 44-42z" />
          <path {...s} fill="#c6e59a" d="M60 40c16 0 26 10 26 24s-10 26-26 26-26-12-26-26 10-24 26-24z" />
          <path fill="none" stroke="#6ea23e" strokeWidth="2.4" strokeLinecap="round" d="M60 40v50M60 56l-14-8M60 56l14-8M60 72l-16-8M60 72l16-8" />
          <path fill="none" stroke="#6ea23e" strokeWidth="2.4" strokeLinecap="round" d="M24 56c8-4 14-4 20 2M96 56c-8-4-14-4-20 2" />
          <ellipse {...shine} cx="40" cy="40" rx="8" ry="5" transform="rotate(-30 40 40)" />
        </>
      );
    case "pumpkin":
      return (
        <>
          <path {...s} fill="#f29a2e" d="M60 34c-20-6-44 4-46 32-2 26 18 40 46 40s48-14 46-40c-2-28-26-38-46-32z" />
          <path fill="none" stroke="#c86818" strokeWidth="2.6" strokeLinecap="round" d="M60 36c-10 18-10 52 0 70M60 36c10 18 10 52 0 70M38 40c-12 18-10 46 4 62M82 40c12 18 10 46-4 62" />
          <ellipse {...shine} cx="32" cy="58" rx="5" ry="10" transform="rotate(10 32 58)" />
          <path {...s} fill="#7a5a2e" d="M56 36c0-8 2-14 8-18 2 2 2 4 0 6-2 4-2 8-2 12z" />
          <path {...s} fill="#5c9a3a" d="M66 26c8-6 18-6 24 0-8 4-16 4-24 0z" />
        </>
      );
    case "greens":
      return (
        <>
          <path {...s} fill="#4f9a3a" d="M60 104c-26-8-40-30-34-58 2-10 8-18 14-20 12 18 18 44 20 78z" />
          <path {...s} fill="#6cb84a" d="M60 104c26-8 40-30 34-58-2-10-8-18-14-20-12 18-18 44-20 78z" />
          <path {...s} fill="#86c95c" d="M60 104c-12-20-14-48-2-80 4-8 6-8 8 0 10 32 6 60-6 80z" />
          <path fill="none" stroke="#2e6b2b" strokeWidth="2.2" strokeLinecap="round" d="M60 100V34M44 84c-6-12-8-26-6-40M76 84c6-12 8-26 6-40" />
          <path {...s} fill="#e9d7a8" d="M50 100h20l-2 12H52z" />
        </>
      );
    case "garlic":
      return (
        <>
          <path {...s} fill="#f4ede0" d="M60 30c4 10 16 18 28 30 12 14 8 36-8 44-12 6-28 6-40 0-16-8-20-30-8-44 12-12 24-20 28-30z" />
          <path fill="none" stroke="#c9bba0" strokeWidth="2.4" strokeLinecap="round" d="M60 40v62M48 46c-10 14-12 34-4 54M72 46c10 14 12 34 4 54" />
          <ellipse {...shine} cx="42" cy="68" rx="6" ry="10" />
          <path {...s} fill="none" d="M60 30c0-8 2-14 6-18" />
          <path {...s} fill="none" d="M50 104l-2 6M60 106v6M70 104l2 6" />
        </>
      );
    case "beans":
      return (
        <>
          <path {...s} fill="#5fae45" d="M22 30c6-4 12-2 14 4 6 22 22 42 56 56 6 3 6 10-1 11-34 2-62-26-72-58-1-6-1-10 3-13z" />
          <g fill="#4a9636">
            <circle cx="36" cy="46" r="5" />
            <circle cx="46" cy="62" r="5.5" />
            <circle cx="60" cy="76" r="5.5" />
            <circle cx="76" cy="88" r="5" />
          </g>
          <path {...shine} d="M30 36c4 14 10 26 20 36-12-8-18-20-22-34z" />
          <path {...s} fill="none" d="M22 30c-4-6-2-12 4-14" />
        </>
      );
    case "cucumber":
      return (
        <>
          <path {...s} fill="#3e8f3a" d="M26 40c6-8 16-8 22-2 16 16 34 32 50 44 8 6 6 18-4 20-10 2-20-2-30-8-20-12-34-26-40-40-2-6-2-10 2-14z" />
          <path fill="#2f7430" d="M40 70c14 14 28 24 44 30 8 2 14 0 16-6-2 10-10 12-18 10-16-4-30-16-42-34z" />
          <path {...shine} d="M34 44c10 12 22 24 36 32-16-6-28-16-38-28z" />
          <g fill="#bfe08a">
            <circle cx="46" cy="56" r="1.8" />
            <circle cx="62" cy="66" r="1.8" />
            <circle cx="78" cy="80" r="1.8" />
            <circle cx="54" cy="72" r="1.8" />
          </g>
        </>
      );
  }
}

// One vegetable as an inline drawing; decorative unless a label is given.
export default function Veg({ kind, className, label, style }: { kind: VegKind; className?: string; label?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <ellipse cx="60" cy="112" rx="34" ry="5" fill={INK} opacity="0.1" />
      <Draw kind={kind} />
    </svg>
  );
}
