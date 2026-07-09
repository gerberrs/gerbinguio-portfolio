"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { careerRoles as roles } from "../../data/career";

const CareerPage = () => {
  const [searchParams] = useSearchParams();
  const focusedRole = searchParams.get("r");

  // Scroll the requested role into view (after the layout's scroll reset)
  useEffect(() => {
    if (!focusedRole) return;
    const timer = setTimeout(() => {
      document
        .getElementById(`role-${focusedRole}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => clearTimeout(timer);
  }, [focusedRole]);

  return (
    <div className="min-h-full px-6 sm:px-10 pb-20">
      {/* Header */}
      <div className="pt-12 sm:pt-16 text-center mb-12 sm:mb-16">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-ink-500 font-semibold mb-3">
          The journey so far
        </p>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-none text-ink-900">
          CAREER<span className="text-blue-deep">.</span>
        </h1>
        <p className="text-sm sm:text-base text-ink-500 mt-4 max-w-xl mx-auto">
          Started on the service crew at McDonald's, moved into front-end web
          development, then software engineering — and landed where I actually
          belong: building CRM and automation systems. Here's how that happened.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-white/10" />

        <div className="space-y-10">
          {roles.map((role, i) => (
            <motion.div
              key={role.slug}
              id={`role-${role.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative pl-12 sm:pl-16 scroll-mt-24"
            >
              {/* Timeline dot */}
              <span className="absolute left-4 sm:left-5 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue ring-4 ring-blue-soft" />

              <div className="glass glass-hover rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {role.image && (
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 bg-white/5 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold mb-1">
                      {role.period}
                    </p>
                    <h2 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
                      {role.title}
                    </h2>
                    <p className="text-ink-700 text-xs sm:text-sm leading-relaxed mt-3">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] border border-white/10 bg-white/5 text-ink-500 rounded-full px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education note */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-12 bg-blue-soft/50 border border-blue/30 rounded-2xl p-5 sm:p-6 text-center"
      >
        <p className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold mb-1">
          Education
        </p>
        <p className="text-ink-900 font-bold text-sm sm:text-base">
          Bachelor of Science in Information Technology — Class of 2025
        </p>
      </motion.div>
    </div>
  );
};

export default CareerPage;
