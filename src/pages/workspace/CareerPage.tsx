"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "CRM Specialist — Zoho (Freelance)",
    company: "Freelance Client · WordPress + Zoho stack",
    period: "2026 — Present",
    image: null,
    description:
      "A real client project. I moved their leads out of spreadsheets and into Zoho CRM, built branded emails in Zoho Campaigns, and set up automations with Zoho Flow and workflow rules. I also connected their WordPress site to the CRM through webhooks and API calls, so every form submission turns into a lead on its own.",
    tags: ["Zoho CRM", "Zoho Campaigns", "Zoho Flow", "API & Webhooks", "WordPress"],
  },
  {
    title: "GHL & Automation Specialist",
    company: "Freelance / Portfolio Projects",
    period: "2025 — Present",
    image: null,
    description:
      "This is where I found my lane. I built three complete GoHighLevel systems — Brew Mania, Brewtomation, and Brewsmarinas — covering bookings, a coaching program, and equipment rentals. Pipelines, workflows, email sequences, calendars, plus Zapier and Gemini AI for monthly reports that write themselves.",
    tags: ["GoHighLevel", "Zapier", "n8n", "AI Reporting"],
  },
  {
    title: "Junior Software Engineer",
    company: "Barbizon Everyday Corporation · 2 months",
    period: "2025",
    image: "/barbizon.png",
    description:
      "Built an internal SKU request system that two companies still use, covering around 20–25 templates. You type in an SKU code, it looks it up in the database, and fills out the right template for you. It used to be a slow, manual process where mistakes slipped in all the time.",
    tags: ["React", "Node.js", "SQL", "Tailwind"],
  },
  {
    title: "Front End Web Developer Intern",
    company: "Monad Solutions Inc.",
    period: "2025",
    image: "/ojt.jfif",
    description:
      "My first taste of real dev work. I turned Figma designs into responsive UIs with React, TypeScript, and Tailwind, and learned how a team actually ships software — pull requests, Jira tickets, code reviews, all of it.",
    tags: ["React", "TypeScript", "Figma", "Jira"],
  },
  {
    title: "Service Crew",
    company: "McDonald's · 2 years",
    period: "2022 — 2024",
    image: "/mcdo.png",
    description:
      "Two years on the service crew while studying full-time. Rush hour teaches you discipline, multitasking, and how to stay friendly when everything's on fire. Honestly, some of the best training I've ever had.",
    tags: ["Discipline", "Teamwork", "Customer Service"],
  },
];

const CareerPage = () => {
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
          Started at McDonald's, ended up building CRM systems. Here's how that
          happened.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-sand-300" />

        <div className="space-y-10">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Timeline dot */}
              <span className="absolute left-4 sm:left-5 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue ring-4 ring-blue-soft" />

              <div className="bg-sand-100 border border-sand-300 rounded-2xl p-5 sm:p-6 hover:border-blue hover:shadow-[0_8px_30px_rgba(111,168,198,0.12)] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {role.image && (
                    <img
                      src={role.image}
                      alt={role.company}
                      className="w-16 h-16 rounded-xl object-cover border border-sand-300 bg-sand-50 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold mb-1">
                      {role.period}
                    </p>
                    <h2 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
                      {role.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-ink-500 mt-0.5">
                      {role.company}
                    </p>
                    <p className="text-ink-700 text-xs sm:text-sm leading-relaxed mt-3">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] border border-sand-300 bg-sand-50 text-ink-500 rounded-full px-2.5 py-0.5"
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
