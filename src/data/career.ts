export type CareerRole = {
  slug: string;
  title: string;
  /** Engagement type, e.g. "Freelance". */
  kind?: string;
  /** Employer, only where it's named in my own copy. */
  org?: string;
  period: string;
  description: string;
  tags: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: "ghl-agency-builder",
    title: "GoHighLevel Builder",
    kind: "Contract, agency",
    period: "Aug 2026 — Present",
    description:
      "I take over GoHighLevel build work for an agency across 4 active clients and 5 sub-accounts, often extending systems other builders started. I built an AI voice agent that answers, qualifies, books, and live-transfers calls day or night, with AI transcript classification so every call lands in the CRM as clean data. I also connect outside tools through inbound webhooks, clean up inherited onboarding workflows, build memberships and Square checkouts, write custom HTML/JS front-end inside GHL, and run SEO and QA passes before the client sees anything.",
    tags: ["GoHighLevel", "Voice AI", "AI Extract Data", "Inbound Webhooks", "Memberships", "Square", "HTML/CSS/JS", "SEO", "Meta Pixel"],
  },
  {
    slug: "zoho-specialist",
    title: "Zoho CRM & Automation Specialist + SEO Article Writer",
    kind: "Freelance",
    period: "Apr 2026 — Present",
    description:
      "For an AI advisory firm, I architected a Zoho CRM for 600+ leads around a Lead Status flow, connected Zoho Bookings so every booked call updates the lead and notifies the team, and connected WordPress forms to the CRM through webhooks so every inquiry becomes a tracked lead. Beyond the CRM, I write and edit SEO articles through a 4-pass editing pipeline that checks every statistic against primary sources, optimize each piece for Google and AI answer engines, and design the branded newsletter it ships in.",
    tags: ["Zoho CRM", "Zoho Flow", "Zoho Bookings", "Zoho Campaigns", "API & Webhooks", "WordPress", "SEO", "AEO / GEO"],
  },
  {
    slug: "ghl-specialist",
    title: "GoHighLevel Specialist",
    kind: "Freelance, direct client",
    period: "Jun 2025 — Present",
    description:
      "I build and run GoHighLevel systems for clients, from websites and funnels to full automation. My biggest ongoing project, since August 2026, is for a UK aesthetics clinic, where I built their membership site with Stripe subscriptions and custom billing dates, an NFC member portal on Cloudflare Workers, automated payment recovery and win-back sequences, consent form automation, and a full booking migration from Ovatu covering 110 services. I also handle domains and DNS, email design, course builds, and troubleshooting broken workflows, and I document every build so clients can maintain it themselves.",
    tags: ["GoHighLevel", "Stripe", "Cloudflare Workers", "Website + Funnel Building", "Automation", "Email Design", "Domain & DNS", "Course Builds", "Custom Code"],
  },
  {
    slug: "junior-software-engineer",
    title: "Junior Software Engineer",
    period: "Nov 2025 — Feb 2026",
    description:
      "I built an internal SKU Request System used across two companies with 20–25 combined templates. Users upload their list of requested product codes and pick a chain and company; the system looks up each product in the database, pulls its details, and auto-generates the correct template filled with their list. It replaced manual template preparation and data entry with a single upload-and-generate step.",
    tags: ["HTML", "CSS", "TypeScript", "shadcn/ui", "MySQL", "JSON"],
  },
  {
    slug: "frontend-intern",
    title: "Front End Web Developer",
    kind: "Internship",
    period: "Feb 2025 — Jun 2025",
    description:
      "This was my first experience working on a real development team. I converted Figma designs into responsive web pages using React and TypeScript, fixed bugs, and helped implement new features. It was where I learned how software is actually built in a professional environment—from code reviews and Git workflows to collaborating with other developers.",
    tags: ["React", "TypeScript", "Figma", "Jira"],
  },
  {
    slug: "service-crew",
    title: "Service Crew",
    org: "McDonald's",
    period: "Almost 3 Years",
    description:
      "I spent nearly three years working in a fast-paced restaurant environment while studying. The job taught me how to stay organized under pressure, work efficiently with a team, and handle customers during busy shifts. Looking back, it helped build the work ethic and discipline that I carried into my tech career.",
    tags: ["Discipline", "Teamwork", "Customer Service"],
  },
];
export const education = {
  degree: "Bachelor of Science in Information Technology",
  year: "Class of 2025",
};
