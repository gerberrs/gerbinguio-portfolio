import { useCallback, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { useProjectParam } from "@/hooks/useProjectParam";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Work } from "@/components/portfolio/Work";
import { Capabilities } from "@/components/portfolio/Capabilities";
import { Experience } from "@/components/portfolio/Experience";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { ProjectDialog } from "@/components/portfolio/ProjectDialog";

/**
 * The whole portfolio is one page: Hero → Work → Capabilities → Experience →
 * About → Contact. Project case studies open in a dialog addressed by
 * `?project=<slug>` rather than separate routes.
 */
function App() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollAnimations(mainRef);

  const [slug, setSlug] = useProjectParam();
  const [initialSlide, setInitialSlide] = useState<number | null>(null);
  const activeProject = projects.find((p) => p.slug === slug) ?? null;

  const openProject = useCallback(
    (next: string, slide?: number) => {
      setInitialSlide(slide ?? null);
      setSlug(next);
    },
    [setSlug],
  );

  return (
    <>
      <a
        href="#work"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to projects
      </a>
      <Navbar />
      <main ref={mainRef} className="overflow-x-clip">
        <Hero />
        <Work onOpen={openProject} />
        <Capabilities />
        <Experience />
        <About />
        <Contact />
      </main>
      <ProjectDialog
        project={activeProject}
        initialSlide={initialSlide}
        onClose={() => setSlug(null)}
      />
    </>
  );
}

export default App;
