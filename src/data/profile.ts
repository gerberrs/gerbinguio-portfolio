/**
 * Personal details, contact channels, capabilities and bio — the single
 * source of truth for everything on the page that isn't a project or a role.
 */

export const profile = {
  name: "Gerbinguio Victorino",
  shortName: "Gerbinguio",
  role: "CRM & Automation Specialist",
  location: "San Pedro City, Laguna, Philippines",
  availability: "Open to freelance, collaborations, or full-time opportunities.",
  email: "gerbinguio@gmail.com",
  phone: { display: "+63 994 040 1002", href: "tel:+639940401002" },
  resume: "/Victorino-2026-CV.pdf",
  portrait: "/gerbinpicture.jpg",
  candid: "/devPicture.png",
};

export type ProfileLink = { label: string; href: string };

export const profileLinks: ProfileLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gerb-victorino-41a183366/" },
  { label: "GitHub", href: "https://github.com/gerberrs" },
  { label: "OnlineJobs", href: "https://www.onlinejobs.ph/jobseekers/info/4175877" },
  { label: "Facebook", href: "https://facebook.com/gerbinguio.victorino.3" },
];

export type CapabilityGroup = {
  title: string;
  /** Tools I use most — rendered with emphasis. */
  primary: string[];
  items: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    title: "CRM & Automation",
    primary: ["GoHighLevel", "Zoho CRM", "Zapier"],
    items: [
      "Zoho Campaigns",
      "Zoho Flow",
      "ActiveCampaign",
      "n8n",
      "Pipeline Management",
      "Email Sequences",
      "Funnel Building",
      "Website Building",
    ],
  },
  {
    title: "Development",
    primary: ["React.js", "TypeScript"],
    items: ["HTML", "CSS", "JavaScript", "Tailwind", "WordPress", "APIs & Webhooks"],
  },
  {
    title: "AI Tools",
    primary: ["Claude AI"],
    items: ["ChatGPT", "Gemini AI", "Claude Code", "Lovable"],
  },
  {
    title: "Forms & Data",
    primary: [],
    items: ["Jotform", "Google Sheets", "Google Docs", "GHL Forms"],
  },
  {
    title: "Tools",
    primary: [],
    items: [
      "GitHub",
      "Jira",
      "Notion",
      "Trello",
      "Canva",
      "VSCode",
      "ClickFunnels",
      "Word",
      "PowerPoint",
      "Excel",
      "Antigravity",
    ],
  },
];

export const about = [
  "I'm a CRM and Automation Specialist. Most of my day happens inside GoHighLevel, Zoho, and Zapier — building systems that handle the repetitive work so people don't have to. AI tools like Claude, ChatGPT, and Gemini are part of my daily workflow too. Not just for asking questions — they're baked into how I design and build.",
  "I graduated in 2025 with a BS in Information Technology. Before tech, I spent two years on the service crew at McDonald's while studying full-time. That job taught me more about discipline and staying calm under pressure than any classroom ever did.",
  "I started out as a front-end developer intern, then worked as a junior software engineer — and somewhere along the way I realized automation was the part I actually loved.",
];
