import { motion } from "framer-motion";

const Education = () => {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-16 sm:px-12">
      <h1 className="text-4xl sm:text-5xl font-bold shimmer-text mb-12">
        EDUCATION
      </h1>

      <div className="flex flex-col gap-12 max-w-3xl w-full">
        {/* Block 1 - Degree */}
        <motion.div
          className="border-l-4 border-white pl-6 space-y-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">
            Bachelor of Science in Information Technology
          </h2>
          <p className="text-gray-400 text-sm">
            Pamantasan ng Lungsod ng Muntinlupa • 2021 – 2025
          </p>
          <p className="text-sm sm:text-base">GWA: 1.65 / 5.0</p>
        </motion.div>

        {/* Block 2 - OJT */}
        <motion.div
          className="border-l-4 border-white pl-6 space-y-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">On-the-Job Training</h2>
          <p className="text-gray-400 text-sm">Helply Web Internship • 2023</p>
          <p className="text-sm sm:text-base leading-relaxed">
            Gained practical experience building reusable components,
            integrating APIs, and collaborating with a team using GitHub and
            Jira.
          </p>
        </motion.div>

        {/* Block 3 - Capstone */}
        <motion.div
          className="border-l-4 border-white pl-6 space-y-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold">Capstone Project</h2>
          <p className="text-gray-400 text-sm">Booking System • 2024</p>
          <p className="text-sm sm:text-base leading-relaxed">
            Designed and developed a booking system with dynamic calendar
            functionality for convenient scheduling and user management.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
