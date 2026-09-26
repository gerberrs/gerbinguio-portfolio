import type { RefObject } from "react";
import { gsap, motionQueries, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Declarative scroll motion for everything inside `scope`. Components opt in
 * with data attributes instead of each owning GSAP code:
 *
 *   data-reveal          fade + 16px rise as it enters (batched + staggered)
 *   data-reveal-image    media frame fades/rises in, inner <img> settles from 1.06
 *                        (transform + opacity only, so it stays on the compositor)
 *   data-parallax="0.06" gentle scrubbed drift on an <img> inside an overflow-hidden frame
 *                        (desktop + fine pointer only)
 *
 * Everything lives in one gsap.matchMedia, so reduced-motion visitors get
 * static, fully visible content, and it's all reverted on unmount by useGSAP.
 */
export function useScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(motionQueries, (context) => {
        const { motion, desktop } = context.conditions as Record<
          keyof typeof motionQueries,
          boolean
        >;
        if (!motion) return;

        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { autoAlpha: 0, y: 16 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((frame) => {
          const img = frame.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
            defaults: { duration: 1.1, ease: "power3.out" },
          });
          tl.fromTo(
            frame,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, clearProps: "transform" },
          );
          if (img && !img.hasAttribute("data-parallax")) {
            tl.fromTo(img, { scale: 1.06 }, { scale: 1, clearProps: "scale" }, 0);
          }
        });

        if (desktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = parseFloat(el.dataset.parallax || "0.06") * 100;
            gsap.fromTo(
              el,
              { yPercent: -amount, scale: 1.12 },
              {
                yPercent: amount,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        }
      });

      return () => mm.revert();
    },
    { scope },
  );
}
