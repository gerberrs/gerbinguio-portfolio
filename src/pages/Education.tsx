import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
{
  title: "CRM & Automation",
  items: "GoHighLevel, ActiveCampaign, Zapier, n8n, Workflow Automation, Pipeline Management, Email Sequences, Funnel Building, Website Building",
},
  {
    title: "AI Tools",
    items: "Claude AI, ChatGPT, Gemini AI",
  },
  {
    title: "Forms & Data",
    items: "Jotform, Google Sheets, Google Docs, GHL Forms",
  },
  {
    title: "Development",
    items: "HTML, CSS, JavaScript, TypeScript, React.js, Tailwind",
  },
 {
  title: "Tools & Technology",
  items: "GitHub, Jira, Canva, VSCode, ClickFunnels, Word, PowerPoint, Excel, Antigravity",
},
  {
    title: "Professional Skills",
    items: "Communication, Teamwork, Problem-Solving, Adaptability, Leadership, Attention to Detail",
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-auto w-full flex flex-col text-white px-6 pt-32 sm:pt-40 pb-24">
      {/* Title */}
      <div className="flex flex-col items-center mb-10 sm:mb-14">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shimmer-text">
          TOOLS I'VE USED
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto w-full">
        {skillCategories.map((cat, i) => (
          <div
            key={i}
            className={`bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-zinc-400 hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
              i === 2 || i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-zinc-600 pb-2">
              {cat.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {cat.items}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;