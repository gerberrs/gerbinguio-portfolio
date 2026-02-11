import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.5 }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7 }
  }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUpItem = {
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.4 }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 }
  }
};

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:px-12 sm:py-16">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold shimmer-text mb-16 text-center"
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
      >
        EDUCATION & SKILLS
      </motion.h1>

      <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 w-full max-w-7xl">
        {/* Left Column: Education Timeline */}
        <motion.div 
          className="flex-1 space-y-12"
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl font-bold text-center xl:text-left mb-8 border-b border-gray-700 pb-4">
            Education
          </h2>
          
          <motion.div 
            className="space-y-12 pl-4"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
            {/* Block 1 - Degree */}
            <motion.div className="border-l-4 border-white pl-6 space-y-2 relative" variants={fadeInUpItem}>
              <div className="absolute -left-[11px] top-0 w-4 h-4 rounded-full bg-white" />
              <h2 className="text-xl sm:text-2xl font-bold">
                Bachelor of Science in Information Technology
              </h2>
              <p className="text-gray-400 text-sm">
                Pamantasan ng Lungsod ng Muntinlupa • 2021 – 2025
              </p>
              <p className="text-sm sm:text-base">GWA: 1.65 / 5.0</p>
            </motion.div>

            {/* Block 2 - OJT */}
            <motion.div className="border-l-4 border-white pl-6 space-y-2 relative" variants={fadeInUpItem}>
              <div className="absolute -left-[11px] top-0 w-4 h-4 rounded-full bg-white" />
              <h2 className="text-xl sm:text-2xl font-bold">On-the-Job Training</h2>
              <p className="text-gray-400 text-sm">Helply Web Internship • 2023</p>
              <p className="text-sm sm:text-base leading-relaxed">
                Gained practical experience building reusable components,
                integrating APIs, and collaborating with a team using GitHub and
                Jira.
              </p>
            </motion.div>

            {/* Block 3 - Capstone */}
            <motion.div className="border-l-4 border-white pl-6 space-y-2 relative" variants={fadeInUpItem}>
              <div className="absolute -left-[11px] top-0 w-4 h-4 rounded-full bg-white" />
              <h2 className="text-xl sm:text-2xl font-bold">Capstone Project</h2>
              <p className="text-gray-400 text-sm">Booking System • 2024</p>
              <p className="text-sm sm:text-base leading-relaxed">
                Designed and developed a booking system with dynamic calendar
                functionality for convenient scheduling and user management.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: Skills */}
        <motion.div 
          className="flex-1 space-y-8"
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }} // Stagger whole column
        >
          <h2 className="text-3xl font-bold text-center xl:text-left mb-8 border-b border-gray-700 pb-4">
            Technical Skills
          </h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
             {/* Programming */}
            <motion.div variants={fadeInUpItem}>
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Programming</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  HTML, CSS, JavaScript, TypeScript, C++, C#, PHP
                </CardContent>
              </Card>
            </motion.div>

            {/* Frameworks */}
            <motion.div variants={fadeInUpItem}>
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Frameworks</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  Tailwind, React.js, Bootstrap
                </CardContent>
              </Card>
            </motion.div>

            {/* Tools */}
            <motion.div variants={fadeInUpItem} className="col-span-1 md:col-span-2">
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Tools & Technology</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  GitHub, Jira, Microsoft Suite, Word, PowerPoint, Excel, Canva,
                  VSCode
                </CardContent>
              </Card>
            </motion.div>

            {/* Database */}
            <motion.div variants={fadeInUpItem}>
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Database</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  SQL
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Professional */}
            <motion.div variants={fadeInUpItem} className="col-span-1 md:col-span-2">
              <Card className="bg-zinc-900 border-zinc-700">
               <CardHeader>
                <CardTitle className="text-white">Professional Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Strong in communication, teamwork, problem-solving, and
                adapting to new challenges.
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
