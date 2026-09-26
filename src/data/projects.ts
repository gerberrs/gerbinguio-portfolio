export type SlideLink = {
  label: string;
  url: string;
};

export type CaseStudySlide = {
  title: string;
  content: string;
  images?: string[];
  highlights?: string[];
  impact?: string;
  links?: SlideLink[];
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
    slug: "neya-clinic",
    title: "Full Business System — The Neya Clinic",
    shelfTitle: "The Neya Clinic",
    type: "Membership Program, Coaching Offer, Live Event, Online Course & Booking System",
    description:
      "An ongoing build for a UK aesthetics clinic and its owner's coaching brand, since August 2026. Five builds with one goal: taking manual, repetitive work off the owner's plate. A membership program with custom billing dates, a coaching offer checkout, a live event sequence, an online course, and a booking system migrated off Ovatu. Built on GoHighLevel, Stripe, and Cloudflare Workers.",
    image: "/neya-cover.jpg",
    tech: ["GoHighLevel", "Stripe API", "Cloudflare Workers", "JavaScript", "HTML Email", "Services v2", "Workflows", "NFC"],
    link: "https://theneyaclinic.co.uk",
    caseStudy: [
      {
        title: "The NEYA Inner Circle",
        content:
          "A three-tier membership program (Smooth Skin Society, Tox Club, Savings Club) with a custom sales page and checkout, moved off a MailerLite landing page. What makes it unique: members choose their own billing date (1st, 15th, or 25th), something neither GHL nor Stripe supports natively. I built it with a custom JavaScript Payday Selector and a Cloudflare Worker that talks to the Stripe API directly.",
        images: ["/neya-innercircle.jpg", "/neya-order.jpg"],
        highlights: [
          "Instant onboarding: every new member automatically gets the welcome email, WhatsApp group invite, T&Cs, and membership guide",
          "Billing dates lock themselves: a webhook sets each Stripe subscription to the member's chosen day, with no manual Stripe edits",
          "Failed payments trigger a Day 0, 3, and 7 recovery sequence that stops the moment the card is fixed; cancellations get a goodbye and a Day 30 win-back email",
          "Each member's NFC card portal link generates itself from a Stripe/GHL lookup, with no per-member setup",
          "The owner gets an instant alert on every join, payment issue, and cancellation",
        ],
        impact:
          "The owner never onboards a member, chases a declined card, or adjusts a subscription by hand. Members are billed on the day that suits their payday, which makes it easier to say yes and keep paying.",
        links: [
          { label: "Inner Circle sales page", url: "https://theneyaclinic.co.uk/inner-circle" },
        ],
      },
      {
        title: "The Revenue Sprint",
        content:
          "A founding-cohort coaching offer for the owner's coaching brand. I took over a broken funnel from a previous freelancer and rebuilt the checkout as a native GHL product (£97, with a £249 compare-at price), since GHL's Stripe import doesn't support one-time prices.",
        images: ["/neya-sprint-sales.jpg", "/neya-sprint.jpg"],
        highlights: [
          "Self-serve checkout with Klarna and Clearpay built in, so customers can pay in full or split the cost",
          "Limited-quantity setting caps the founding cohort automatically",
          "Recovered the funnel's domain after a sub-account split took it offline",
          "In progress: rebuilding the Discovery and Coach AI chatbots as they move off OpenAI custom GPTs into GHL",
        ],
        impact:
          "A broken sales funnel became a working checkout with no manual invoicing or payment plans. Once the chatbots are live, prospects will get instant answers instead of waiting for the owner to reply to every enquiry.",
        links: [
          { label: "Revenue Sprint sales page", url: "https://staceyellenaesthetics.co.uk/revenue-sprint" },
        ],
      },
      {
        title: "Confidence Day",
        content:
          "An in-person practitioner training day for the coaching brand, co-run with a partner brand and limited to 10 places at £249, with Clearpay and Klarna available. I built the event funnel, checked it live before launch, and designed the event's branding and colour palette.",
        images: ["/neya-confidence-day.jpg"],
        highlights: [
          "An 8-email sequence (welcome plus a full follow-up series) sent automatically to every attendee",
          "The Revenue Sprint offer is promoted automatically inside the event's email channels",
          "Clearpay and Klarna at checkout for the £249 ticket",
        ],
        impact:
          "Nothing had to be written or sent by hand around the event, and every attendee was introduced to the next paid offer without anyone copying and pasting between campaigns. The event ran on 20 Sept 2026.",
        links: [
          { label: "Confidence Day page", url: "https://staceyellenaesthetics.co.uk/confidence-day-page" },
        ],
      },
      {
        title: "The Membership Builder",
        content:
          "A £39 self-led course for salon, clinic, and aesthetics owners: a custom sales page and checkout, 7 core modules plus a bonus module, and lifetime access with no drip. The build is complete and launches once the course content is ready.",
        images: ["/neya-membership-builder.jpg"],
        highlights: [
          "Buying the course or the £9 Launch Plan order bump automatically tags the buyer and delivers the right material",
          "The Launch Plan is offered at checkout, on the thank-you page, in the welcome email, and inside the course, but only to people who haven't bought it",
          "A standalone checkout catches buyers who skipped the bump",
          "A CTA slot is reserved in the bonus module for a future done-for-you upsell",
        ],
        impact:
          "A product that sells and delivers itself: no manual sending of modules or materials, and every buyer sees the upsell at four natural points without any follow-up from the owner.",
        links: [
          { label: "Membership Builder sales page", url: "https://staceyellenaesthetics.co.uk/membership-builder" },
        ],
      },
      {
        title: "Booking Page",
        content:
          "Migrating the clinic's booking system off Ovatu, a closed platform with no API, webhooks, or bulk export. All 110 services across 13 categories were audited by hand and rebuilt natively in GHL across two practitioners, with a new booking page that has category browsing and multi-service booking.",
        images: ["/neya-booking.jpg"],
        highlights: [
          "A £50 deposit or full payment is taken automatically at booking on about 87 services, with Klarna and Clearpay",
          "Every booking triggers one of 13 workflows that email the exact consent form for that treatment (108 of 110 services)",
          "Automatic Botox rebooking reminders, with WhatsApp being added as a second channel",
          "Staff use a status flip (Unconfirmed to Confirmed) as a checkpoint for package and session redemptions",
        ],
        impact:
          "No more chasing deposits, manually emailing consent forms after each booking, or remembering to message clients when it's time to rebook. Consent forms went from fully manual and error-prone to exactly right every time.",
        links: [
          { label: "Booking page", url: "https://theneyaclinic.co.uk" },
        ],
      },
    ],
  },
  {
    slug: "lead-flow-ops",
    title: "Contract GHL Builder — Lead Flow Ops",
    shelfTitle: "Lead Flow Ops",
    type: "AI Voice Agent, Webhooks, Memberships, Checkouts & Custom Front-End",
    description:
      "Contract GoHighLevel builder for a GHL agency, taking over build work across 4 active clients and 5 sub-accounts: a roofing revenue recovery agency, a tax deed investing education company, a print shop and psychology membership site with the same owner, and a roof care product brand. The work spans AI, automation, integrations, memberships, payments, and custom front-end, often built on top of systems other people started.",
    image: "/lfo-cover.jpg",
    tech: ["GoHighLevel", "Voice AI", "AI Extract Data", "Inbound Webhooks", "Workflows", "Memberships", "Square", "HTML", "CSS", "JavaScript", "SEO", "Meta Pixel"],
    link: "#",
    caseStudy: [
      {
        title: "Revenue Restoration Group: AI Voice Agent",
        content:
          "A US agency that helps roofing companies recover lost revenue. I built an AI voice agent in GHL that answers the main line, qualifies callers, books roof inspections, live-transfers hot leads, and handles after-hours calls. What makes it unique: GHL's Voice AI can't write to dropdown fields, so I added an AI transcript-classification step that turns every call into clean, structured CRM data.",
        images: ["/lfo-rrg.jpg"],
        highlights: [
          "Every call's transcript is classified with AI Extract Data into standardized outcome fields for reporting and routing",
          "5 escalation workflows handle callbacks, urgent leads, failed transfers, errors, and opt-outs automatically",
          "When the agent can't answer from its knowledge base, a workflow creates a follow-up task for a human",
          "3 existing follow-up workflows (missed call, speed-to-lead, no-show) now have the AI call the lead first",
          "Shut down a live robocall campaign on the main line with spam protection and Number Intelligence, without blocking real callers",
        ],
        impact:
          "Every inbound call gets answered, qualified, and routed, day or night, and each one lands in the CRM as structured data instead of a raw transcript someone has to read.",
        links: [
          { label: "revenuerestorationgroup.com", url: "https://revenuerestorationgroup.com" },
        ],
      },
      {
        title: "Revenue Restoration Group: Integrations, Website & QA",
        content:
          "I connected two outside tools to GHL through inbound webhooks, then shipped a full revisions pass across the 8-page website and 5-page Revenue Leak Calculator funnel, with SEO, conversion tracking, and live QA.",
        images: ["/lfo-rrg-calculator.jpg"],
        highlights: [
          "An AI lead-sourcing tool now drops scored, tagged leads into the CRM through 4-branch routing (qualified, disqualified, needs review, none)",
          "A personalized-video tool writes each lead's video link back onto the right contact",
          "Fixed a stale field mapping, a dropdown that was silently rejecting values, and a trigger with no contact attached, then backfilled 30 affected leads",
          "A 4-email outreach sequence sends only Monday to Friday during business hours",
          "SEO and Open Graph on 9 pages (45 fields), plus Meta Pixel lead events on calculator completions and booked assessments",
        ],
        impact:
          "Leads from outside tools arrive complete and routed with no manual entry. My QA pass caught 3 live bugs before the client saw them, including a page still serving a placeholder case study and a page showing an internal phone number.",
        links: [
          { label: "Revenue Leak Calculator", url: "https://revenuerestorationgroup.com/funnel-calculator" },
        ],
      },
      {
        title: "The Tax Deed Collective: Membership Onboarding & Trials",
        content:
          "An online education company that teaches tax deed investing. New members were getting a pile of conflicting login and onboarding emails from inherited workflows. I traced every send, cleaned it up without breaking course access, and built out the tier system around it.",
        images: ["/lfo-tdc.jpg"],
        highlights: [
          "Traced 7 extra sends across 3 inherited workflows and paused them, keeping the one \"duplicate\" that was actually the password-setup link",
          "Per-tier welcome emails, so each membership level gets the right first message",
          "An automated tier trial system that grants access and ends trials on its own",
          "VIP purchase routing, workflow fixes, and a portal link migration",
          "A booking widget on the sales page so prospects can book a call directly",
        ],
        impact:
          "New members now get 3 clean emails per purchase instead of a pile of conflicting instructions, and trials run without anyone granting or revoking access by hand.",
        links: [
          { label: "Tax Deed 101 page", url: "https://course.thetaxdeedcollective.com/tdc-101" },
        ],
      },
      {
        title: "Gottfried Marketing + USPsychology: Ordering Wizard & Member Access",
        content:
          "Two brands with the same owner: a custom print and apparel shop and a psychology membership organization. What makes it unique: a custom HTML/JS ordering wizard that runs inside GHL and passes every choice into checkout through URL parameters.",
        images: ["/lfo-gottfried.jpg", "/lfo-uspsychology.jpg"],
        highlights: [
          "Customers order custom shirts in 3 guided steps with a live price, using real color catalogs from 9 supplier PDFs",
          "Every paid order arrives with the garment, color, and notes attached, with no back-and-forth to confirm details",
          "A combined checkout for shirts and magnets",
          "Fixed the member login on the membership site and a checkout that was mishandling free access codes",
        ],
        impact:
          "Custom orders went from a quote-and-email process to a self-serve flow that captures everything the shop needs to print, and members can get into what they paid for.",
        links: [
          { label: "gottfriedmarketing.com", url: "https://gottfriedmarketing.com" },
          { label: "USPsychology membership", url: "https://uspsychology.com/membership" },
        ],
      },
      {
        title: "Roof Sauce: Dealer Program & Dealer Hub",
        content:
          "A roof rejuvenation product brand. I built a paid solar dealer program with a custom sales page matched to the existing site, a recurring Square checkout tied to a members-only area, and a password-gated hub where dealers download their resources.",
        images: ["/lfo-roofsauce.jpg", "/lfo-roofsauce-dealer.jpg"],
        highlights: [
          "A subscription checkout on Square that grants access to the dealer area automatically",
          "A password-gated Dealer Hub with one-click resource downloads",
          "Fixed two platform bugs along the way: ignored noindex tags and blocked cross-domain downloads",
          "Website work across the brand: mobile navigation, SEO, blog, footer, Terms, pricing, and the dealer page",
        ],
        impact:
          "The brand gets a recurring-revenue dealer program ready to launch, and dealers already have a self-serve home for their resources, with no one emailing files to each new dealer.",
        links: [
          { label: "roofsauce.com", url: "https://roofsauce.com" },
          { label: "Dealer program", url: "https://roofsauce.com/roof-rejuvenation-dealer-program" },
        ],
      },
    ],
  },
  {
    slug: "zoho-crm-setup",
    title: "Zoho CRM & Automation Setup",
    shelfTitle: "Zoho CRM",
    type: "CRM Setup, Booking System, Email Campaigns, Automation & Integration",
    description:
      "A full Zoho CRM and automation build for a WordPress-based AI advisory firm. Architected the CRM around a Lead Status flow, connected Zoho Bookings for call scheduling, and built branded email campaigns and workflow automations across the lead lifecycle. Also connected website forms to the CRM, debugging webhook integrations and field mappings so new leads flow in automatically.",
    image: "/1stZoho.jpg",
    tech: ["Zoho CRM", "Zoho Bookings", "Zoho Campaigns", "Zoho Flow", "WordPress"],
    link: "#",
    caseStudy: [
      {
        title: "Overview",
        content:
          "A complete Zoho CRM and automation build covering the full lead lifecycle — architecting the CRM around a Lead Status flow, connecting Zoho Bookings for call scheduling, building branded email campaigns, automating follow-ups and internal processes, and connecting website forms directly into the CRM so new inquiries become leads automatically.",
        images: ["/1stZoho.jpg"],
      },
      {
        title: "CRM Architecture — Lead Status Flow",
        content:
          "Designed the CRM around a Lead Status field rather than a Deals pipeline (New Lead → Booked Call → Call Completed → Won/Lost), since records stay as Leads throughout the sales process and only convert to Contacts/Accounts on a won deal. Built the workflow logic behind each stage transition, including automatic conversion on Won and a scheduled win-back sequence on Lost.",
        images: ["/2ndZoho.jpg"],
      },
      {
        title: "Call Scheduling — Zoho Bookings",
        content:
          "Connected Zoho Bookings to the CRM's Meetings module, then built a workflow rule so every booked call automatically updates the Lead's status, notifies the team, and creates a pre-call task — removing manual follow-up from the scheduling process.",
        images: ["/3rdZoho.jpg"],
      },
      {
        title: "Email Design — Zoho Campaigns",
        content:
          "Designed a full branded email system in Zoho Campaigns, including a weekly executive newsletter with custom HTML layout, refined through multiple rounds of client feedback. Also built a segment-and-workflow structure to keep the real subscriber list clean, since Zoho's native CRM sync can't be filtered at the source.",
        images: ["/4thZoho.jpg"],
      },
      {
        title: "Automation — Zoho Flow & Workflow Rules",
        content:
          "Built workflow rules for stage-based task creation, internal notifications, and welcome and win-back emails, plus a lead magnet flow that syncs a Google Form-based assessment tool into the CRM as a qualified lead, with automated result delivery once the report is ready.",
        images: ["/5thZoho.jpg"],
      },
      {
        title: "Website Integration — WordPress & Webhooks",
        content:
          "Connected multiple WordPress forms to the CRM so submissions create leads automatically with proper source attribution. Debugged real integration issues along the way — mismatched webhook URLs, malformed field mappings, and spam submissions — to get each form reliably feeding clean data into the CRM.",
        images: ["/6thZoho.jfif"],
      },
    ],
  },
  {
    slug: "content-growth-systems",
    title: "Content & Growth Systems",
    shelfTitle: "Content Systems",
    type: "Article Production, SEO / AEO / GEO, Newsletter Design, Visual Templates & Content Ops",
    description:
      "A content and marketing operations workstream for the same AI advisory firm, beyond the original CRM build. Built a research-to-publish article system with a 4-pass editing pipeline and strict sourcing standards, optimized each piece for both traditional search and AI answer engines, and designed the branded newsletter and article image templates that ship with every issue.",
    image: "/ainc-what-will-ai-drive.jpg",
    tech: ["Zoho Campaigns", "HTML Email", "SEO", "AEO / GEO", "Daybreaker", "AI Image Generation", "Fact-Checking", "Editorial Operations"],
    link: "https://ainavigatorcollective.com/articles/four-companies-four-different-ways-ai-hit-their-bottom-line/",
    caseStudy: [
      {
        title: "Article System — Research, Editing & Search Optimization",
        content:
          "Built a repeatable process for turning raw, verified company data (\"use cases\") into published articles: every piece starts with a defined topic (title, argument, and hook), and every statistic is checked against primary sources like press releases, earnings calls, and official case studies, with overstated claims flagged and corrected. Drafts go through a 4-pass pipeline (Draft → Tighten → Conservative fact and logic check → Client content review) under a locked house style matched to a real published reference article. Each piece also gets an SEO checklist (keywords, URL slug, meta title and description) and FAQ sections built from real user search behavior with Daybreaker, so it surfaces in AI answer engines as well as traditional search. An editorial tracker and calendar run the schedule across multiple newsletter issues.",
        images: ["/ainc-what-will-ai-drive.jpg"],
        links: [
          { label: "Four Companies, Four Different Ways AI Hit Their Bottom Line", url: "https://ainavigatorcollective.com/articles/four-companies-four-different-ways-ai-hit-their-bottom-line/" },
          { label: "IKEA's $1.4 Billion Chatbot Was Actually a Workforce Strategy", url: "https://ainavigatorcollective.com/articles/ikeas-1-4-billion-chatbot-was-actually-a-workforce-strategy/" },
          { label: "A Quick Ad Fix and a $500 Million Spinoff Aren't the Same Kind of AI Bet", url: "https://ainavigatorcollective.com/articles/a-quick-ad-fix-and-a-500-million-spinoff-arent-the-same-kind-of-ai-bet/" },
        ],
      },
      {
        title: "Newsletter Design — Zoho Campaigns",
        content:
          "Designed and built branded HTML newsletter templates from scratch in Zoho Campaigns, with an executive-level design system for layout, typography, and color. Added a recurring \"AI Opportunity Snapshot\" module and refined the templates through multiple rounds of client feedback across several issues, on top of the segment-and-workflow list structure from the CRM build.",
        images: ["/4thZoho.jpg"],
      },
      {
        title: "Featured Images — Branded AI Image Templates",
        content:
          "Designed a reusable branded template system for AI-generated article header images, with a consistent layout, brand colors that alternate issue to issue, and logo placement rules. Wrote a structured image-generation prompt for each article, matched to its core idea or claim, plus a process for catching and fixing mismatches between image copy and article content after revisions.",
        images: ["/ainc-ikea-workforce.jpg", "/ainc-ai-bets.jpg"],
      },
    ],
  },
  {
    slug: "brew-ghl-sub-accounts",
    title: "GHL Sub-Accounts — Brew Mania, Brewtomation & Brewsmarinas",
    shelfTitle: "Brew Series",
    type: "3 GHL Sub-Accounts: CRM, Funnels, Pipelines & Automation",
    description:
      "Three complete GoHighLevel sub-accounts for three mock coffee businesses: an event booking CRM for a pop-up coffee bar, a batch-based barista coaching program, and a coffee equipment rental system. Each one has its own funnel, pipeline, and workflows covering the whole customer journey, plus an AI monthly report built with Zapier and Gemini.",
    image: "/brew-series-cover.jpg",
    tech: ["GoHighLevel", "Zapier", "Jotform", "Gemini AI", "HTML Email Templates", "JavaScript", "Service Calendar", "Google Sheets", "Google Docs"],
    link: "#",
    caseStudy: [
      {
        title: "Brew Mania — Event Booking CRM",
        content:
          "A complete CRM and booking system for a mock pop-up coffee bar. The website and funnel route visitors into a booking inquiry form, and a 6-stage Event Booking Pipeline (New Inquiry, Contacted, Pending, Booked, Event Done, Cancelled) shows where every lead stands.",
        images: ["/bm-website.jpg", "/bm-pipeline.png"],
      },
      {
        title: "Brew Mania — Booking Workflows",
        content:
          "Each booking form submission creates the contact, adds it to the pipeline, and sends a confirmation email, then sends up to 3 reminders to book a meeting before marking the lead as declined. Once the admin approves a booking, the system sends a day-before reminder and a thank-you email on event day. Separate workflows handle cancellations and a 31-day re-engagement sequence for past clients.",
        images: ["/bm-workflow1.png", "/bm-workflow3.png"],
      },
      {
        title: "Brew Mania — Feedback & AI Monthly Report",
        content:
          "Two Zapier workflows connected to the GHL automation. The first logs every Jotform feedback and rating submission into Google Sheets. The second runs on the 1st of every month: it pulls the latest feedback, sends it to Gemini AI for summarization, and creates a formatted monthly report in Google Docs.",
        images: ["/bm-zapier.png", "/bm-wait-zapier.png"],
      },
      {
        title: "Brewtomation — Barista Coaching Program",
        content:
          "A batch-based online barista coaching system. Students enroll through a custom funnel, go through 3 coaching sessions, and graduate with a certificate, all tracked per batch. The pipeline follows each student from New Lead through Enrolled, each session, Graduate, and Alumni, with separate stages for lost leads, dropouts, and no-shows.",
        images: ["/brewacademy.png", "/brewto-pipeline.png"],
      },
      {
        title: "Brewtomation — Enrollment, Sessions & Custom Emails",
        content:
          "Enrollment waits for payment confirmation and sends reminders before closing unpaid leads. Once a student is enrolled, tag-driven workflows track each session, send progress emails, and handle graduation, feedback, and alumni tagging. The hand-coded HTML emails include a welcome email with enrollment details and a completion email that works as an in-email certificate.",
        images: ["/brewto-welcome.png", "/brewto-completion.png"],
      },
      {
        title: "Brewsmarinas — Equipment Rental CRM",
        content:
          "A coffee equipment rental CRM across three equipment tiers: Starter, Barista, and Full Café. An 11-stage pipeline covers the full rental lifecycle, from New Rental Request through Confirmed, Equipment Out, Returned, and Completed, with separate stages for cancellations, damage, and lost leads.",
        images: ["/brewsmarinas.png", "/brewsma-pipeline.png"],
      },
      {
        title: "Brewsmarinas — Rental Lifecycle Workflows",
        content:
          "When the admin approves a rental, the system detects the equipment set and books the matching service calendar, then sends reminders to both the customer and the team. The workflows then cover delivery, return timing, and completion, plus a damage-inspection path that alerts the team. Completed rentals get a ratings request and two re-booking emails 31 days apart. Staff are notified at every step.",
        images: ["/brewsmarinas1.png", "/brewsmarinas3.png"],
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
