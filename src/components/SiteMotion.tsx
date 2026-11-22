"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The scroll motion of the home page, kept small (owner, 21 Nov: "simple and easy"):
//   data-reveal / data-stagger  rise and fade in once when they come into view (an IntersectionObserver
//                               adds .in; the hidden start state is the CSS under .motion, so a part
//                               can never stay invisible if this script does not run)
//   data-scrub                  its [data-word] spans light up with the scroll (the About paragraph)
//   data-pimg                   a photo drifting slowly inside its frame
//   data-wordmark               the big footer name rises
// With reduced motion, or before the opening scene is over (`active` false), every part just shows.
export default function SiteMotion({ active, children }: { active: boolean; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!active || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("motion");
    el.querySelectorAll<HTMLElement>("[data-stagger]").forEach((g) => [...g.children].forEach((ch, i) => (ch as HTMLElement).style.setProperty("--i", String(i))));

    const seen = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          seen.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    el.querySelectorAll("[data-reveal], [data-stagger]").forEach((t) => seen.observe(t));

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-scrub]").forEach((p) =>
        gsap.fromTo(
          p.querySelectorAll("[data-word]"),
          { opacity: 0.22 },
          { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 50%", scrub: true } },
        ),
      );
      el.querySelectorAll<HTMLElement>("[data-pimg]").forEach((img) =>
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }),
      );
      el.querySelectorAll<HTMLElement>("[data-wordmark]").forEach((w) =>
        gsap.from(w, { yPercent: 40, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 100%", once: true } }),
      );
    }, el);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      seen.disconnect();
      ctx.revert();
      el.classList.remove("motion");
    };
  }, [active]);

  return <div ref={root}>{children}</div>;
}
