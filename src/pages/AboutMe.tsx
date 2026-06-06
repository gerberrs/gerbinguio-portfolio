"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.5 },
  },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUpStagger = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.5 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const skillCategories = [
  {
    title: "CRM & Automation",
    items:
      "GoHighLevel, ActiveCampaign, Zapier, n8n, Workflow Automation, Pipeline Management, Email Sequences, Funnel Building, Website Building",
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
    items:
      "GitHub, Jira, Canva, VSCode, ClickFunnels, Word, PowerPoint, Excel, Antigravity",
  },
  {
    title: "Professional Skills",
    items:
      "Communication, Teamwork, Problem-Solving, Adaptability, Leadership, Attention to Detail",
  },
];

const AboutMe = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col text-white px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-24"
    >
      {/* Section Title */}
      <motion.div
        className="flex flex-col items-center mb-12 sm:mb-16"
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shimmer-text">
          ABOUT ME
        </h1>
        <h2 className="text-sm sm:text-lg mt-2 text-center text-gray-400">
          Get to know more about me, and my automation journey
        </h2>
      </motion.div>

      {/* Two-Column Layout */}
      <motion.div
        className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-start"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {/* LEFT — About Me */}
        <motion.div
          className="lg:w-[42%] flex-shrink-0"
          variants={fadeInUpStagger}
        >
          {/* Profile Row — image + info side by side */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <motion.img
              src="/devPicture.png"
              alt="Profile"
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-full shadow-lg border-4 bg-zinc-700 flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="text-center sm:text-left space-y-1 pt-2">
              <p className="text-lg sm:text-xl font-bold">Gerbinguio, 23</p>
              <p className="text-sm text-gray-400">
                GHL &amp; Automation Specialist
              </p>
              <p className="text-sm text-gray-400">
                San Pedro City, Laguna, Philippines
              </p>
              {/* Stats inline */}
              <div className="flex gap-4 pt-3 justify-center sm:justify-start">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-sm shadow-md cursor-pointer"
                    whileHover={{ scale: 1.2, backgroundColor: "#52525b" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    3
                  </motion.div>
                  <p className="mt-1 text-[10px] text-gray-400">CRM systems</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-sm shadow-md cursor-pointer"
                    whileHover={{ scale: 1.2, backgroundColor: "#52525b" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    20+
                  </motion.div>
                  <p className="mt-1 text-[10px] text-gray-400">workflows</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-sm shadow-md cursor-pointer"
                    whileHover={{ scale: 1.2, backgroundColor: "#52525b" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    10+
                  </motion.div>
                  <p className="mt-1 text-[10px] text-gray-400">tools</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-7 space-y-4 text-center sm:text-left">
            <p className="text-sm leading-relaxed text-gray-300">
              I am an AI-driven worker who believes that the future of work is
              built on intelligent systems and automation. I actively leverage AI
              tools like Claude, ChatGPT, and Gemini in my day-to-day workflow —
              not just as assistants, but as core parts of how I design, build,
              and optimize automation systems.
            </p>

            <p className="text-sm leading-relaxed text-gray-300">
              I am a 2025 graduate with a degree in Bachelor of Science in
              Information Technology. Before my tech career, I spent 2 years as a
              Service Crew at McDonald's while studying full-time — where I
              developed strong discipline, time management, and the ability to
              perform under pressure.
            </p>

            <p className="text-sm leading-relaxed text-gray-300">
              I started my tech career as a Front-End Developer intern and later
              worked as a Junior Software Engineer. Over time, I found my passion
              in automation. I now specialize in GoHighLevel (GHL), Zapier, and
              tools like n8n — designing end-to-end CRM systems, multi-step
              workflows, email sequences, pipeline management, and AI-powered
              reporting.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — Skills / Tools */}
        <motion.div
          className="lg:w-[58%] flex flex-col"
          variants={fadeInUpStagger}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left shimmer-text">
            TOOLS I'VE USED
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-zinc-400 hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                variants={fadeInUpStagger}
              >
                <h4 className="text-sm sm:text-base font-bold mb-2 border-b border-zinc-600 pb-2">
                  {cat.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {cat.items}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;