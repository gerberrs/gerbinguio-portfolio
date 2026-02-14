import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming",
    items: "HTML, CSS, JavaScript, TypeScript, C++, C#, PHP",
  },
  {
    title: "Frameworks",
    items: "Tailwind, React.js, Bootstrap",
  },
  {
    title: "Tools & Technology",
    items: "GitHub, Jira, Microsoft Suite, Word, PowerPoint, Excel, Canva, VSCode",
  },
  {
    title: "Database",
    items: "SQL",
  },
  {
    title: "Professional Skills",
    items: "Communication, Teamwork, Problem-Solving, Adaptability, Leadership",
  },
];

const educationItems = [
  {
    title: "Bachelor of Science in Information Technology",
    subtitle: "Pamantasan ng Lungsod ng Muntinlupa • 2021 – 2025",
    detail: "GWA: 1.65 / 5.0",
  },
  {
    title: "On-the-Job Training",
    subtitle: "Helply Web Internship • 2023",
    detail:
      "Gained practical experience building reusable components, integrating APIs, and collaborating with a team using GitHub and Jira.",
  },
  {
    title: "Capstone Project",
    subtitle: "Booking System • 2024",
    detail:
      "Designed and developed a booking system with dynamic calendar functionality for convenient scheduling and user management.",
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsPanelRef = useRef<HTMLDivElement>(null);
  const educationPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use gsap.context for safe cleanup
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const skillsPanel = skillsPanelRef.current;
      const educationPanel = educationPanelRef.current;
      
      if (!section || !skillsPanel || !educationPanel) return;

      // Create a timeline to sync both clips perfectly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Synchronized Wipe:
      // Skills clips to the left (hiding)
      tl.to(skillsPanel, {
        clipPath: "inset(0% 100% 0% 0%)",
        ease: "none",
      }, 0);

      // Education clips in from the right (revealing)
      tl.fromTo(educationPanel, 
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* LAYER 1: EDUCATION — Starts hidden (clipped), revealed by wipe */}
      <div 
        ref={educationPanelRef}
        className="absolute inset-0 flex flex-col justify-start pt-32 sm:pt-40 px-6 sm:px-12 lg:px-20"
        style={{ clipPath: "inset(0% 0% 0% 100%)" }} // Start fully clipped (hidden)
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shimmer-text text-center mb-10 sm:mb-14">
          EDUCATION
        </h1>
        <div className="max-w-3xl mx-auto w-full space-y-10 sm:space-y-12 pl-4">
          {educationItems.map((item, i) => (
            <div
              key={i}
              className="border-l-4 border-white pl-6 sm:pl-8 space-y-2 relative"
            >
              <div className="absolute -left-[11px] top-0 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
              <h2 className="text-xl sm:text-2xl font-bold">{item.title}</h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {item.subtitle}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-200">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LAYER 2: SKILLS — Starts visible, hidden by wipe */}
      <div
        ref={skillsPanelRef}
        className="absolute inset-0 flex flex-col justify-start pt-32 sm:pt-40 px-6 sm:px-12 lg:px-20 bg-transparent"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }} // Start fully visible
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shimmer-text text-center mb-10 sm:mb-14">
          TECHNICAL SKILLS
        </h1>
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
    </div>
  );
};

export default Education;
