import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Introduction = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed intro — always behind everything */}
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-0 overflow-hidden bg-white">
        {/* Soft decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-soft/70 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-blue/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 max-w-6xl w-full">
          {/* Picture Section - Left Side */}
          <div
            className="w-full md:w-1/2 flex justify-center md:justify-end animate-[slideInLeft_1s_ease-out]"
            style={{
              opacity: 1 - progress * 2,
              transform: `translateX(${-progress * 150}px) scale(${1 - progress * 0.2})`,
            }}
          >
            <img
              src="/gerbinpicture.jpg"
              alt="Gerbinguio"
              className="w-40 sm:w-72 md:w-96 lg:w-[450px] h-auto object-cover rounded-3xl shadow-[0_24px_60px_rgba(34,48,60,0.25)]"
            />
          </div>

          {/* Text Section - Right Side */}
          <div className="w-full md:w-1/2 space-y-3 sm:space-y-6 text-center md:text-left">
            <p
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-ink-500 font-semibold animate-[fadeInUp_1s_ease-out_0.2s_backwards]"
              style={{ opacity: 1 - progress * 2 }}
            >
              Hi, I'm Gerbinguio 👋
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-900 leading-[0.95] animate-[fadeInUp_1s_ease-out_0.3s_backwards]"
              style={{
                opacity: 1 - progress * 2,
                transform: `translateX(${progress * 150}px)`,
              }}
            >
              CRM &<br />
              <span className="text-blue-deep">AUTOMATION</span>
              <br />
              SPECIALIST
            </h1>

            <p
              className="text-xs sm:text-base md:text-lg max-w-xl leading-relaxed text-ink-700 mx-auto md:mx-0 animate-[fadeInUp_1s_ease-out_0.5s_backwards]"
              style={{
                opacity: 1 - progress * 2.5,
                transform: `translateX(${progress * 200}px)`,
              }}
            >
              I'm a CRM and Automation Specialist. I build systems in GoHighLevel
              and Zoho, with Zapier tying everything together. Lead capture,
              pipelines, email campaigns, AI reports — if a task keeps repeating
              itself, I'd rather build something that does it automatically.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-row justify-center md:justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 animate-[fadeInUp_1s_ease-out_0.7s_backwards]"
              style={{
                opacity: 1 - progress * 3,
                transform: `translateY(${progress * 80}px)`,
              }}
            >
              <Link
                to="/work/projects"
                className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-ink-900 text-sand-50 hover:bg-blue rounded-xl font-semibold transition-all transform hover:scale-105 text-center shadow-lg"
              >
                View My Work
              </Link>
              <Link
                to="/work/contact"
                className="px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-sand-50 rounded-xl font-semibold transition-all transform hover:scale-105 text-center"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ink-500 animate-float"
          style={{ opacity: 1 - progress * 4 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Scroll
          </span>
          <span className="block w-px h-8 bg-ink-500/50" />
        </div>
      </div>

      {/* Spacer — reserves intro's space so next section starts after one viewport */}
      <div className="h-screen" />
    </>
  );
};

export default Introduction;
