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
 *   data-words           heading words (from <SplitWords>) slide up out of their masks
 *   data-rule            hairline draws in from the left as it enters
 *   data-stagger         its direct children fade/rise in one after another
 *   data-zoom="0.86"     scrubbed zoom from that scale to full size as the block scrolls in
 *   data-drift="28"      scrubbed vertical drift (in % of its own height, from +n to −n)
 *                        so layered frames move at their own speed (desktop only)
 *   data-horizontal      pins the block and turns vertical scroll into sideways
 *                        movement of its [data-horizontal-track] (desktop only;
 *                        elsewhere the viewport is a native swipe row). Optional
 *                        [data-horizontal-depth] images shift inside their frames,
 *                        [data-horizontal-progress] shows a progress line. With
 *                        [data-horizontal-camera] + a [data-horizontal-next] miniature and
 *                        data-horizontal-handoff="<id of the next row>", the strip then
 *                        zooms in on the miniature until it lands exactly on that row.
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

        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((heading) => {
          const words = heading.querySelectorAll("[data-word]");
          gsap.set(words, { yPercent: 110 });
          ScrollTrigger.create({
            trigger: heading,
            start: "top 90%",
            once: true,
            onEnter: () =>
              gsap.to(words, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.05 }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: rule, start: "top 92%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = Array.from(group.children);
          gsap.set(items, { autoAlpha: 0, y: 14 });
          ScrollTrigger.create({
            trigger: group,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, overwrite: true }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: parseFloat(el.dataset.zoom || "") || 0.86, transformOrigin: "50% 0%" },
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
            const camera = section.querySelector<HTMLElement>("[data-horizontal-camera]");
            const mini = section.querySelector<HTMLElement>("[data-horizontal-next]");
            const handoffId = section.dataset.horizontalHandoff;
            const nextRow = handoffId ? document.getElementById(handoffId) : null;
            const zoomable = Boolean(camera && mini && nextRow);

            // A full-height, opaque stage, so the zoom owns the screen while pinned.
            gsap.set(section, {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              zIndex: 1,
            });
            // Theme token, set directly (GSAP can't parse var()), so it follows theme changes.
            section.style.backgroundColor = "hsl(var(--background))";
            cleanups.push(() => {
              section.style.backgroundColor = "";
            });
            gsap.set(viewport, { overflow: "hidden" });
            if (progress) gsap.set(progress, { display: "block" });

            // Where the real next row will sit (from the top of the screen) at hand-off.
            const landing = () =>
              (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80) + 40;
            if (zoomable && nextRow) {
              // Pull the next row up under the stage so that, the moment the pin ends, it
              // is exactly where the zoomed miniature is. The stage hides it until then.
              const original = nextRow.style.marginTop;
              nextRow.style.marginTop = `calc(${landing()}px - 100vh)`;
              cleanups.push(() => {
                nextRow.style.marginTop = original;
              });
            }

            // Timeline units are px of scroll: sideways travel (a bit less scroll than
            // distance, so it doesn't drag), then the zoom into the next project.
            const slideLen = distance() * 0.7;
            const zoomLen = zoomable ? window.innerHeight * 1.2 : 0;

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

            if (zoomable && camera && mini && nextRow) {
              /** Layout offset of `el` inside `ancestor`, ignoring transforms. */
              const offsetIn = (el: HTMLElement, ancestor: HTMLElement) => {
                let x = 0;
                let y = 0;
                let node: HTMLElement | null = el;
                while (node && node !== ancestor) {
                  x += node.offsetLeft;
                  y += node.offsetTop;
                  node = node.offsetParent as HTMLElement | null;
                }
                return { x, y };
              };
              // Camera move that lands the miniature (once the row has slid fully) on the
              // real row: scale by row/miniature width, then translate so its corner lines up.
              const zoomTo = () => {
                const scale = nextRow.offsetWidth / mini.offsetWidth;
                const card = offsetIn(mini, camera);
                const cameraLeft = section.getBoundingClientRect().left + camera.offsetLeft;
                const cameraTop = camera.offsetTop; // the stage is pinned at the top of the screen
                const rowLeft = nextRow.getBoundingClientRect().left;
                return {
                  scale,
                  x: rowLeft - cameraLeft - scale * (card.x - distance()),
                  y: landing() - cameraTop - scale * card.y,
                };
              };
              tl.fromTo(
                camera,
                { x: 0, y: 0, scale: 1, transformOrigin: "0 0" },
                {
                  x: () => zoomTo().x,
                  y: () => zoomTo().y,
                  scale: () => zoomTo().scale,
                  ease: "power2.inOut",
                  duration: zoomLen,
                },
                slideLen,
              )
                .to(mini, { borderRadius: 0, duration: zoomLen }, slideLen)
                // Everything but the miniature (other cards, labels, its outline) fades as
                // the camera flies in, so only the next project is left on screen.
                .to(
                  [...Array.from(camera.querySelectorAll("[data-horizontal-fade]")), progress].filter(
                    Boolean,
                  ),
                  { autoAlpha: 0, duration: zoomLen * 0.5 },
                  slideLen,
                )
                .to(mini, { boxShadow: "0 0 0 0px rgba(0,0,0,0)", duration: zoomLen * 0.5 }, slideLen)
                // Hand-off: the stage disappears and the real row is right there underneath.
                .set(section, { autoAlpha: 0 }, slideLen + zoomLen);
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
