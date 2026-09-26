import { lazy, Suspense, useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Introduction from "./Introduction";
import AboutMe from "./AboutMe";
import PromptCTA from "../components/PromptCTA";
import ScrollBlob from "../components/ScrollBlob";

// GSAP is only used by the intro, so it loads with it (and is skipped once seen)
const LoadingScreen = lazy(() => import("../components/LoadingScreen"));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Landing = () => {
  // Skip the 4s animated intro for reduced-motion visitors
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem("intro-seen") && !prefersReducedMotion()
  );

  useEffect(() => {
    // Lenis smooth-scroll inertia is itself motion — native scroll for reduced-motion users
    if (isLoading || prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("intro-seen", "1");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={handleLoadingComplete} />
        </Suspense>
      )}
      <div
        className="text-ink-900 w-full min-h-screen relative"
        style={{ overflowX: "clip", visibility: isLoading ? "hidden" : "visible" }}
      >
        <ScrollBlob />
        <Navbar />
        <Introduction />
        <div className="relative z-10 bg-base-900/85 rounded-t-[2.5rem] border-t border-white/10 shadow-[0_-24px_60px_rgba(0,0,0,0.4)]">
          <div id="about">
            <AboutMe />
          </div>
          <PromptCTA />
        </div>
      </div>
    </>
  );
};

export default Landing;
