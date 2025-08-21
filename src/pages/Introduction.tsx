const Introduction = () => {
  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12"
      style={{ backgroundImage: "url('/bg-picture.jpg')" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            FRONT END WEB DEVELOPER
          </h1>
          <p className="text-base sm:text-lg max-w-lg leading-relaxed text-gray-200 mx-auto md:mx-0">
            I'm a recent graduate pursuing a Front End Web Developer career,
            currently growing in my field and looking for opportunities where I
            can use and expand my skills.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-transform transform hover:scale-105 text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black rounded-full text-white font-semibold transition-transform transform hover:scale-105 text-center"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Picture Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="/grad-pic.jfif"
            alt="My Picture"
            className="rounded-full w-48 sm:w-64 md:w-80 h-auto object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
