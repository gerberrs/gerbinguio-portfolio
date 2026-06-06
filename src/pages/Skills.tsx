import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "CRM & Automation",
    items: ["GoHighLevel", "Zapier", "n8n", "Workflow Automation", "Pipeline Management", "Email Sequences"],
  },
  {
    title: "AI Tools",
    items: ["Claude AI", "ChatGPT", "Gemini AI"],
  },
  {
    title: "Forms & Data",
    items: ["Jotform", "Google Sheets", "Google Docs", "GHL Forms"],
  },
  {
    title: "Development",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Tailwind"],
  },
  {
    title: "Tools & Technology",
    items: ["GitHub", "Jira", "Canva", "VSCode", "Microsoft Suite"],
  },
  {
    title: "Professional Skills",
    items: ["Communication", "Teamwork", "Problem-Solving", "Adaptability", "Leadership", "Attention to Detail"],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center h-screen pl-[5vw]"
        style={{ width: "fit-content" }}
      >
        {/* Title card */}
        <div className="flex-shrink-0 w-[90vw] sm:w-[50vw] lg:w-[40vw] flex items-center justify-center mr-8 sm:mr-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold shimmer-text">
            SKILLS
          </h1>
        </div>

        {/* Skill cards */}
        {skillCategories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[75vw] sm:w-[40vw] lg:w-[30vw] mr-8 sm:mr-12"
          >
            <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-6 sm:p-8 h-[280px] sm:h-[320px] flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-b border-zinc-600 pb-3">
                {cat.title}
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="border border-white/40 rounded-full px-3 py-1.5 text-sm sm:text-base text-gray-200 hover:bg-white/10 hover:border-white/70 transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Right padding spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </div>
  );
};

export default Skills;