// The hero's one object, the owner's vegetable baskets, standing still on the grass from the first paint.
// (The drop-and-settle entrance was removed on the owner's word, 10 Nov; the scroll zoom stays, in HeroScene.)
// Placed against the grass line, not the screen: the background is drawn object-cover from the bottom,
// so its drawn height is D = max(56.28vw, 100svh) (941/1672), and at the centre its grass starts ~20% of D
// up (measured 19.0-20.9%). The lowest vegetables sit at 11% of D; the image's empty bottom 9% is pulled
// down out of the way with translate-y.
export default function HeroBasket({ alt }: { alt: string }) {
  return (
    <div className="absolute inset-x-0 flex justify-center px-4" style={{ bottom: "calc(max(56.28vw, 100svh) * 0.11)" }}>
      <div className="relative w-[min(760px,88vw)]">
        <div aria-hidden="true" className="absolute inset-x-[18%] -bottom-[1%] h-[5%] rounded-[50%] bg-[rgb(20_40_10/0.35)] blur-md" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-vegetables.webp"
          alt={alt}
          width={1516}
          height={1037}
          fetchPriority="high"
          data-source="client"
          className="relative h-auto w-full max-h-[62svh] translate-y-[9%] object-contain object-bottom"
        />
      </div>
    </div>
  );
}
