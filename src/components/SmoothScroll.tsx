import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

type ScrollTarget = string | HTMLElement | number;

type SmoothScrollValue = {
  /**
   * Smoothly scrolls to a selector ("#work"), element, or y offset. Both paths
   * honour `scroll-padding-top` (set to the nav height in index.css), so
   * sections land just below the fixed nav.
   */
  scrollTo: (target: ScrollTarget, options?: { immediate?: boolean }) => void;
  /** Pause/resume page scrolling (e.g. while a dialog is open). */
  setPaused: (paused: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollValue | null>(null);

/**
 * Lenis smooth scrolling, carried over from the previous landing page
 * (same lerp: 0.1 feel), now driven by GSAP's ticker so ScrollTrigger and
 * Lenis share one animation frame and never drift. Skipped for
 * prefers-reduced-motion visitors and on touch devices, where native
 * momentum scrolling is already smooth and cheaper than a JS loop.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (!prefersReducedMotion() && !touch) {
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      setReady(true);
      return () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
    setReady(true);
  }, []);

  const scrollTo = useCallback<SmoothScrollValue["scrollTo"]>((target, options) => {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2, immediate: options?.immediate });
      return;
    }
    const behavior = options?.immediate || prefersReducedMotion() ? "auto" : "smooth";
    if (typeof el === "number") window.scrollTo({ top: el, behavior });
    else el.scrollIntoView({ behavior, block: "start" });
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, []);

  // Honour an incoming #hash (incl. redirects from the old /work/* routes)
  // once the page has rendered.
  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const hash = window.location.hash;
    const id = requestAnimationFrame(() => scrollTo(hash, { immediate: true }));
    return () => cancelAnimationFrame(id);
  }, [ready, scrollTo]);

  const value = useMemo(() => ({ scrollTo, setPaused }), [scrollTo, setPaused]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>");
  return ctx;
}
