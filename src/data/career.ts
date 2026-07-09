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
    slug: "ghl-assistant",
    title: "Freelance GoHighLevel Assistant",
    period: "Feb 2026 — Jun 2026",
    image: null,
    description:
      "Managed GoHighLevel subaccounts by creating effective email sequences and optimizing pipelines. Edited funnels to improve user experience and drive engagement. Built and maintained automated workflows using triggers, tags, pipeline stages, and email/SMS sequences to improve lead nurturing, customer follow-up, and operational efficiency.",
    tags: ["GoHighLevel", "Email Sequences", "Funnel Building", "Automation"],
  },
  {
    slug: "zoho-specialist",
    title: "CRM & Automation Specialist — Zoho",
    period: "2026 — Present",
    image: null,
    description:
      "A real client project. I moved their leads out of spreadsheets and into Zoho CRM, built branded emails in Zoho Campaigns, and set up automations with Zoho Flow and workflow rules. I also connected their WordPress site to the CRM through webhooks and API calls, so every form submission turns into a lead on its own.",
    tags: ["Zoho CRM", "Zoho Campaigns", "Zoho Flow", "API & Webhooks", "WordPress"],
  },
  {
    slug: "ghl-specialist",
    title: "GHL & Automation Specialist",
    period: "2025 — Present",
    image: null,
    description:
      "This is where I found my lane. I built three complete GoHighLevel systems — Brew Mania, Brewtomation, and Brewsmarinas — covering bookings, a coaching program, and equipment rentals. Pipelines, workflows, email sequences, calendars, plus Zapier and Gemini AI for monthly reports that write themselves.",
    tags: ["GoHighLevel", "Zapier", "n8n", "AI Reporting"],
  },
  {
    slug: "junior-software-engineer",
    title: "Junior Software Engineer",
    period: "2025",
    image: "/barbizon.png",
    description:
      "Built an internal SKU request system that two companies still use, covering around 20–25 templates. You type in an SKU code, it looks it up in the database, and fills out the right template for you. It used to be a slow, manual process where mistakes slipped in all the time.",
    tags: ["React", "Node.js", "SQL", "Tailwind"],
  },
  {
    slug: "frontend-intern",
    title: "Front End Web Developer Intern",
    period: "2025",
    image: "/ojt.jfif",
    description:
      "My first taste of real dev work. I turned Figma designs into responsive UIs with React, TypeScript, and Tailwind, and learned how a team actually ships software — pull requests, Jira tickets, code reviews, all of it.",
    tags: ["React", "TypeScript", "Figma", "Jira"],
  },
  {
    slug: "service-crew",
    title: "Service Crew",
    period: "2022 — 2024",
    image: "/mcdo.png",
    description:
      "Two years on the service crew while studying full-time. Rush hour teaches you discipline, multitasking, and how to stay friendly when everything's on fire. Honestly, some of the best training I've ever had.",
    tags: ["Discipline", "Teamwork", "Customer Service"],
  },
];
