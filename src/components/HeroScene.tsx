"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import HeroBasket from "./HeroBasket";
import PixelHero from "./PixelHero";
import VeggieBand from "./VeggieBand";
import SpecialWheel from "./SpecialWheel";
import WhyChat from "./WhyChat";
import FarmBanner from "./FarmBanner";
import SiteFooter from "./SiteFooter";

gsap.registerPlugin(useGSAP);

// The preloader only (owner, 21 Nov: "remove all the sections, keep the preloader"). It plays by itself
// once the page loads: the name and the basket on the grass, then the basket zooms in and holds.
// With reduced motion nothing plays; the scene stays as it is.
// The site sections (Sections.tsx, Shop.tsx, Faq.tsx, ...) are no longer rendered; their files are kept
// on disk, unused, so the work is not lost.
export default function HeroScene({ t, lang }: { t: Dictionary; lang: Locale }) {
  const alt = t.hero.basketAlt;
  const stage = useRef<HTMLElement>(null);
  // The shop's vegetable categories, for the strip under the hero.
  const labels = t.nav[0].links.map((l) => l.label);
  // After the zoom the hero (the owner's Figma frame) rises over it, then becomes the page itself.
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      // "?nointro" in the address skips the opening scene (for checking the page quickly).
      if (new URLSearchParams(window.location.search).has("nointro")) {
        setDone(true);
        return;
      }
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ delay: 0.6 })
          .addLabel("zoom")
          // The zoom in on the basket; the grass and the name grow less, so the basket comes forward.
          .to(".js-zoom", { scale: 1.75, duration: 1, ease: "power2.inOut", transformOrigin: "50% 76%" }, "zoom")
          .to(".js-bg", { scale: 1.18, duration: 1, ease: "power2.inOut", transformOrigin: "50% 90%" }, "zoom")
          .to(".js-name", { scale: 1.12, duration: 1, ease: "power2.inOut", transformOrigin: "50% 100%" }, "zoom")
          // The hero rises from the bottom and covers the scene.
          .fromTo(".js-cover", { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, duration: 0.8, ease: "power3.inOut" }, "+=0.5")
          .call(() => setDone(true));
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setDone(true);
      });
    },
    { scope: stage },
  );

  if (done) return (
    <>
      <PixelHero />
      <VeggieBand labels={labels} />
      <SpecialWheel t={t} lang={lang} />
      <WhyChat lang={lang} />
      <FarmBanner t={t} lang={lang} />
      <SiteFooter t={t} lang={lang} />
    </>
  );

  return (
    <section ref={stage} className="relative isolate h-svh overflow-hidden">
      {/* The owner's background: dewy grass on gentle hummocks under a white sky. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/bg-grass.jpg"
        alt=""
        aria-hidden="true"
        width={1672}
        height={941}
        fetchPriority="high"
        data-source="client"
        className="js-bg absolute inset-0 -z-10 size-full object-cover object-bottom"
      />

      {/* The name, set large in the sky behind the basket. Anchored to the basket, not the screen: the
          basket covers about a third of the letters at every width. */}
      <div
        className="js-name pointer-events-none absolute inset-x-0 flex justify-center px-4"
        style={{
          bottom:
            "calc(max(56.28vw, 100svh) * 0.11 + min(min(760px, 88vw) * 0.602, 54.56svh) - clamp(40px, 12.5vw, 200px) * 0.8 * 0.35)",
        }}
      >
        <h1 className="enter whitespace-nowrap text-center text-[clamp(40px,12.5vw,200px)] font-medium leading-[0.8] tracking-[-0.06em] text-forest">
          Pasumai <span className="text-leaf">Fresh</span>
        </h1>
      </div>

      <div className="js-zoom absolute inset-0">
        <HeroBasket alt={alt} />
      </div>

      <div className="js-cover absolute inset-0 z-10 translate-y-full overflow-hidden bg-white">
        <PixelHero />
        <VeggieBand labels={labels} />
      </div>
    </section>
  );
}
