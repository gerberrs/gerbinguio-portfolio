"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // delay between each card
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
      title: "Internship Portfolio",
      description: "My internship portfolio project showcasing front-end work.",
      image: "/internPort.jfif",
      tech: ["HTML", "CSS", "TypeScript", "Tailwind", "ShadCN", "React.js"],
      link: "https://gerb-portfolio.vercel.app/",
    },
    {
      title: "Helply Web",
      description:
        "Main internship project with reusable components and API integration.",
      image: "/helply.jfif",
      tech: ["HTML", "CSS", "TypeScript", "Tailwind", "ShadCN", "React.js"],
      link: "#",
    },
    {
      title: "Dangal Masonic Lodge No. 62",
      description:
        "A website portfolio of the masonry of Dangal Masonic Lodge 62.",
      image: "/dangal_masonic_62.jfif",
      tech: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Tailwind"],
      link: "https://dangal-masonic-no-62.vercel.app/",
    },
    {
      title: "Capstone Booking System",
      description:
        "Booking system project with dynamic calendar for convenient scheduling.",
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
            <SwiperSlide key={project.title} className="!w-[300px] sm:!w-[350px] lg:!w-[400px]">
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
                className="block h-[450px] cursor-pointer"
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
                    className="w-full h-3/5 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="p-4 sm:p-6 h-2/5 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1 sm:mb-2 truncate">
                        {project.title}
                      </h2>
                      <p className="text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2 text-xs">
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
