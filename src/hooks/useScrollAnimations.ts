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
 *   data-zoom            scrubbed zoom from 86% to full size as the block scrolls in
 *   data-drift="28"      scrubbed vertical drift (in % of its own height, from +n to −n)
 *                        so layered frames move at their own speed (desktop only)
 *   data-horizontal      pins the block and turns vertical scroll into sideways
 *                        movement of its [data-horizontal-track] (desktop only;
 *                        elsewhere the viewport is a native swipe row). Optional
 *                        [data-horizontal-depth] images shift inside their frames,
 *                        [data-horizontal-progress] shows a progress line, and
 *                        [data-horizontal-zoom] grows from the [data-horizontal-next]
 *                        card to full screen at the end (a hand-off to the next project).
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
        const cleanups: (() => void)[] = [];

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
          // Clear only `y`, so a scrubbed `data-drift` (yPercent) on the same frame survives.
          tl.fromTo(frame, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, clearProps: "y" });
          if (img && !img.hasAttribute("data-parallax")) {
            tl.fromTo(img, { scale: 1.06 }, { scale: 1, clearProps: "scale" }, 0);
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.86, transformOrigin: "50% 0%" },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
            },
          );
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

          gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
            const amount = parseFloat(el.dataset.drift || "20");
            gsap.fromTo(
              el,
              { yPercent: amount },
              {
                yPercent: -amount,
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

          gsap.utils.toArray<HTMLElement>("[data-horizontal]").forEach((section) => {
            const viewport = section.querySelector<HTMLElement>("[data-horizontal-viewport]");
            const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
            if (!viewport || !track) return;

            const distance = () => {
              const cs = getComputedStyle(viewport);
              const inner =
                viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
              return Math.max(0, track.scrollWidth - inner);
            };
            if (distance() <= 0) return;

            const progress = section.querySelector<HTMLElement>("[data-horizontal-progress]");
            const zoom = section.querySelector<HTMLElement>("[data-horizontal-zoom]");
            const nextFrame = section.querySelector<HTMLElement>("[data-horizontal-next] button > div");
            const content = Array.from(section.children).filter((el) => el !== zoom);

            // A full-height stage, so the zoom has the whole screen to grow into.
            gsap.set(section, {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            });
            gsap.set(viewport, { overflow: "hidden" });
            if (progress) gsap.set(progress, { display: "block" });

            // Timeline units are px of scroll: sideways travel (a bit less scroll than
            // distance, so it doesn't drag), then the zoom into the next project.
            const slideLen = distance() * 0.7;
            const zoomLen = zoom && nextFrame ? window.innerHeight * 1.1 : 0;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${slideLen + zoomLen}`,
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });
            tl.to(track, { x: () => -distance(), duration: slideLen }, 0);
            if (progress?.firstElementChild) {
              tl.fromTo(progress.firstElementChild, { scaleX: 0 }, { scaleX: 1, duration: slideLen }, 0);
            }
            // Each screenshot drifts inside its frame while the row travels.
            track.querySelectorAll<HTMLElement>("[data-horizontal-depth]").forEach((img) => {
              tl.fromTo(
                img,
                { xPercent: -5, scale: 1.12 },
                { xPercent: 5, scale: 1.12, duration: slideLen },
                0,
              );
            });

            if (zoom && nextFrame) {
              // Where the next-project card sits once the row has finished sliding.
              const cardBox = () => {
                const s = section.getBoundingClientRect();
                const c = nextFrame.getBoundingClientRect();
                const x = Number(gsap.getProperty(track, "x"));
                return {
                  left: c.left - s.left - x - distance(),
                  top: c.top - s.top,
                  width: c.width,
                  height: c.height,
                };
              };
              tl.set(zoom, { display: "block" }, slideLen)
                .set(nextFrame, { autoAlpha: 0 }, slideLen)
                .fromTo(
                  zoom,
                  {
                    left: () => cardBox().left,
                    top: () => cardBox().top,
                    width: () => cardBox().width,
                    height: () => cardBox().height,
                    borderRadius: 8,
                    autoAlpha: 1,
                  },
                  {
                    // Edge to edge: the stage sits inside the page container.
                    left: () => -section.getBoundingClientRect().left,
                    top: 0,
                    width: () => window.innerWidth,
                    height: "100%",
                    borderRadius: 0,
                    ease: "power2.inOut",
                    duration: zoomLen * 0.75,
                  },
                  slideLen,
                )
                .to(content, { autoAlpha: 0, duration: zoomLen * 0.4 }, slideLen)
                // Pass "through" the screen into the next project.
                .to(zoom, { autoAlpha: 0, scale: 1.06, duration: zoomLen * 0.25 }, slideLen + zoomLen * 0.75);
            }

            // Tabbing to an off-screen card scrolls the page to where it's in view.
            const onFocus = (e: FocusEvent) => {
              const card = (e.target as HTMLElement).closest("li");
              const st = tl.scrollTrigger;
              if (!card || !st) return;
              const p = Math.min(1, card.offsetLeft / distance());
              const share = slideLen / (slideLen + zoomLen);
              st.scroll(st.start + p * share * (st.end - st.start));
            };
            section.addEventListener("focusin", onFocus);
            cleanups.push(() => section.removeEventListener("focusin", onFocus));
          });
        }

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope },
  );
}
