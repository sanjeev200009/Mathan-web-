import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import HeroScene from "./HeroScene";

// The hero: grass background, the big name, the basket, the automatic zoom, and a white page that
// rises over it carrying the categories (owner, 12 Nov).
// Tried and removed earlier: a second copy of the grass in front of the basket and a dark multiplied
// shadow (they made the grass look ugly); the basket's drop-in; a blurred green ground on the white page.
// The background (bg-grass.jpg) and the basket (hero-vegetables.webp) are the owner's own images.
// The five category photos (cat-*.jpg) and the hero slides are from Unsplash (free to use, no credit
// needed), chosen dark and green so they match; the owner may replace them with their own.
export default function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return <HeroScene t={t} lang={lang} />;
}
