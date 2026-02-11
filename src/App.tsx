import AboutMe from "./pages/AboutMe";
import Introduction from "./pages/Introduction";
import Projects from "./pages/Projects";
import Experience from "./pages/Career";
import MyContact from "./pages/MyContact";
import Education from "./pages/Education";

function App() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white w-full min-h-screen">
      <Introduction />
      <div className="relative z-10 bg-gradient-to-br from-black via-gray-900 to-black">
        <AboutMe />
        <Education />
        <div id="projects">
          <Projects />
        </div>
        <Experience />
        <div id="contact">
          <MyContact />
        </div>
      </div>
    </div>
  );
}

export default App;
