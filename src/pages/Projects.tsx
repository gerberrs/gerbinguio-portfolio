const Projects = () => {
  return (
    <div className="h-screen flex flex-col items-center text-white p-6 overflow-x-auto">
      <h1 className="text-5xl font-bold shimmer-text text-center mb-16">
        PROJECTS
      </h1>

      <div className="flex flex-row gap-8 max-w-full w-full justify-center px-6">
        <a
          href="https://your-first-portfolio-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[30%] h-[70vh] hover:scale-105 transform transition duration-300 cursor-pointer"
        >
          <div className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden">
            <img
              src="/internPort.jfif"
              alt="Internship Portfolio Project"
              className="w-full h-3/5 object-cover"
            />
            <div className="p-6 h-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Internship Portfolio
                </h2>
                <p className="text-base leading-relaxed">
                  My internship portfolio project showcasing front-end work.
                </p>
              </div>
              <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "TypeScript",
                  "Tailwind",
                  "ShadCN",
                  "React.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="border border-white rounded-full px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
                <span className="mt-2 text-white font-semibold w-full">
                  Deployed &nbsp;|&nbsp; Click to view
                </span>
              </div>
            </div>
          </div>
        </a>

        <div className="w-[30%] h-[70vh] hover:scale-105 transform transition duration-300 cursor-pointer">
          <div className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden">
            <img
              src="/helply.jfif"
              alt="Helply Web"
              className="w-full h-3/5 object-cover"
            />
            <div className="p-6 h-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Helply Web</h2>
                <p className="text-base leading-relaxed">
                  Main internship project with reusable components and API
                  integration.
                </p>
              </div>
              <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "TypeScript",
                  "Tailwind",
                  "ShadCN",
                  "React.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="border border-white rounded-full px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] h-[70vh] hover:scale-105 transform transition duration-300 cursor-pointer">
          <div className="bg-zinc-950 text-white rounded-3xl shadow-2xl border-2 border-white h-full flex flex-col overflow-hidden">
            <img
              src="/snvhoa.jpg"
              alt="Booking System"
              className="w-full h-3/5 object-cover"
            />
            <div className="p-6 h-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Capstone Booking System
                </h2>
                <p className="text-base leading-relaxed">
                  Booking system project with dynamic calendar for convenient
                  scheduling.
                </p>
              </div>
              <div className="mt-2 border-t border-white pt-2 flex flex-wrap gap-2">
                {["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="border border-white rounded-full px-3 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
