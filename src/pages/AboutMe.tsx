"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.5 }
  },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { 
    opacity: 0,
    transition: {
      duration: 0.5,
      when: "afterChildren", // optional: wait for children to animate out, or just fade out together
    }
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUpStagger = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.5
    }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8
    } 
  },
};

const AboutMe = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // how much of the section needs to be visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // 👈 animate back when out of view
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col text-white px-6 py-12">
      {/* Title */}
      <motion.div
        className="flex flex-col items-center"
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
      >
        <h1 className="text-4xl sm:text-5xl font-bold shimmer-text">
          ABOUT ME
        </h1>
        <h2 className="text-sm sm:text-lg mt-2 text-center">
          Get to know more about me, and my coding journey
        </h2>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="w-full flex flex-col md:flex-row items-center justify-center mt-8 md:mt-12 gap-6 md:gap-12 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {/* Profile Side */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center"
          variants={fadeInUpStagger}
        >
          <motion.img
            src="/devPicture.png"
            alt="Profile"
            className="w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 object-cover rounded-full shadow-lg border-4 bg-zinc-700"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="mt-6 text-center text-sm sm:text-base space-y-1">
            <p className="font-semibold">Gerbinguio, 23</p>
            <p>Junior Front-End Web Developer</p>
            <p>San Pedro City, Laguna, Philippines</p>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          className="flex flex-col max-w-xl text-center md:text-left space-y-6"
          variants={fadeInUpStagger}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            I am a fresh graduate from the class of 2025 with a degree in
            Bachelor of Science in Information Technology. My coding journey
            began in college, where I built multiple websites and systems,
            including a data tracking system, a Point of Sale (POS) system, and
            a booking system for a village as my capstone project.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            During my internship, I worked as a Front-End Web Developer in a
            remote setup, where I learned new tech stacks and gained valuable
            experience in team collaboration using GitHub and Jira. I also
            leveraged AI tools to speed up development and problem-solving, as I
            believe AI is the future of software development.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            Outside of coding, I recharge by playing basketball, competing in
            Valorant, or taking peaceful rides on my motorcycle. I also enjoy
            exploring coffee shops, which gives me fresh perspectives and
            inspiration for life and coding.
          </p>

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-8"
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-lg sm:text-xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: "#52525b" }} // zinc-600
                transition={{ type: "spring", stiffness: 300 }}
              >
                2+
              </motion.div>
              <p className="mt-1 text-xs sm:text-sm">yrs academic coding</p>
            </div>
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-lg sm:text-xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: "#52525b" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                3+
              </motion.div>
              <p className="mt-1 text-xs sm:text-sm">projects finished</p>
            </div>
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-zinc-700 text-white font-bold text-lg sm:text-xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: "#52525b" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                10+
              </motion.div>
              <p className="mt-1 text-xs sm:text-sm">tech/tools learned</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
