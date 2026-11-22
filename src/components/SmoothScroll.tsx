"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling for the whole site (owner, 22 Nov: "smooth is missing"). A mouse wheel moves the page
// in ~100px jumps, and every scroll-driven section (the product wheel, the chat, the ribbon) jumped with
// it. Lenis eases the page toward where the wheel points instead, and drives ScrollTrigger from GSAP's own
// clock so the pinned sections move on the same frame as the page. Touch screens keep their own native
// scrolling (Lenis leaves touch alone by default); reduced motion keeps the plain browser scroll.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
