"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Briefcase, FolderKanban, Mail, Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

const PLACEHOLDER = "Show me everything you've built…";

const chips = [
  { label: "View my projects", icon: FolderKanban, to: "/work/projects" },
  { label: "See my career", icon: Briefcase, to: "/work/career" },
  { label: "Get in touch", icon: Mail, to: "/work/contact" },
];

const PromptCTA = () => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

  // Typewriter effect for the fake prompt
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(PLACEHOLDER.slice(0, i));
      if (i >= PLACEHOLDER.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-ink-500 font-semibold mb-4">
            Want the full tour?
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-ink-900 leading-tight mb-4">
            STEP INTO MY <span className="text-blue-deep">WORKSPACE</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-700 max-w-xl mx-auto mb-10">
            My projects, career, and contact info all live in here — laid out
            like the AI tools I work with every day.
          </p>
        </motion.div>

        {/* Claude-style prompt card */}
        <motion.button
          type="button"
          onClick={() => navigate("/work/projects")}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-sand-50 border border-sand-300 rounded-3xl shadow-[0_12px_40px_rgba(34,48,60,0.1)] p-4 sm:p-5 text-left cursor-pointer hover:border-blue/60 hover:shadow-[0_16px_50px_rgba(111,168,198,0.15)] transition-all"
        >
          <div className="flex items-start gap-3 px-2 pt-2 pb-6 sm:pb-8">
            <Sparkles className="w-5 h-5 text-blue-deep flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-ink-900 min-h-[1.5em]">
              {typed}
              <span className="inline-block w-0.5 h-5 bg-blue ml-0.5 align-middle animate-pulse" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-ink-500 pl-2 hidden sm:block">
              Gerbinguio's portfolio
            </span>
            <span className="ml-auto w-10 h-10 rounded-xl bg-blue hover:bg-blue-dark transition-colors flex items-center justify-center shadow-md">
              <ArrowUp className="w-5 h-5 text-sand-50" />
            </span>
          </div>
        </motion.button>

        {/* Suggestion chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => navigate(chip.to)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-sand-300 bg-sand-100 text-sm text-ink-700 hover:border-blue hover:text-blue-deep hover:bg-blue-soft/50 transition-all"
            >
              <chip.icon className="w-4 h-4" />
              {chip.label}
            </button>
          ))}
        </motion.div>

        {/* Footer */}
        <p className="text-ink-500 text-xs sm:text-sm mt-16">
          © 2026 Gerbinguio Victorino · Made with{" "}
          <span className="text-ink-900 font-semibold">TypeScript</span> &{" "}
          <span className="text-ink-900 font-semibold">Tailwind CSS</span>
        </p>
      </div>
    </section>
  );
};

export default PromptCTA;
