import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  return (
    <div className="min-h-screen p-6 overflow-hidden text-white">
      <h1 className="text-4xl sm:text-5xl font-bold shimmer-text text-center">
        TECHNICAL SKILLS
      </h1>

      <div className="mt-12 text-sm">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full h-full flex flex-col md:flex-row gap-4"
        >
          {/* Panel 1 */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="w-full md:w-80 h-40 mx-auto shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
              <CardHeader>
                <CardTitle>Programming</CardTitle>
              </CardHeader>
              <CardContent>
                <p>HTML, CSS, JavaScript, TypeScript, C++, C#, PHP</p>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

          {/* Panel 2 */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="w-full md:w-80 h-40 mx-auto shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
              <CardHeader>
                <CardTitle>Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tailwind, React.js, Bootstrap</p>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

          {/* Panel 3 */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="w-full md:w-80 h-40 mx-auto shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
              <CardHeader>
                <CardTitle>Tools & Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  GitHub, Jira, Microsoft Suite, Word, PowerPoint, Excel, Canva,
                  VSCode
                </p>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

          {/* Panel 4 */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="w-full md:w-80 h-40 mx-auto shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
              <CardHeader>
                <CardTitle>Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p>SQL</p>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Professional Skills */}
      <div className="mt-10 flex justify-center">
        <Card className="w-full sm:w-[500px] md:w-[650px] shadow-lg rounded-2xl transform transition duration-300 hover:shadow-2xl hover:bg-white hover:text-black">
          <CardHeader>
            <CardTitle>Professional Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-sm sm:text-base">
              I’m strong in communication, teamwork, problem-solving, and
              adapting to new challenges. I stay professional in any situation
              and enjoy contributing to projects that succeed while keeping
              things organized and efficient.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Logos */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-6 w-full">
        {[
          "html-logo.png",
          "cssLogo.png",
          "jsLogo.png",
          "reactLogo.png",
          "tailwindLogo.png",
          "BootstrapLogo.png",
          "sqlLogo.png",
          "githubLogo.png",
          "vsCode.png",
        ].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={logo.split(".")[0]}
            className={`w-12 h-12 sm:w-16 sm:h-16 animate-float delay-${
              index * 100
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
