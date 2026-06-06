"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Projects = () => {
  const projects = [
    {
      title: "Brew Mania",
      description: "Full CRM and booking automation system for a mock pop-up coffee bar. Includes lead capture, pipeline management, approval workflows, cancellation handling, Zapier feedback collection, and AI-powered monthly reporting.",
      image: "/brewmania.png",
      tech: ["GoHighLevel", "Zapier", "Jotform", "Gemini AI", "Google Sheets"],
      link: "#",
    },
    {
      title: "Brewtomation — Brew Academy",
      description: "Batch-based online barista coaching CRM. Features enrollment automation, payment verification, session tracking, no-show detection, graduation workflow, and alumni management.",
      image: "/brewacademy.png",
      tech: ["GoHighLevel", "Zapier", "Email Automation", "Pipeline Management"],
      link: "#",
    },
    {
      title: "Brewsmarinas — Coffee Rental",
      description: "Equipment rental CRM system for coffee gear. Handles rental requests, booking confirmation, equipment tracking, return management, damage assessment, and re-engagement automation.",
      image: "/brewsmarinas.png",
      tech: ["GoHighLevel", "Service Calendar", "Pipeline Management", "Email Automation"],
      link: "#",
    },
    {
      title: "SKU Request System",
      description: "A vibecoded SKU request management system for streamlined product tracking.",
      image: "/skuRequestSystem.jfif",
      tech: ["HTML", "CSS", "React", "Tailwind", "ShadCN", "Node.js"],
      link: "https://skusystem-wj8c.vercel.app/",
    },
    {
      title: "Capstone Booking System",
      description: "Booking system project with dynamic calendar for convenient scheduling.",
      image: "/snvhoa.jpg",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
      link: "#",
    },
  ];

  return (
    <div className="flex flex-col items-center text-white pt-4 pb-8 sm:pt-6 sm:pb-10">
      <h1 className="text-3xl sm:text-5xl font-bold shimmer-text text-center mb-8 sm:mb-12">
        PROJECTS
      </h1>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full"
      >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full py-12"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.title} className="!w-[280px] sm:!w-[350px] lg:!w-[400px]">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariant}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="block h-[460px] sm:h-[500px] cursor-pointer"
              >
                <motion.div 
                  className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden"
                  whileHover={{
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[45%] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="p-4 sm:p-5 h-[55%] flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm leading-relaxed line-clamp-5">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2 text-[10px] sm:text-xs">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="border border-white rounded-full px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="border border-white rounded-full px-2 py-1">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Projects;