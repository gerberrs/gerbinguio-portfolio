import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, app-wide. Import gsap/ScrollTrigger/useGSAP from here so
// every component shares the same registered instances.
gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ ease: "power2.out", duration: 0.7 });

/** Media conditions shared by every animation hook (used with gsap.matchMedia). */
export const motionQueries = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
