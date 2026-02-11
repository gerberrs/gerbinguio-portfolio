import { useEffect } from "react";
import AboutMe from "./pages/AboutMe";
import Introduction from "./pages/Introduction";
import MyContact from "./pages/MyContact";
import Education from "./pages/Education";
import Navbar from "./components/Navbar";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import Experience from "./pages/Career";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white w-full min-h-screen" style={{ overflowX: 'clip' }}>
      <Navbar />
      <Introduction />
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black">
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
  );
}

export default App;
