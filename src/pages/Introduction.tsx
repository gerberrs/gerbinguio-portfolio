import { useEffect, useState } from "react";

const Introduction = () => {
  const [progress, setProgress] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(
        Math.max(window.scrollY / window.innerHeight, 0),
        1
      );
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed intro — always behind everything */}
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center px-6 py-12 z-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full">
          {/* Picture Section - Left Side */}
          <div
            className="w-full md:w-1/2 flex justify-center md:justify-end animate-[slideInLeft_1s_ease-out]"
            style={{
              opacity: 1 - progress * 2,
              transform: `translateX(${-progress * 150}px) scale(${1 - progress * 0.2})`,
            }}
          >
            <img
              src={
                progress > 0.02
                  ? "/pixelated_gradpic_lookingdown.png"
                  : isHovered
                  ? "/pixelated_gradpic_wink.png"
                  : "/pixelated_gradpic.png"
              }
              alt="My Picture"
              className="w-72 sm:w-80 md:w-96 lg:w-[450px] h-auto object-cover shadow-2xl rounded-3xl transition-opacity duration-200"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>

          {/* Text Section - Right Side */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest leading-tight animate-[fadeInUp_1s_ease-out_0.3s_backwards]"
              style={{
                opacity: 1 - progress * 2,
                transform: `translateX(${progress * 150}px)`,
              }}
            >
              FRONT END<br />WEB DEVELOPER
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl max-w-xl leading-relaxed text-gray-300 mx-auto md:mx-0 font-light animate-[fadeInUp_1s_ease-out_0.5s_backwards]"
              style={{
                opacity: 1 - progress * 2.5,
                transform: `translateX(${progress * 200}px)`,
              }}
            >
              I'm a recent graduate pursuing a Front End Web Developer career,
              currently growing in my field and looking for opportunities where I
              can use and expand my skills.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 animate-[fadeInUp_1s_ease-out_0.7s_backwards]"
              style={{
                opacity: 1 - progress * 3,
                transform: `translateY(${progress * 80}px)`,
              }}
            >
              <a
                href="#projects"
                className="px-8 py-3 text-base md:text-lg bg-white text-black hover:bg-gray-200 rounded font-semibold transition-transform transform hover:scale-105 text-center shadow-lg"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 text-base md:text-lg border-2 border-white hover:bg-white hover:text-black rounded text-white font-semibold transition-transform transform hover:scale-105 text-center"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer — reserves intro's space so next section starts after one viewport */}
      <div className="h-screen" />
    </>
  );
};

export default Introduction;
