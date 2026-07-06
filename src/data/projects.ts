export type CaseStudySlide = {
  title: string;
  content: string;
  images?: string[];
};

export type Project = {
  slug: string;
  title: string;
  shelfTitle: string;
  type: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  caseStudy?: CaseStudySlide[];
};

export const projects: Project[] = [
  {
    slug: "zoho-crm-setup",
    title: "Zoho CRM & Automation Setup",
    shelfTitle: "Zoho CRM",
    type: "CRM Setup, Email Campaigns, Automation & Integration",
    description:
      "A full Zoho CRM and automation setup for a WordPress-based business. I moved their leads from spreadsheets into Zoho CRM, designed branded emails in Zoho Campaigns, built automations with Zoho Flow and workflow rules, and hooked the website forms straight into the CRM with webhooks — so new leads create themselves.",
    image: "/zoho-crm-cover.svg",
    tech: ["Zoho CRM", "Zoho Campaigns", "Zoho Flow", "Workflow Rules", "WordPress", "API & Webhooks"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "A complete Zoho CRM and automation setup covering the full lead lifecycle — getting existing leads into the CRM, nurturing them with branded email campaigns, automating follow-ups and internal processes, and wiring a WordPress website directly into the CRM so new inquiries become leads automatically.",
      },
      {
        title: "Lead Import — Sheets to Zoho CRM",
        content:
          "Migrated the client's existing lead database from spreadsheets into Zoho CRM. Cleaned and mapped the data to the right CRM fields, de-duplicated records, and organized leads so the client could immediately start working their pipeline from day one.",
      },
      {
        title: "Email Design — Zoho Campaigns",
        content:
          "Created clean, well-branded marketing and nurture emails in Zoho Campaigns — designed to look professional across devices and drive engagement, keeping the client's leads warm with consistent, on-brand communication.",
      },
      {
        title: "Automation — Zoho Flow & Workflow Rules",
        content:
          "Built automations on two levels: Zoho Flow for cross-app orchestration between services, and native CRM workflow rules for in-CRM triggers like field updates, notifications, and follow-up tasks — so routine actions happen automatically without manual work.",
      },
      {
        title: "Website Integration — WordPress API & Webhooks",
        content:
          "Connected the client's WordPress website to Zoho Flow using API calls and webhooks. When a visitor submits a form on the site, the webhook fires into Zoho Flow, which creates the lead in Zoho CRM instantly — no exports, no copy-paste, no missed inquiries.",
      },
      {
        title: "Tools Used",
        content:
          "Zoho CRM (lead management, workflow rules), Zoho Campaigns (branded email design), Zoho Flow (cross-app automation), WordPress (client website), API & Webhooks (website-to-CRM lead creation).",
      },
    ],
  },
  {
    slug: "brew-mania",
    title: "GHL Sub-Account — Brew Mania",
    shelfTitle: "Brew Mania",
    type: "CRM, Funnel, Website, Pipeline, & Automation",
    description:
      "A complete CRM and booking system for a mock pop-up coffee bar. Lead capture, pipelines, approval and cancellation workflows, feedback collection through Jotform and Zapier, and a monthly report that writes itself using Gemini AI and Google Docs.",
    image: "/brewmania.png",
    tech: ["GoHighLevel", "Zapier", "Jotform", "Gemini AI", "Google Sheets", "Google Docs"],
    link: "#",
    caseStudy: [
      {
        title: "Funnel",
        content:
          "The Brew Mania funnel captures event booking leads with a clean, conversion-focused layout. It presents the pop-up coffee bar offer and drives visitors to submit a booking inquiry form — the entry point into the full CRM automation.",
        images: ["/brewmania.png"],
      },
      {
        title: "Website",
        content:
          "The Brew Mania website serves as the main landing presence for the mock pop-up coffee bar business, showcasing services, social proof, and a clear call-to-action that routes visitors into the booking funnel.",
        images: ["/bm-website.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brew Mania Event Booking Pipeline tracks contacts across 6 stages: New Inquiry, Contacted, Pending, Booked, Event Done, and Cancelled — giving a clear view of where each lead stands in the booking lifecycle.",
        images: ["/bm-pipeline.png"],
      },
      {
        title: "New Booking Inquiry — Part 1",
        content:
          "When a booking form is submitted, the system creates the contact, adds them to the pipeline, sends a confirmation email, and waits for them to book a meeting. Once booked, a smart reminder loop fires — sending up to 3 attempts. No response after 3 attempts automatically marks them as declined.",
        images: ["/bm-workflow1.png", "/bm-workflow2.png"],
      },
      {
        title: "New Booking Inquiry — Part 2",
        content:
          "The admin manually tags the contact as approved or declined. If approved, a confirmation email is sent and the system waits for the event date — sending a day-before reminder then a thank you email on event day to close the lifecycle. If declined, a cancellation email goes out and the pipeline closes.",
        images: ["/bm-workflow3.png", "/bm-workflow4.png"],
      },
      {
        title: "Cancellation Workflow",
        content:
          "Triggered when a cancellation form is submitted. Sends an internal notification, then checks if the contact is already tagged as cancelled. If yes — updates the pipeline and emails the lead a confirmation. If no — waits 2 hours and loops back to recheck.",
        images: ["/bm-cancellation.png"],
      },
      {
        title: "Re-engagement Workflow",
        content:
          "Triggered when a contact receives the 'event-done' tag. Waits 31 days then sends a 'We Love to See You Again' email. Waits another 31 days and sends a second follow-up — keeping past clients warm for future bookings automatically.",
        images: ["/bm-wltsya.png"],
      },
      {
        title: "Has 'Meeting Booked' Tag Workflow",
        content:
          "A lightweight helper workflow triggered when a customer books an appointment and already has the 'contacted' tag. Its job is to add the 'Meeting Booked' tag — allowing the main workflow to branch correctly based on pre-meeting status.",
        images: ["/bm-has-booked.png"],
      },
      {
        title: "Feedback & Monthly Report Workflow",
        content:
          "These two Zapier workflows are connected to the Brew Mania GHL automation. The first workflow captures customer feedback — when a customer submits the Jotform feedback and rating form, Zapier picks it up and logs the response into Google Sheets. The second workflow runs on the 1st of every month — it pulls the latest feedback data from the sheet, sends it to Gemini AI for summarization, and automatically creates a formatted monthly report inside Google Docs.",
        images: ["/bm-zapier.png", "/bm-wait-zapier.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, email automation), Zapier (Jotform → Google Sheets bridge), Jotform (feedback forms), Gemini AI (monthly report generation), Google Sheets (response logging), Google Docs (formatted report output).",
      },
    ],
  },
  {
    slug: "brewtomation",
    title: "GHL Sub-Account — Brewtomation",
    shelfTitle: "Brew Academy",
    type: "CRM, Funnel, Pipeline, Custom Email Templates, & Automation",
    description:
      "A batch-based barista coaching CRM with hand-coded HTML emails for welcome, schedules, and certificates. It handles enrollment, payment checks, session tracking, no-shows, graduation, and alumni follow-ups — the whole student journey, automated.",
    image: "/brewacademy.png",
    tech: ["GoHighLevel", "Zapier", "HTML Email Templates", "JavaScript", "Pipeline Management"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "Brew Academy is a batch-based online barista coaching system built entirely in GoHighLevel. Students enroll through a custom funnel, go through 3 coaching sessions, and graduate with a certificate — all tracked and automated per batch.",
        images: ["/brewacademy.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brewtomation Barista Program Pipeline tracks students across 11 stages: New Lead, New Inquiry, Contacted, Enrolled, Session 1, Session 2, Session 3, Graduate, Alumni, Lost Lead, Dropped Out, and No Show — covering the full student journey from enrollment to graduation.",
        images: ["/brewto-pipeline.png"],
      },
      {
        title: "Email Templates",
        content:
          "Brew Academy uses custom-coded HTML email templates built with Inter font and a pastel green design. The welcome email confirms enrollment and displays key details like student name, date enrolled, program, and batch. The completion email serves as an in-email certificate of completion — displaying the student's full name, program, and completion date.",
        images: ["/brewto-welcome.png", "/brewto-completion.png"],
      },
      {
        title: "Form Submission & Payment Verification",
        content:
          "When the enrollment form is submitted, the system tags the lead, moves them to the new-inquiry pipeline, sends a confirmation email, payment instructions, and notifies the team. It then waits 3 days for payment confirmation. If paid, a welcome email goes out and the student is enrolled. If unpaid after follow-up, they're tagged as lost-lead and the opportunity closes. If no response yet, a final payment reminder fires and the system loops back to wait.",
        images: ["/brewto1.png", "/brewto2.png"],
      },
      {
        title: "Session Tracking & Graduation",
        content:
          "Once enrolled, the system waits for each session to be completed via tag. After Session 1, it sends a completion email and waits 7 days for Session 2. If both sessions are attended, a Session 2 done email fires and the system checks for Session 3. Once Session 3 is confirmed, a course completion email goes out, the student is tagged as graduate, and after 3 days receives a feedback request before being tagged as alumni.",
        images: ["/brewto3.png", "/brewto4.png"],
      },
      {
        title: "Session Counter & No-Show Workflows",
        content:
          "Three lightweight helper workflows handle session completion — one for each session. When staff tags the student as 1st, 2nd, or 3rd session done, the workflow adds the tag and updates the pipeline stage. The same logic applies across all three sessions. A separate no-show workflow triggers when the no-show tag is added — moving the student directly to the Dropped Out pipeline stage.",
        images: ["/brewto-sessioncount.png", "/brewto-noshow.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, email automation), HTML Email Templates (custom-coded dark green templates for welcome, schedule, reminders, no-show, and certificate), JavaScript (custom funnel button logic), Pipeline Management (enrollment, session, graduation, alumni stages).",
      },
    ],
  },
  {
    slug: "brewsmarinas",
    title: "GHL Sub-Account — Brewsmarinas",
    shelfTitle: "Brewsmarinas",
    type: "CRM, Funnel, Pipeline & Automation",
    description:
      "A rental CRM for coffee equipment. It covers the whole cycle — request, booking confirmation, equipment out, returns, damage checks — and even sends win-back emails to bring past customers back. Staff get notified at every step.",
    image: "/brewsmarinas.png",
    tech: ["GoHighLevel", "Service Calendar", "Pipeline Management", "Email Automation"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "Brewsmarinas is a coffee equipment rental CRM built in GoHighLevel. It manages the full rental lifecycle — from initial request to return and damage assessment — across three equipment tiers: Starter, Barista, and Full Café.",
        images: ["/brewsmarinas.png"],
      },
      {
        title: "Pipeline",
        content:
          "The Brewsmarinas Coffee Equipment Rental Pipeline tracks rentals across 11 stages: New Rental Request, Contacted, Pending Confirmation, Confirmed, Equipment Out, Pending Return, Returned, Completed, Cancelled, Damaged, and Lost Lead — covering the full rental lifecycle from request to completion.",
        images: ["/brewsma-pipeline.png"],
      },
      {
        title: "01 — New Rental Request & 02 — Booking Confirmed",
        content:
          "When a rental form is submitted, the system creates the contact, tags them as rental-inquiry, adds them to the pipeline, sends a confirmation email, and moves to Pending Confirmation. Once the admin tags the contact as approved-rental-a, b, or c, the system detects the equipment set, books the correct service calendar, moves to Confirmed, sends a confirmation email, then waits 1 day before the appointment to send reminders to both the customer and the team.",
        images: ["/brewsmarinas1.png", "/brewsmarinas2.png"],
      },
      {
        title: "03 — Equipment Out & 04 — Returned Equipment",
        content:
          "When the admin tags the contact as equipment-out on delivery day, the system moves the pipeline, sends a delivery confirmation, notifies the team, waits 12 hours, then sends a time-over email and coordinates the return with staff. Once the equipment is returned — on time or late — the pipeline moves to Returned, a return confirmation email goes to the customer, and the team gets an internal notification to close out the rental.",
        images: ["/brewsmarinas3.png", "/brewsmarinas4.png"],
      },
      {
        title: "05 — Completed Rental & 06 — Damaged Equipment",
        content:
          "When the completed tag is added, the pipeline moves to Completed and a rental completion email is sent to the customer. If damage is reported on return, a separate workflow triggers — moving the pipeline to Damaged, sending the customer an inspection email, and notifying the internal team to follow up on the damage assessment.",
        images: ["/brewsmarinas5.png", "/brewsmarinas6.png"],
      },
      {
        title: "07 — Re-arrangement Email",
        content:
          "Triggered when the pipeline stage changes to Completed. Sends a thank you and ratings request email, waits 31 days, then sends a re-booking email. Waits another 31 days and sends a second re-booking nudge — keeping past customers engaged for future rentals.",
        images: ["/brewsmarinas7.png"],
      },
      {
        title: "Tools Used",
        content:
          "GoHighLevel (CRM, pipelines, workflows, service calendar, email automation), Pipeline Management (7 custom stages), Email Automation (confirmation, reminder, return, damage, re-engagement sequences).",
      },
    ],
  },
  {
    slug: "zapier-enrollment",
    title: "Enrollment Automation — Zapier",
    shelfTitle: "Enrollment Bot",
    type: "Zapier Automation",
    description:
      "One form submission kicks off the whole chain: Jotform captures the lead, ClickFunnels enrolls them, ActiveCampaign tags them, and Gmail sends a personalized welcome. Nobody has to touch anything.",
    image: "/zapier-auto-enrollment-project.png",
    tech: ["Zapier", "Jotform", "ClickFunnels", "ActiveCampaign", "Gmail"],
    link: "#",
  },
  {
    slug: "ojt-summarizer",
    title: "OJT Report Summarizer",
    shelfTitle: "AI Summarizer",
    type: "Zapier + AI Automation",
    description:
      "Every time a new row lands in Google Sheets, Gemini AI summarizes it and drops a formatted report into Google Docs. I built it with Zapier to make my daily OJT reporting hands-free.",
    image: "/ojt-summarizer.png",
    tech: ["Zapier", "Gemini AI", "Google Sheets", "Google Docs"],
    link: "#",
  },
  {
    slug: "capstone-booking",
    title: "Capstone Booking System",
    shelfTitle: "Booking System",
    type: "Full-Stack Web Application",
    description:
      "My capstone project — a full booking system with a dynamic calendar. Users check availability, pick a time slot, and manage their bookings, all running on PHP and SQL with a Bootstrap frontend.",
    image: "/snvhoa.jpg",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
    link: "#",
  },
  {
    slug: "sku-request",
    title: "SKU Request System",
    shelfTitle: "SKU System",
    type: "AI-Assisted Web Application",
    description:
      "An SKU request system I built with AI-assisted development. React, ShadCN, and Tailwind on the front, Node.js and SQL behind it. This one's live — go click around.",
    image: "/skuRequestSystem.jfif",
    tech: ["HTML", "CSS", "React", "Tailwind", "ShadCN", "Node.js"],
    link: "https://skusystem-wj8c.vercel.app/",
  },
];
