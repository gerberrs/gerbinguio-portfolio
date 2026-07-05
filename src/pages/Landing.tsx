import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import Introduction from "./Introduction";
import AboutMe from "./AboutMe";
import PromptCTA from "../components/PromptCTA";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem("intro-seen")
  );

  useEffect(() => {
    if (isLoading) return;

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
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div
        className="bg-sand-100 text-ink-900 w-full min-h-screen"
        style={{ overflowX: "clip", visibility: isLoading ? "hidden" : "visible" }}
      >
        <Navbar />
        <Introduction />
        <div className="fixed inset-0 bg-sand-100 -z-10" />
        <div className="relative z-10 bg-sand-50 rounded-t-[2.5rem] border-t border-sand-300 shadow-[0_-24px_60px_rgba(34,48,60,0.12)]">
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
