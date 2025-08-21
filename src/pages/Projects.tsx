const Projects = () => {
  return (
    <div className="flex flex-col items-center text-white p-6 sm:p-8">
      <h1 className="text-3xl sm:text-5xl font-bold shimmer-text text-center mb-12 sm:mb-16">
        PROJECTS
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 w-full justify-center">
        {[
          {
            title: "Internship Portfolio",
            description:
              "My internship portfolio project showcasing front-end work.",
            image: "/internPort.jfif",
            tech: [
              "HTML",
              "CSS",
              "TypeScript",
              "Tailwind",
              "ShadCN",
              "React.js",
            ],
            link: "https://your-first-portfolio-link.com",
          },
          {
            title: "Helply Web",
            description:
              "Main internship project with reusable components and API integration.",
            image: "/helply.jfif",
            tech: [
              "HTML",
              "CSS",
              "TypeScript",
              "Tailwind",
              "ShadCN",
              "React.js",
            ],
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
        ].map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-[48%] lg:w-[40%] max-w-[600px] h-[65vh] hover:scale-105 transform transition duration-300 cursor-pointer"
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
                  {project.link && (
                    <span className="mt-2 text-white font-semibold w-full text-xs sm:text-sm">
                      Deployed &nbsp;|&nbsp; Click to view
                    </span>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
