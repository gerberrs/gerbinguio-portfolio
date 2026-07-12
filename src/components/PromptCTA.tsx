"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Briefcase,
  ChevronRight,
  FolderKanban,
  Mail,
  Sparkles,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

const PHRASES = [
  "Show me your recent projects...",
  "Let's discuss how we can work together...",
  "Walk me through your experience...",
  "I'd like to automate my workflow...",
];

const chips = [
  { label: "View my projects", icon: FolderKanban, to: "/work/projects" },
  { label: "See my career", icon: Briefcase, to: "/work/career" },
  { label: "Get in touch", icon: Mail, to: "/work/contact" },
];

const PromptCTA = () => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

  // Typewriter effect for the fake prompt
  useEffect(() => {
    if (!inView) return;

    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setTyped(currentPhrase.substring(0, typed.length - 1));
        if (typed.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }, 30); // delete speed
    } else {
      timeout = setTimeout(() => {
        setTyped(currentPhrase.substring(0, typed.length + 1));
        if (typed.length === currentPhrase.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000); // pause before deleting
        }
      }, 60); // type speed
    }

    return () => clearTimeout(timeout);
  }, [typed, isDeleting, phraseIndex, inView]);

  return (
    <section ref={ref} className="px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-5xl text-ink-900 leading-tight mb-4">
            WANT THE FULL TOUR? STEP INTO MY{" "}
            <span className="text-blue-deep">WORKSPACE</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-700 max-w-xl mx-auto mb-10">
            My projects, career, and contact info all live in here — laid out
            like the AI tools I work with every day.
          </p>
        </motion.div>

        {/* Suggestion chips */}
        <motion.p
          className="text-xs text-ink-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Jump straight in
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-3 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {chips.map((chip) => (
            <motion.button
              key={chip.label}
              onClick={() => navigate(chip.to)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 pl-4 pr-3 py-2 rounded-full glass glass-hover border border-white/15 text-sm text-ink-700 hover:text-blue-deep hover:border-blue/40"
            >
              <chip.icon className="w-4 h-4" />
              {chip.label}
              <ChevronRight className="w-3.5 h-3.5 text-ink-500 group-hover:text-blue-deep group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          ))}
        </motion.div>

        {/* Claude-style prompt card */}
        <motion.button
          type="button"
          onClick={() => navigate("/work/projects")}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.99 }}
          className="w-full glass glass-hover rounded-3xl p-4 sm:p-5 text-left cursor-pointer"
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
            <span className="ml-auto w-10 h-10 rounded-xl bg-blue hover:bg-blue-deep transition-colors flex items-center justify-center shadow-[0_6px_20px_-4px_rgba(111,168,198,0.55)]">
              <ArrowUp className="w-5 h-5 text-base-950" />
            </span>
          </div>
        </motion.button>

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
