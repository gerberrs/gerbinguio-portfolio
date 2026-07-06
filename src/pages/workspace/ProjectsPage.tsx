"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ExternalLink, X } from "lucide-react";
import { projects, type Project } from "../../data/projects";

const CaseStudyModal = ({
  project,
  onClose,
  setLightboxImage,
}: {
  project: Project;
  onClose: () => void;
  setLightboxImage: (src: string | null) => void;
}) => {
  const slides = project.caseStudy ?? [
    {
      title: "Overview",
      content: project.description,
      images: [project.image],
    },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl bg-sand-50 border border-sand-300 rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-sand-300">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold mb-1">
              {project.type}
            </p>
            <h2 className="text-base sm:text-lg font-bold text-ink-900">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-500 hover:text-ink-900 transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {slides.length > 1 && (
          <div className="px-6 pt-2 pb-1 text-xs text-ink-500 text-right">
            Use arrows to navigate →
          </div>
        )}

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
                    className="relative w-full h-64 rounded-xl overflow-hidden cursor-zoom-in group border border-sand-300"
                    onClick={() => setLightboxImage(slide.images![0])}
                  >
                    <img
                      src={slide.images[0]}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-ink-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="text-sand-50 text-sm font-semibold">
                        Click to expand 🔍
                      </span>
                    </div>
                  </div>
                )}
                {slide.images && slide.images.length === 2 && (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {slide.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-48 rounded-xl overflow-hidden cursor-zoom-in group border border-sand-300"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${slide.title} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-ink-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <span className="text-sand-50 text-xs font-semibold">
                            Expand 🔍
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-ink-900 mt-1 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    {slide.content}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="px-6 pb-5 flex flex-wrap items-center gap-2 border-t border-sand-300 pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-sand-300 bg-sand-100 text-ink-700 rounded-full px-3 py-1 text-[10px]"
            >
              {t}
            </span>
          ))}
          {project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-blue-deep hover:text-blue-deep transition"
            >
              Visit live site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const activeSlug = searchParams.get("p");
  const activeProject = projects.find((p) => p.slug === activeSlug) ?? null;

  const openProject = (project: Project) => {
    setSearchParams({ p: project.slug });
  };

  const closeProject = () => {
    setSearchParams({});
    setLightboxImage(null);
  };

  // Drag-to-scroll for the shelf (mouse; touch scrolls natively)
  const shelfRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const onShelfPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = shelfRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onShelfPointerMove = (e: React.PointerEvent) => {
    const el = shelfRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const onShelfPointerEnd = () => {
    drag.current.down = false;
  };

  const onShelfClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="min-h-full">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/90 cursor-pointer"
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
              className="absolute top-6 right-6 text-sand-50 text-3xl font-bold hover:text-sand-300"
              onClick={() => setLightboxImage(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case study modal */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal
            project={activeProject}
            onClose={closeProject}
            setLightboxImage={setLightboxImage}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="pt-12 sm:pt-16 px-6 text-center">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-ink-500 font-semibold mb-3">
          Things I've built
        </p>
        <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-none text-ink-900">
          PROJECTS<span className="text-blue-deep">.</span>
        </h1>
      </div>

      {/* Foliom-style vinyl shelf */}
      <div
        ref={shelfRef}
        className="shelf-perspective overflow-x-auto overflow-y-hidden scrollbar-hide mt-4 sm:mt-2 select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onShelfPointerDown}
        onPointerMove={onShelfPointerMove}
        onPointerUp={onShelfPointerEnd}
        onPointerLeave={onShelfPointerEnd}
        onClickCapture={onShelfClickCapture}
      >
        <div
          className="flex items-center w-max mx-auto pl-6 pr-10 sm:pl-10 sm:pr-14 pt-16 pb-14"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => (
            <button
              key={project.slug}
              onClick={() => openProject(project)}
              className="shelf-card relative flex-shrink-0 aspect-square w-[clamp(150px,17vw,300px)] -ml-[clamp(90px,10vw,176px)] first:ml-0 text-left focus:outline-none"
              style={{
                zIndex: projects.length - i,
                animation: `fadeInUp 0.6s ease-out ${i * 0.08}s backwards`,
              }}
              aria-label={`Open ${project.title}`}
            >
              {/* Sleeve front */}
              <div
                className="absolute inset-0 overflow-hidden bg-sand-200"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={project.image}
                  alt={project.shelfTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/95 via-ink-900/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[9px] uppercase tracking-widest text-sand-300 font-semibold mb-1 line-clamp-1">
                    {project.type}
                  </p>
                  <p className="font-display text-sand-50 text-lg sm:text-xl leading-tight">
                    {project.shelfTitle}
                  </p>
                </div>
              </div>

              {/* Sleeve edge (thickness) */}
              <div
                className="absolute top-0 h-full"
                style={{
                  left: "100%",
                  width: "8px",
                  transformOrigin: "left center",
                  transform: "rotateY(90deg)",
                  background:
                    "linear-gradient(180deg, #2C3E4D 0%, #22303C 50%, #1A252E 100%)",
                }}
              />

              {/* Sleeve back */}
              <div
                className="absolute inset-0"
                style={{ transform: "translateZ(-8px)", background: "#22303C" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Shelf floor shadow */}
      <div className="max-w-4xl mx-auto -mt-10 mb-16 h-6 rounded-[100%] bg-ink-900/10 blur-xl" />

      {/* All projects list */}
      <div className="px-6 sm:px-10 pb-16 max-w-5xl mx-auto">
        <h2 className="font-display text-xl sm:text-2xl text-ink-900 mb-6">
          ALL <span className="text-blue-deep">PROJECTS</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.slug}
              onClick={() => openProject(project)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="flex gap-4 items-start p-4 rounded-2xl border border-sand-300 bg-sand-100 hover:border-blue hover:shadow-[0_8px_30px_rgba(111,168,198,0.15)] transition-all text-left group"
            >
              <img
                src={project.image}
                alt=""
                className="w-20 h-20 rounded-xl object-cover border border-sand-300 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-blue-deep font-semibold mb-0.5 line-clamp-1">
                  {project.type}
                </p>
                <h3 className="font-bold text-ink-900 text-sm sm:text-base leading-snug group-hover:text-blue-deep transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-ink-500 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[9px] border border-sand-300 bg-sand-50 text-ink-500 rounded-full px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[9px] border border-sand-300 bg-sand-50 text-ink-500 rounded-full px-2 py-0.5">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <style>{`
        .case-study-swiper .swiper-button-next,
        .case-study-swiper .swiper-button-prev {
          color: #6FA8C6;
        }
        .case-study-swiper .swiper-button-next::after,
        .case-study-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
