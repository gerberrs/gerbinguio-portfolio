"use client";

import { motion } from "framer-motion";

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
        className="flex flex-col sm:flex-row flex-wrap gap-8 w-full justify-center"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariant}
            className="w-full sm:w-[48%] lg:w-[30%] max-w-[600px] h-[65vh] hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <div className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-3/5 object-cover"
              />
              <div className="p-4 sm:p-6 h-2/5 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white rounded-full px-2 sm:px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
