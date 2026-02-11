import AboutMe from "./pages/AboutMe";
import Introduction from "./pages/Introduction";
import MyContact from "./pages/MyContact";
import Education from "./pages/Education";
import Navbar from "./components/Navbar";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import { ReactLenis } from "lenis/react";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white w-full min-h-screen" style={{ overflowX: 'clip' }}>
        <Navbar />
        <Introduction />
        <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black">
          <div id="about">
            <AboutMe />
          </div>
          <Education />
          <HorizontalScrollSection />
          <div id="contact">
            <MyContact />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
