export type CareerRole = {
  slug: string;
  title: string;
  period: string;
  image: string | null;
  description: string;
  tags: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: "zoho-specialist",
    title: "Zoho CRM & Automation Specialist (Freelance)",
    period: "Apr 2026 — Present",
    image: null,
    description:
      "Most of my work involved helping businesses organize their leads and automate repetitive tasks inside Zoho. I cleaned up and imported data from spreadsheets, built email campaigns, and connected WordPress forms directly to Zoho CRM using webhooks and APIs. I also set up workflows so leads were automatically assigned, followed up, and tracked without requiring manual work.",
    tags: ["Zoho CRM", "Zoho Flow", "Zoho Bookings", "Zoho Campaigns", "Email Campaigns", "API & Webhooks", "WordPress"],
  },
  {
    slug: "ghl-assistant",
    title: "GoHighLevel Automation Specialist (Freelance)",
    period: "Jun 2025 — Present",
    image: null,
    description:
      "I worked with clients to build and improve their GoHighLevel systems. This included creating lead nurturing sequences, appointment reminders, missed-call text back automations, and pipeline workflows. A big part of my work was troubleshooting broken automations and simplifying processes so clients spent less time doing manual follow-ups.",
    tags: ["GoHighLevel", "Custom Code Funnel", "Website", "Email Design", "Email Sequences", "Funnel Building", "Automation"],
  },
  {
    slug: "junior-software-engineer",
    title: "Junior Software Engineer",
    period: "Nov 2025 — Feb 2026",
    image: null,
    description:
      "I helped build an internal document generation system that automatically filled templates based on data stored in SQL databases. Instead of manually preparing documents one by one, users could enter a reference number and generate the correct file in seconds. Most of my work involved working with .NET, SQL, and maintaining existing features while adding new ones when needed.",
    tags: [".NET", "SQL"],
  },
  {
    slug: "frontend-intern",
    title: "Front End Web Developer Intern",
    period: "Feb 2025 — Jun 2025",
    image: null,
    description:
      "This was my first experience working on a real development team. I converted Figma designs into responsive web pages using React and TypeScript, fixed bugs, and helped implement new features. It was where I learned how software is actually built in a professional environment—from code reviews and Git workflows to collaborating with other developers.",
    tags: ["React", "TypeScript", "Figma", "Jira"],
  },
  {
    slug: "service-crew",
    title: "Service Crew",
    period: "Almost 3 Years",
    image: null,
    description:
      "I spent nearly three years working in a fast-paced restaurant environment while studying. The job taught me how to stay organized under pressure, work efficiently with a team, and handle customers during busy shifts. Looking back, it helped build the work ethic and discipline that I carried into my tech career.",
    tags: ["Discipline", "Teamwork", "Customer Service"],
  },
];