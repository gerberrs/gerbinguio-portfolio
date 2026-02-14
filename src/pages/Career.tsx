"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "/mcdo.png";
import img2 from "/ojt.jfif";

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Use gsap.context for safe cleanup in React
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;

      // Exit animation for the whole section
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

      // Entrance Row 1
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

      // Entrance Row 2
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
    }, sectionRef); // Scope to section

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col justify-start items-start gap-y-6 sm:gap-y-16 p-4 sm:p-6 sm:px-12 w-full max-w-7xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold shimmer-text text-center w-full">
          CAREER
        </h1>

      {/* Row 1 */}
      <div
        ref={row1Ref}
        className="flex flex-col md:flex-row items-center gap-3 sm:gap-6 md:gap-12 w-full"
      >
        <div className="w-40 sm:w-64 mx-auto md:w-60 h-40 sm:h-64 md:h-72 bg-white shadow-md rounded-xl overflow-hidden">
          <img
            src={img1}
            alt="Career 1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 max-w-xl text-center md:text-left space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">Service Crew</h2>
          <h2 className="text-sm sm:text-base font-bold">McDonald's</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            I worked at McDonald's for 2 years while studying. This helped me
            develop strong time management and discipline. I gained customer
            service skills and became more organized, flexible, and efficient at
            multitasking. I also built teamwork, communication, and leadership
            abilities during busy shifts.
          </p>
        </div>

        {/* Fixed Nameplate */}
        <div className="group w-40 sm:w-64 mx-auto md:w-72 mt-2 sm:mt-4 md:mt-0">
          <div className="relative w-full aspect-[4/3] [perspective:1000px]">
            <div className="relative w-full h-full [transform-style:preserve-3d] animate-flip group-hover:[animation-play-state:paused]">
              <img
                src="/nameplate.png"
                alt="McDo Career"
                className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
              />
              <img
                src="/nameplate.png"
                alt="McDo Career Back"
                className="absolute inset-0 w-full h-full object-cover rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div
        ref={row2Ref}
        className="flex flex-col md:flex-row-reverse items-center gap-3 sm:gap-6 md:gap-12 w-full"
      >
        <div className="w-40 sm:w-64 mx-auto md:w-60 h-40 sm:h-64 md:h-72 bg-white shadow-md rounded-xl overflow-hidden">
          <img
            src={img2}
            alt="Career 2"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 max-w-xl text-center md:text-left space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            Front End Web Developer Intern
          </h2>
          <h2 className="text-sm sm:text-base font-bold">
            Monad Solutions Inc.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            During my internship, I gained hands-on experience building
            real-world applications. I turned Figma designs into responsive UIs
            using HTML, CSS, TypeScript, React, and Tailwind CSS. We
            collaborated using GitHub and Jira, and I worked daily in VS Code.
            This internship gave me valuable technical knowledge and
            professional experience in a team-oriented setting.
          </p>
        </div>

        {/* Fixed Coc */}
        <div className="group w-40 sm:w-64 mx-auto md:w-72 mt-2 sm:mt-4 md:mt-0">
          <div className="relative w-full aspect-[4/3] [perspective:1000px]">
            <div className="relative w-full h-full [transform-style:preserve-3d] animate-flip group-hover:[animation-play-state:paused]">
              <img
                src="/coc.jfif"
                alt="Intern Career"
                className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
              />
              <img
                src="/coc.jfif"
                alt="Intern Career Back"
                className="absolute inset-0 w-full h-full object-cover rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Career;
