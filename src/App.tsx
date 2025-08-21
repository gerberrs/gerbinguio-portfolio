import AboutMe from "./pages/AboutMe";
import Introduction from "./pages/Introduction";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Career";
import MyContact from "./pages/MyContact";

function App() {
  return (
    <div className="bg-zinc-950 text-white w-full min-h-screen">
      <Introduction />
      <AboutMe />
      <Skills />
      <div id="projects">
        <Projects />
      </div>
      <Experience />
      <div id="contact">
        <MyContact />
      </div>
    </div>
  );
}

export default App;
