import { useEffect, useState } from "react";
import AboutMe from "./pages/AboutMe";
import Introduction from "./pages/Introduction";
import MyContact from "./pages/MyContact";
import Education from "./pages/Education";
import Navbar from "./components/Navbar";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import Experience from "./pages/Career";
import LoadingScreen from "./components/LoadingScreen";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return; // Don't init scroll until loading is done

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF through GSAP's ticker for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <div
        className="bg-gradient-to-br from-black via-gray-900 to-black text-white w-full min-h-screen"
        style={{ overflowX: 'clip', visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <Navbar />
        <Introduction />
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black -z-10" />
        <div className="relative z-10">
          <div id="about">
            <AboutMe />
          </div>
          <Education />
          <HorizontalScrollSection />
          <div id="career">
            <Experience />
          </div>
          <div id="contact">
            <MyContact />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
