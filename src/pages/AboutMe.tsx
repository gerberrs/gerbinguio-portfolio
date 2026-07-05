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
      "GoHighLevel, Zoho CRM, Zoho Campaigns, Zoho Flow, ActiveCampaign, Zapier, n8n, Workflow Automation, Pipeline Management, Email Sequences, Funnel Building, Website Building",
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
    items:
      "HTML, CSS, JavaScript, TypeScript, React.js, Tailwind, WordPress, APIs & Webhooks",
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

const stats = [
  { value: "4", label: "CRM systems" },
  { value: "20+", label: "workflows" },
  { value: "10+", label: "tools" },
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
      className="w-full flex flex-col text-ink-900 px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8 sm:pb-12"
    >
      {/* Section Title */}
      <motion.div
        className="flex flex-col items-center mb-12 sm:mb-16"
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
      >
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink-900">
          ABOUT <span className="text-blue-deep">ME</span>
        </h1>
        <h2 className="text-sm sm:text-lg mt-3 text-center text-ink-500">
          A little about me and how I ended up in automation
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
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-full shadow-lg border-4 border-blue bg-sand-200 flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="text-center sm:text-left space-y-1 pt-2">
              <p className="text-lg sm:text-xl font-bold">Gerbinguio, 23</p>
              <p className="text-sm text-ink-500">
                CRM &amp; Automation Specialist
              </p>
              <p className="text-sm text-ink-500">
                San Pedro City, Laguna, Philippines
              </p>
              {/* Stats inline */}
              <div className="flex gap-4 pt-3 justify-center sm:justify-start">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <motion.div
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-ink-900 text-sand-50 font-bold text-sm shadow-md cursor-pointer"
                      whileHover={{ scale: 1.2, backgroundColor: "#6FA8C6" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="mt-1 text-[10px] text-ink-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-7 space-y-4 text-center sm:text-left">
            <p className="text-sm leading-relaxed text-ink-700">
              I'm a CRM and Automation Specialist. Most of my day happens inside
              GoHighLevel, Zoho, and Zapier — building systems that handle the
              repetitive work so people don't have to. AI tools like Claude,
              ChatGPT, and Gemini are part of my daily workflow too. Not just for
              asking questions — they're baked into how I design and build.
            </p>

            <p className="text-sm leading-relaxed text-ink-700">
              I graduated in 2025 with a BS in Information Technology. Before
              tech, I spent two years on the service crew at McDonald's while
              studying full-time. That job taught me more about discipline and
              staying calm under pressure than any classroom ever did.
            </p>

            <p className="text-sm leading-relaxed text-ink-700">
              I started out as a front-end developer intern, then worked as a
              junior software engineer — and somewhere along the way I realized
              automation was the part I actually loved. Right now I'm doing
              freelance Zoho work for a client: importing their leads, building
              email campaigns, and wiring their WordPress site straight into the
              CRM so new leads create themselves.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — Skills / Tools */}
        <motion.div
          className="lg:w-[58%] flex flex-col"
          variants={fadeInUpStagger}
        >
          <h3 className="font-display text-2xl sm:text-3xl mb-6 text-center lg:text-left text-ink-900">
            TOOLS I'VE <span className="text-blue-deep">USED</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                className="bg-sand-100 border border-sand-300 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-blue hover:shadow-[0_8px_30px_rgba(111,168,198,0.15)]"
                variants={fadeInUpStagger}
              >
                <h4 className="text-sm sm:text-base font-bold mb-2 border-b border-sand-300 pb-2">
                  {cat.title}
                </h4>
                <p className="text-ink-500 text-xs sm:text-sm leading-relaxed">
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
