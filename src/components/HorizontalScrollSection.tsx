"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CaseStudySlide = {
  title: string;
  content: string;
  images?: string[];
};

type Project = {
  title: string;
  type?: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  caseStudy?: CaseStudySlide[];
};

const projects: Project[] = [
  {
    title: "Brew Mania",
    type: "GHL Sub-Account — CRM, Funnel & Automation",
    description:
      "Full CRM and booking automation system for a mock pop-up coffee bar. Includes lead capture, pipeline management, approval workflows, cancellation handling, Jotform feedback collection via Zapier, and AI-powered monthly reporting using Gemini AI and Google Docs.",
    image: "/brewmania.png",
    tech: ["GoHighLevel", "Zapier", "Jotform", "Gemini AI", "Google Sheets", "Google Docs"],
    link: "#",
    caseStudy: [
      {
        title: "Funnel",
        content:
          "The Brew Mania funnel captures event booking leads with a clean, conversion-focused layout. It presents the pop-up coffee bar offer and drives visitors to submit a booking inquiry form — the entry point into the full CRM automation.",
        images: ["/brewmania.png"],
      },
      {
        title: "Website",
        content:
          "The Brew Mania website serves as the main landing presence for the mock pop-up coffee bar business, showcasing services, social proof, and a clear call-to-action that routes visitors into the booking funnel.",
        images: ["/bm-website.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brew Mania Event Booking Pipeline tracks contacts across 6 stages: New Inquiry, Contacted, Pending, Booked, Event Done, and Cancelled — giving a clear view of where each lead stands in the booking lifecycle.",
        images: ["/bm-pipeline.png"],
      },
      {
        title: "New Booking Inquiry — Part 1",
        content:
          "When a booking form is submitted, the system creates the contact, adds them to the pipeline, sends a confirmation email, and waits for them to book a meeting. Once booked, a smart reminder loop fires — sending up to 3 attempts. No response after 3 attempts automatically marks them as declined.",
        images: ["/bm-workflow1.png", "/bm-workflow2.png"],
      },
      {
        title: "New Booking Inquiry — Part 2",
        content:
          "The admin manually tags the contact as approved or declined. If approved, a confirmation email is sent and the system waits for the event date — sending a day-before reminder then a thank you email on event day to close the lifecycle. If declined, a cancellation email goes out and the pipeline closes.",
        images: ["/bm-workflow3.png", "/bm-workflow4.png"],
      },
      {
        title: "Cancellation Workflow",
        content:
          "Triggered when a cancellation form is submitted. Sends an internal notification, then checks if the contact is already tagged as cancelled. If yes — updates the pipeline and emails the lead a confirmation. If no — waits 2 hours and loops back to recheck.",
        images: ["/bm-cancellation.png"],
      },
      {
        title: "Re-engagement Workflow",
        content:
          "Triggered when a contact receives the 'event-done' tag. Waits 31 days then sends a 'We Love to See You Again' email. Waits another 31 days and sends a second follow-up — keeping past clients warm for future bookings automatically.",
        images: ["/bm-wltsya.png"],
      },
      {
        title: "Has 'Meeting Booked' Tag Workflow",
        content:
          "A lightweight helper workflow triggered when a customer books an appointment and already has the 'contacted' tag. Its job is to add the 'Meeting Booked' tag — allowing the main workflow to branch correctly based on pre-meeting status.",
        images: ["/bm-has-booked.png"],
      },
      {
        title: "Feedback & Monthly Report Workflow",
        content:
          "These two Zapier workflows are connected to the Brew Mania GHL automation. The first workflow captures customer feedback — when a customer submits the Jotform feedback and rating form, Zapier picks it up and logs the response into Google Sheets. The second workflow runs on the 1st of every month — it pulls the latest feedback data from the sheet, sends it to Gemini AI for summarization, and automatically creates a formatted monthly report inside Google Docs.",
        images: ["/bm-zapier.png", "/bm-wait-zapier.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, email automation), Zapier (Jotform → Google Sheets bridge), Jotform (feedback forms), Gemini AI (monthly report generation), Google Sheets (response logging), Google Docs (formatted report output).",
      },
    ],
  },
  {
    title: "Brewtomation — Brew Academy",
    type: "GHL Sub-Account — CRM, Funnel & Automation",
    description:
      "Batch-based online barista coaching CRM with custom-coded HTML email templates for welcome, session schedule, and certificate emails. Features enrollment automation, payment verification, session tracking, no-show detection, graduation workflow, and alumni management. Includes custom JavaScript on funnel buttons.",
    image: "/brewacademy.png",
    tech: ["GoHighLevel", "Zapier", "HTML Email Templates", "JavaScript", "Pipeline Management"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "Brew Academy is a batch-based online barista coaching system built entirely in GoHighLevel. Students enroll through a custom funnel, go through 3 coaching sessions, and graduate with a certificate — all tracked and automated per batch.",
        images: ["/brewacademy.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brewtomation Barista Program Pipeline tracks students across 11 stages: New Lead, New Inquiry, Contacted, Enrolled, Session 1, Session 2, Session 3, Graduate, Alumni, Lost Lead, Dropped Out, and No Show — covering the full student journey from enrollment to graduation.",
        images: ["/brewto-pipeline.png"],
      },
      {
        title: "Email Templates",
        content:
          "Brew Academy uses custom-coded HTML email templates built with Inter font and a pastel green design. The welcome email confirms enrollment and displays key details like student name, date enrolled, program, and batch. The completion email serves as an in-email certificate of completion — displaying the student's full name, program, and completion date.",
        images: ["/brewto-welcome.png", "/brewto-completion.png"],
      },
      {
        title: "Form Submission & Payment Verification",
        content:
          "When the enrollment form is submitted, the system tags the lead, moves them to the new-inquiry pipeline, sends a confirmation email, payment instructions, and notifies the team. It then waits 3 days for payment confirmation. If paid, a welcome email goes out and the student is enrolled. If unpaid after follow-up, they're tagged as lost-lead and the opportunity closes. If no response yet, a final payment reminder fires and the system loops back to wait.",
        images: ["/brewto1.png", "/brewto2.png"],
      },
      {
        title: "Session Tracking & Graduation",
        content:
          "Once enrolled, the system waits for each session to be completed via tag. After Session 1, it sends a completion email and waits 7 days for Session 2. If both sessions are attended, a Session 2 done email fires and the system checks for Session 3. Once Session 3 is confirmed, a course completion email goes out, the student is tagged as graduate, and after 3 days receives a feedback request before being tagged as alumni.",
        images: ["/brewto3.png", "/brewto4.png"],
      },
      {
        title: "Session Counter & No-Show Workflows",
        content:
          "Three lightweight helper workflows handle session completion — one for each session. When staff tags the student as 1st, 2nd, or 3rd session done, the workflow adds the tag and updates the pipeline stage. The same logic applies across all three sessions. A separate no-show workflow triggers when the no-show tag is added — moving the student directly to the Dropped Out pipeline stage.",
        images: ["/brewto-sessioncount.png", "/brewto-noshow.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, email automation), HTML Email Templates (custom-coded dark green templates for welcome, schedule, reminders, no-show, and certificate), JavaScript (custom funnel button logic), Pipeline Management (enrollment, session, graduation, alumni stages).",
      },
    ],
  },
  {
    title: "Brewsmarinas — Coffee Rental",
    type: "GHL Sub-Account — CRM, Funnel & Automation",
    description:
      "Well-structured equipment rental CRM system for coffee gear sets. Handles rental requests, booking confirmation via service calendar, equipment out tracking, return management, damage assessment, re-engagement automation, and internal staff notifications throughout the rental lifecycle.",
    image: "/brewsmarinas.png",
    tech: ["GoHighLevel", "Service Calendar", "Pipeline Management", "Email Automation"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "Brewsmarinas is a coffee equipment rental CRM built in GoHighLevel. It manages the full rental lifecycle — from initial request to return and damage assessment — across three equipment tiers: Starter, Barista, and Full Café.",
        images: ["/brewsmarinas.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brewsmarinas Coffee Equipment Rental Pipeline tracks rentals across 11 stages: New Rental Request, Contacted, Pending Confirmation, Confirmed, Equipment Out, Pending Return, Returned, Completed, Cancelled, Damaged, and Lost Lead — covering the full rental lifecycle from request to completion.",
        images: ["/brewsma-pipeline.png"],
      },
      {
        title: "01 — New Rental Request & 02 — Booking Confirmed",
        content:
          "When a rental form is submitted, the system creates the contact, tags them as rental-inquiry, adds them to the pipeline, sends a confirmation email, and moves to Pending Confirmation. Once the admin tags the contact as approved-rental-a, b, or c, the system detects the equipment set, books the correct service calendar, moves to Confirmed, sends a confirmation email, then waits 1 day before the appointment to send reminders to both the customer and the team.",
        images: ["/brewsmarinas1.png", "/brewsmarinas2.png"],
      },
      {
        title: "03 — Equipment Out & 04 — Returned Equipment",
        content:
          "When the admin tags the contact as equipment-out on delivery day, the system moves the pipeline, sends a delivery confirmation, notifies the team, waits 12 hours, then sends a time-over email and coordinates the return with staff. Once the equipment is returned — on time or late — the pipeline moves to Returned, a return confirmation email goes to the customer, and the team gets an internal notification to close out the rental.",
        images: ["/brewsmarinas3.png", "/brewsmarinas4.png"],
      },
      {
        title: "05 — Completed Rental & 06 — Damaged Equipment",
        content:
          "When the completed tag is added, the pipeline moves to Completed and a rental completion email is sent to the customer. If damage is reported on return, a separate workflow triggers — moving the pipeline to Damaged, sending the customer an inspection email, and notifying the internal team to follow up on the damage assessment.",
        images: ["/brewsmarinas5.png", "/brewsmarinas6.png"],
      },
      {
        title: "07 — Re-arrangement Email",
        content:
          "Triggered when the pipeline stage changes to Completed. Sends a thank you and ratings request email, waits 31 days, then sends a re-booking email. Waits another 31 days and sends a second re-booking nudge — keeping past customers engaged for future rentals.",
        images: ["/brewsmarinas7.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, service calendar, email automation), Pipeline Management (7 custom stages), Email Automation (confirmation, reminder, return, damage, re-engagement sequences).",
      },
    ],
  },
  {
    title: "Enrollment Automation — Zapier",
    type: "Zapier Automation",
    description:
      "Built an end-to-end enrollment automation that captures leads via Jotform, adds and enrolls them in ClickFunnels, tags them in ActiveCampaign, and triggers a personalized email via Gmail upon enrollment.",
    image: "/zapier-auto-enrollment-project.png",
    tech: ["Zapier", "Jotform", "ClickFunnels", "ActiveCampaign", "Gmail"],
    link: "#",
  },
  {
    title: "OJT Report Summarizer",
    type: "Zapier + AI Automation",
    description:
      "Automated summarization of daily OJT Excel reports using Gemini AI. Every time a new row is added to Google Sheets, Gemini AI automatically summarizes the data and outputs a formatted report inside Google Docs.",
    image: "/ojt-summarizer.png",
    tech: ["Zapier", "Gemini AI", "Google Sheets", "Google Docs"],
    link: "#",
  },
  {
    title: "Capstone Booking System",
    type: "Full-Stack Web Application",
    description:
      "A full-stack booking system built as a capstone project featuring a dynamic calendar for scheduling appointments. Users can view availability, select time slots, and manage bookings — backed by a PHP and SQL server with a clean Bootstrap frontend.",
    image: "/snvhoa.jpg",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
    link: "#",
  },
  {
    title: "SKU Request System",
    type: "AI-Assisted Web Application",
    description:
      "A SKU request management system built using AI-assisted development. Frontend built with React, ShadCN, and Tailwind. Backend powered by Node.js with an SQL database.",
    image: "/skuRequestSystem.jfif",
    tech: ["HTML", "CSS", "React", "Tailwind", "ShadCN", "Node.js"],
    link: "https://skusystem-wj8c.vercel.app/",
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const CaseStudyModal = ({
  project,
  onClose,
  setLightboxImage,
}: {
  project: Project;
  onClose: () => void;
  setLightboxImage: (src: string | null) => void;
}) => {
  const slides = project.caseStudy ?? [];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">
              {project.type ?? "Project Breakdown"}
            </p>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl leading-none transition"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pt-2 pb-1 text-xs text-white/30 text-right">
          Use arrows to navigate →
        </div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          className="case-study-swiper"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-4 px-6 pb-8 pt-2 min-h-[320px]">
                {slide.images && slide.images.length === 1 && (
                  <div
                    className="relative w-full h-64 rounded-xl overflow-hidden cursor-zoom-in group"
                    onClick={() => setLightboxImage(slide.images![0])}
                  >
                    <img
                      src={slide.images[0]}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-sm font-semibold">Click to expand 🔍</span>
                    </div>
                  </div>
                )}
                {slide.images && slide.images.length === 2 && (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {slide.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-48 rounded-xl overflow-hidden cursor-zoom-in group"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${slide.title} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <span className="text-white text-xs font-semibold">Expand 🔍</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                    {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {slide.content}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="px-6 pb-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-white/20 text-white/50 rounded-full px-3 py-1 text-[10px]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const lastSlideIndex = useRef(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetSlide = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          if (swiperRef.current && lastSlideIndex.current !== targetSlide) {
            swiperRef.current.slideTo(targetSlide, 600);
            lastSlideIndex.current = targetSlide;
          }
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.img
              src={lightboxImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <CaseStudyModal
            project={activeModal}
            onClose={() => setActiveModal(null)}
            setLightboxImage={setLightboxImage}
          />
        )}
      </AnimatePresence>

      <div
        ref={sectionRef}
        id="projects"
        className="relative h-auto md:h-[300vh]"
      >
        <div className="md:sticky md:top-0 h-auto overflow-hidden flex flex-col items-center justify-start pt-8 pb-8 sm:pt-16 md:pt-20 md:pb-12 z-20">
          <h1 className="text-3xl sm:text-5xl font-bold shimmer-text text-center mb-6 sm:mb-10">
            PROJECTS
          </h1>
          <div className="w-full">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
              className="w-full py-12 !overflow-visible"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              allowTouchMove={true}
              speed={600}
            >
              {projects.map((project) => (
                <SwiperSlide
                  key={project.title}
                  className="!w-[280px] sm:!w-[350px] lg:!w-[400px]"
                >
                  <motion.div
                    variants={cardVariant}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="block h-[540px] cursor-pointer"
                  >
                    <motion.div
                      className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden relative"
                      whileHover={{ borderColor: "rgba(255, 255, 255, 0.8)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="relative w-full h-[40%] cursor-pointer group overflow-hidden shrink-0"
                        onClick={() => setLightboxImage(project.image)}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-0">
                          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                            View Full Picture 🔍
                          </span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
                        <div className="flex-1">
                          {/* Type label above title */}
                          {project.type && (
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1">
                              {project.type}
                            </p>
                          )}
                          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">
                            {project.title}
                          </h2>
                          <p className="text-xs sm:text-sm leading-relaxed line-clamp-7">
                            {project.description}
                          </p>
                        </div>

                        {/* Breakdown pill */}
                        {project.caseStudy && (
                          <div className="flex justify-center mt-auto mb-2">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModal(project);
                              }}
                              className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-semibold text-white/90 shadow-lg shadow-black/40 flex items-center gap-1.5 cursor-pointer"
                              whileHover={{
                                scale: 1.08,
                                backgroundColor: "rgba(255,255,255,0.15)",
                                borderColor: "rgba(255,255,255,0.5)",
                                boxShadow: "0 0 20px rgba(255,255,255,0.15)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              View Breakdown
                            </motion.button>
                          </div>
                        )}

                        <div className="border-t border-white/20 pt-2 flex flex-wrap gap-2 text-[10px] sm:text-xs">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="border border-white/40 rounded-full px-2 py-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .case-study-swiper .swiper-button-next,
        .case-study-swiper .swiper-button-prev {
          color: white;
        }
        .case-study-swiper .swiper-button-next::after,
        .case-study-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default HorizontalScrollSection;