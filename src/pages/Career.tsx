"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "/mcdo.png";
import img2 from "/ojt.jfif";
import img3 from "/barbizon.png";

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      const row3 = row3Ref.current;

      if (section) {
        gsap.to(section, {
          opacity: 0,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (row1) {
        gsap.from(row1, {
          opacity: 0,
          x: -100,
          duration: 0.7,
          scrollTrigger: {
            trigger: row1,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (row2) {
        gsap.from(row2, {
          opacity: 0,
          x: 100,
          duration: 0.7,
          scrollTrigger: {
            trigger: row2,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (row3) {
        gsap.from(row3, {
          opacity: 0,
          x: -100,
          duration: 0.7,
          scrollTrigger: {
            trigger: row3,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-transparent flex flex-col justify-start pt-24 sm:pt-32 items-center overflow-hidden">
      <div className="flex flex-col justify-start items-start gap-y-8 sm:gap-y-12 p-4 sm:p-6 sm:px-12 w-full max-w-5xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold shimmer-text text-center w-full">
          CAREER
        </h1>

        {/* Row 1 — McDonald's */}
        <div
          ref={row1Ref}
          className="flex flex-col md:flex-row items-center gap-3 sm:gap-6 md:gap-10 w-full"
        >
          <div className="w-32 sm:w-48 mx-auto md:w-48 h-32 sm:h-48 md:h-52 bg-white shadow-md rounded-xl overflow-hidden flex-shrink-0">
            <img src={img1} alt="McDonald's" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 max-w-lg text-center md:text-left space-y-1">
            <h2 className="text-lg sm:text-xl font-bold">Service Crew</h2>
            <h2 className="text-xs sm:text-sm font-bold text-gray-400">McDonald's · 2 years</h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Worked at McDonald's for 2 years while studying full-time. Built strong
              time management, discipline, and multitasking skills under high-pressure
              environments. Developed customer service, teamwork, and communication
              abilities across busy daily shifts.
            </p>
          </div>

          <div className="group w-32 sm:w-48 mx-auto md:w-56 mt-2 sm:mt-0 flex-shrink-0">
            <div className="relative w-full aspect-[4/3] [perspective:1000px]">
              <div className="relative w-full h-full [transform-style:preserve-3d] animate-flip group-hover:[animation-play-state:paused]">
                <img src="/nameplate.png" alt="McDo Nameplate" className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden]" />
                <img src="/nameplate.png" alt="McDo Nameplate Back" className="absolute inset-0 w-full h-full object-cover rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Monad Internship */}
        <div
          ref={row2Ref}
          className="flex flex-col md:flex-row-reverse items-center gap-3 sm:gap-6 md:gap-10 w-full"
        >
          <div className="w-32 sm:w-48 mx-auto md:w-48 h-32 sm:h-48 md:h-52 bg-white shadow-md rounded-xl overflow-hidden flex-shrink-0">
            <img src={img2} alt="Monad Internship" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 max-w-lg text-center md:text-left space-y-1">
            <h2 className="text-lg sm:text-xl font-bold">Front End Web Developer Intern</h2>
            <h2 className="text-xs sm:text-sm font-bold text-gray-400">Monad Solutions Inc.</h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Gained hands-on experience building real-world applications during my OJT.
              Converted Figma designs into responsive UIs using HTML, CSS, TypeScript,
              React, and Tailwind CSS. Collaborated with a team using GitHub and Jira
              in a professional development environment.
            </p>
          </div>


        </div>

        {/* Row 3 — Barbizon */}
        <div
          ref={row3Ref}
          className="flex flex-col md:flex-row items-center gap-3 sm:gap-6 md:gap-10 w-full"
        >
          <div className="w-32 sm:w-48 mx-auto md:w-48 h-32 sm:h-48 md:h-52 bg-white shadow-md rounded-xl overflow-hidden flex-shrink-0">
            <img src={img3} alt="Barbizon" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 max-w-lg text-center md:text-left space-y-1">
            <h2 className="text-lg sm:text-xl font-bold">Junior Software Engineer</h2>
            <h2 className="text-xs sm:text-sm font-bold text-gray-400">Barbizon Everyday Corporation · 2 months</h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Built an internal SKU Request System used across two companies with a
              combined 20–25 templates. The system captures SKU item codes, looks them
              up against a database, and automatically populates the correct template
              based on the user's selection — streamlining what was previously a
              manual, error-prone process.
            </p>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Career;