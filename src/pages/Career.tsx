import img1 from "/mcdo.jfif";
import img2 from "/ojt.jfif";

const Career = () => {
  return (
    <div className="flex flex-col justify-start items-start min-h-screen gap-y-16 p-6 sm:px-12">
      <h1 className="text-4xl sm:text-5xl font-bold shimmer-text text-center w-full">
        CAREER
      </h1>

      {/* Row 1 */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
        <div className="w-full md:w-60 h-64 md:h-72 bg-white shadow-md rounded-xl overflow-hidden">
          <img
            src={img1}
            alt="Career 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 max-w-xl text-center md:text-left space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">Service Crew</h2>
          <h2 className="text-sm sm:text-base font-bold">McDonald's</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            I worked at McDonald's for 2 years while studying. This helped me
            develop strong time management and discipline. I gained customer
            service skills and became more organized, flexible, and efficient at
            multitasking. I also built teamwork, communication, and leadership
            abilities during busy shifts.
          </p>
        </div>
        <div className="group w-full md:w-72 h-48 md:h-48 [perspective:1000px] mt-4 md:mt-0">
          <div
            className="relative w-full h-full 
                  [transform-style:preserve-3d] 
                  animate-flip 
                  group-hover:[animation-play-state:paused]"
          >
            <img
              src="/nameplate.png"
              alt="McDo Career"
              className="absolute inset-0 w-full h-full object-cover [backface-visibility:hidden]"
            />
            <img
              src="/nameplate.png"
              alt="McDo Career Back"
              className="absolute inset-0 w-full h-full object-cover [transform:rotateY(180deg)] [backface-visibility:hidden]"
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12 w-full">
        <div className="w-full md:w-60 h-64 md:h-72 bg-white shadow-md rounded-xl overflow-hidden">
          <img
            src={img2}
            alt="Career 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 max-w-xl text-center md:text-left space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            Front End Web Developer Intern
          </h2>
          <h2 className="text-sm sm:text-base font-bold">
            Monad Solutions Inc.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            During my internship, I gained hands-on experience building
            real-world applications. I turned Figma designs into responsive UIs
            using HTML, CSS, TypeScript, React, and Tailwind CSS. We
            collaborated using GitHub and Jira, and I worked daily in VS Code.
            This internship gave me valuable technical knowledge and
            professional experience in a team-oriented setting.
          </p>
        </div>
        <div className="group w-full md:w-72 h-48 md:h-48 [perspective:1000px] mt-4 md:mt-0">
          <div
            className="relative w-full h-full 
                  [transform-style:preserve-3d] 
                  animate-flip 
                  group-hover:[animation-play-state:paused]"
          >
            <img
              src="/coc.jfif"
              alt="Intern Career"
              className="absolute inset-0 w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
            />
            <img
              src="/coc.jfif"
              alt="Intern Career Back"
              className="absolute inset-0 w-full h-full object-cover rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
