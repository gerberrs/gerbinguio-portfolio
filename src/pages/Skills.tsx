"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const boxVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const contentVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
};

const Skills = () => {
  return (
    <div className="min-h-screen p-6 overflow-hidden text-white">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold shimmer-text text-center"
        variants={boxVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        TECHNICAL SKILLS
      </motion.h1>

      {/* Panels */}
      <div className="mt-12 flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-start">
        {/* Panel 1 */}
        <motion.div
          variants={boxVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl">
            <CardHeader>
              <motion.div variants={contentVariant}>
                <CardTitle>Programming</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={contentVariant}>
                HTML, CSS, JavaScript, TypeScript, C++, C#, PHP
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panel 2 */}
        <motion.div
          variants={boxVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl">
            <CardHeader>
              <motion.div variants={contentVariant}>
                <CardTitle>Frameworks</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={contentVariant}>
                Tailwind, React.js, Bootstrap
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panel 3 */}
        <motion.div
          variants={boxVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl">
            <CardHeader>
              <motion.div variants={contentVariant}>
                <CardTitle>Tools & Technology</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={contentVariant}>
                GitHub, Jira, Microsoft Suite, Word, PowerPoint, Excel, Canva,
                VSCode
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Panel 4 */}
        <motion.div
          variants={boxVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl">
            <CardHeader>
              <motion.div variants={contentVariant}>
                <CardTitle>Database</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div variants={contentVariant}>SQL</motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Professional Skills */}
      <motion.div
        className="mt-10 flex justify-center"
        variants={boxVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Card className="w-full sm:w-[500px] md:w-[650px] shadow-lg rounded-2xl">
          <CardHeader>
            <motion.div variants={contentVariant}>
              <CardTitle>Professional Skills</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div variants={contentVariant}>
              I’m strong in communication, teamwork, problem-solving, and
              adapting to new challenges. I stay professional in any situation
              and enjoy contributing to projects that succeed while keeping
              things organized and efficient.
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Skills;
