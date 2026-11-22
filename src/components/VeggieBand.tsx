import type { ReactNode } from "react";

// The thin strip under the hero (owner, 21 Nov): the shop's vegetable categories only, one small line,
// sliding left for ever with no seam (the list six times, moved by exactly a third: see .marquee).
// Each category has a plain outline icon in the hero's green, never a filled picture or an emoji.
// The names come from the dictionary (nav > Vegetables > links), so they follow the shop's categories in
// English and Tamil; the icons follow the same order: carrot, mountain (up-country), potato, sprout.
const G = "#4f7047";
const ICONS: ReactNode[] = [
  <g key="carrot">
    <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7z" />
    <path d="M8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
    <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" />
    <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" />
  </g>,
  <path key="mountain" d="m8 3 4 8 5-5 5 15H2L8 3z" />,
  <g key="potato">
    <path d="M5 13c-1-4 2-8 7-8 5 0 8 3 7 7-1 4-4 7-8 7-3 0-5.500-2-6-6z" />
    <path d="M9 10h.01M13 13h.01M10 15h.01M14 9h.01" />
  </g>,
  <g key="sprout">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </g>,
];

export default function VeggieBand({ labels }: { labels: string[] }) {
  return (
    <div className="overflow-hidden border-y border-[#e8e8e5] bg-white py-4" role="img" aria-label={labels.join(", ")}>
      <ul className="marquee flex items-center [--marquee-time:40s]" aria-hidden="true">
        {Array.from({ length: 6 }, () => labels).flat().map((name, i) => (
          <li key={i} className="mr-14 flex shrink-0 items-center gap-3 md:mr-20">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[i % labels.length]}
            </svg>
            <span
              className="whitespace-nowrap text-[14px] font-medium uppercase leading-none tracking-[0.1em] text-[#222]"
              style={{ fontFamily: '"DM Sans Variable", "DM Sans", "Noto Sans Tamil", sans-serif' }}
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
