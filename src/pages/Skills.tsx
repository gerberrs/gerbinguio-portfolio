import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  return (
    <div className="min-h-screen p-6 overflow-hidden text-white">
      <h1 className="text-4xl sm:text-5xl font-bold shimmer-text text-center">
        TECHNICAL SKILLS
      </h1>

      {/* Panels stacked vertically on mobile, horizontally on md+ */}
      <div className="mt-12 flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-start">
        {/* Panel 1 */}
        <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Programming</CardTitle>
          </CardHeader>
          <CardContent>
            HTML, CSS, JavaScript, TypeScript, C++, C#, PHP
          </CardContent>
        </Card>

        {/* Panel 2 */}
        <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Frameworks</CardTitle>
          </CardHeader>
          <CardContent>Tailwind, React.js, Bootstrap</CardContent>
        </Card>

        {/* Panel 3 */}
        <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Tools & Technology</CardTitle>
          </CardHeader>
          <CardContent>
            GitHub, Jira, Microsoft Suite, Word, PowerPoint, Excel, Canva,
            VSCode
          </CardContent>
        </Card>

        {/* Panel 4 */}
        <Card className="w-full md:w-80 h-40 shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Database</CardTitle>
          </CardHeader>
          <CardContent>SQL</CardContent>
        </Card>
      </div>

      {/* Professional Skills */}
      <div className="mt-10 flex justify-center">
        <Card className="w-full sm:w-[500px] md:w-[650px] shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Professional Skills</CardTitle>
          </CardHeader>
          <CardContent>
            I’m strong in communication, teamwork, problem-solving, and adapting
            to new challenges. I stay professional in any situation and enjoy
            contributing to projects that succeed while keeping things organized
            and efficient.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
