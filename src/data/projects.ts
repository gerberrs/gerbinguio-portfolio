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

/**
 * How much room a project gets on the page. The Work section composes
 * layouts from this (one featured, alternating rows, then a compact grid) —
 * change a tier here rather than reordering JSX.
 */
export type ProjectTier = "featured" | "selected" | "compact";

export type Project = {
  slug: string;
  /** Display name used in headings on the page. */
  name: string;
  /** Full title, used in the case-study dialog. */
  title: string;
  tier: ProjectTier;
  type: string;
  description: string;
  image: string;
  /** Visuals for the on-page composition (falls back to `image`). */
  gallery?: { src: string; alt: string }[];
  /** My role on the project, as stated in my career history. */
  role?: string;
  /** Client / setting, as described in the project copy. */
  context?: string;
  period?: string;
  /** A short ordered sequence (lead stages, a Zap chain…) shown as a flow. */
  flow?: { label: string; steps: string[] };
  tech: string[];
  link?: string;
  caseStudy?: CaseStudySlide[];
};

export const projects: Project[] = [
  {
    slug: "neya-clinic",
    name: "The Neya Clinic",
    title: "Full Business System — The Neya Clinic",
    tier: "featured",
    role: "Freelance GoHighLevel specialist",
    context: "UK aesthetics clinic & its owner's coaching brand",
    period: "Aug 2026 — ongoing",
    gallery: [{ src: "/img/neya-innercircle.webp", alt: "The NEYA Inner Circle membership sales page" }],
    type: "Membership Program, Coaching Offer, Live Event, Online Course & Booking System",
    description:
      "An ongoing build for a UK aesthetics clinic and its owner's coaching brand, since August 2026. Eight builds with one goal: taking manual, repetitive work off the owner's plate. A membership program with custom billing dates, a coaching offer checkout, a live event sequence, an online course, a booking system migrated off Ovatu, AI coaching chatbots, WhatsApp automation, and a new clinic website set up for Google and AI search. Built on GoHighLevel, Stripe, and Cloudflare Workers.",
    image: "/img/neya-cover.webp",
    tech: ["GoHighLevel", "Stripe API", "Cloudflare Workers", "JavaScript", "HTML Email", "Services v2", "Workflows", "NFC", "Claude API", "WhatsApp Business", "Google Apps Script", "Schema / SEO", "GEO"],
    link: "https://theneyaclinic.co.uk",
    caseStudy: [
      {
        title: "The NEYA Inner Circle",
        content:
          "A three-tier membership program (Smooth Skin Society, Tox Club, Savings Club) with a custom sales page and checkout, moved off a MailerLite landing page. What makes it unique: members choose their own billing date (1st, 15th, or 25th), something neither GHL nor Stripe supports natively. I built it with a custom JavaScript Payday Selector and a Cloudflare Worker that talks to the Stripe API directly.",
        images: ["/img/neya-innercircle.webp", "/img/neya-order.webp"],
        highlights: [
          "Instant onboarding: every new member automatically gets the welcome email, WhatsApp group invite, T&Cs, and membership guide",
          "Billing dates lock themselves: a webhook sets each Stripe subscription to the member's chosen day, with no manual Stripe edits",
          "Failed payments trigger a Day 0, 3, and 7 recovery sequence that stops the moment the card is fixed; cancellations get a goodbye and a Day 30 win-back email",
          "Each member's NFC card portal link generates itself from a Stripe/GHL lookup, with no per-member setup",
          "The owner gets an instant alert on every join, payment issue, and cancellation",
          "New members' portal links are logged automatically into the team's membership tracker (GHL webhook to Google Apps Script), so staff never copy links by hand",
        ],
        impact:
          "The owner never onboards a member, chases a declined card, or adjusts a subscription by hand. Members are billed on the day that suits their payday, which makes it easier to say yes and keep paying.",
        links: [
          { label: "Inner Circle sales page", url: "https://theneyaclinic.co.uk/inner-circle" },
        ],
      },
      {
        title: "Coaching Offers: The Revenue Sprint & The Messy Middle",
        content:
          "A founding-cohort coaching offer for the owner's coaching brand. I took over a broken funnel from a previous freelancer and rebuilt the checkout as a native GHL product (£97, with a £249 compare-at price), since GHL's Stripe import doesn't support one-time prices. The same funnel setup was later reused for The Messy Middle: Black Friday Edition, a £19.99 one-week challenge with a WhatsApp group and an AI business bot, a 4-email buyer sequence and abandoned checkout recovery.",
        images: ["/img/neya-sprint-sales.webp", "/img/neya-sprint.webp"],
        highlights: [
          "Self-serve checkout with Klarna and Clearpay built in, so customers can pay in full or split the cost",
          "Limited-quantity setting caps the founding cohort automatically",
          "Recovered the funnel's domain after a sub-account split took it offline",
          "Buyers get instant access to a Claude-powered Sprint Coach bot, linked straight from their emails (see AI Coaching Bots)",
        ],
        impact:
          "A broken sales funnel became a working checkout with no manual invoicing or payment plans. Buyers get instant answers from the Sprint Coach bot instead of waiting for the owner to reply to every question.",
        links: [
          { label: "Revenue Sprint sales page", url: "https://staceyellenaesthetics.co.uk/revenue-sprint" },
        ],
      },
      {
        title: "Confidence Day",
        content:
          "An in-person practitioner training day for the coaching brand, co-run with a partner brand and limited to 10 places at £249, with Clearpay and Klarna available. I built the event funnel, checked it live before launch, and designed the event's branding and colour palette.",
        images: ["/img/neya-confidence-day.webp"],
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
        images: ["/img/neya-membership-builder.webp"],
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
          "Migrated the clinic's booking system off Ovatu, a closed platform with no API, webhooks, or bulk export. All 110 services across 13 categories were audited by hand and rebuilt natively in GHL across two practitioners, with a new booking page that has category browsing and multi-service booking. Booking went live in GHL on 12 Oct 2026 and Ovatu was shut down.",
        images: ["/img/neya-booking.webp"],
        highlights: [
          "A £50 deposit or full payment is taken automatically at booking on about 87 services, with Klarna and Clearpay",
          "Every booking triggers one of 13 workflows that email the exact consent form for that treatment (108 of 110 services)",
          "Automatic Botox rebooking reminders by email and WhatsApp",
          "Each consent workflow has a guard so the same form never sends twice, plus a one-tag resend for staff",
          "Staff use a status flip (Unconfirmed to Confirmed) as a checkpoint for package and session redemptions",
        ],
        impact:
          "No more chasing deposits, manually emailing consent forms after each booking, or remembering to message clients when it's time to rebook. Consent forms went from fully manual and error-prone to exactly right every time.",
        links: [
          { label: "Booking page", url: "https://theneyaclinic.co.uk" },
        ],
      },
      {
        title: "WhatsApp Automation",
        content:
          "Connected the clinic's existing WhatsApp Business number to GHL without changing numbers, so the team keeps chatting from the same app while automations run alongside it. Before writing any message, I studied the owner's real client texts so every template sounds like her, not a brochure.",
        // TODO(screenshot): WhatsApp aftercare check-in message → images: ["/img/neya-whatsapp.webp"]
        highlights: [
          "A 48-hour aftercare check-in with tap-to-reply buttons: \"All good\" sends a Google review request, \"I have a question\" alerts the team",
          "Anti-wrinkle clients get a friendly rebooking nudge at 70 days, with a booking link",
          "A membership offer goes to recent clients two weeks after their visit",
          "Cancelled bookings get a follow-up, and STOP replies are handled automatically",
          "Meta-approved templates for utility and marketing messages, with opt-out lines on every marketing message",
        ],
        impact:
          "Aftercare, reviews and rebooking happen on their own in the owner's voice, on the channel her clients already use.",
      },
      {
        title: "AI Coaching Bots",
        content:
          "Two AI coaching chatbots for the owner's coaching brand: a Business Clarity bot for new leads and a Sprint Coach bot for paying buyers. The originals were OpenAI custom GPTs, which retire in December 2026. I rebuilt both on Claude, running on a Cloudflare Worker with custom chat pages on the brand's own site, so the owner owns the experience instead of renting it.",
        // TODO(screenshot): AI bot chat page → images: ["/img/neya-ai-bot.webp"]
        highlights: [
          "Access is controlled by GHL tags: free leads, course buyers and challenge buyers each get the right bot, with end dates for time-limited access",
          "Free leads opt in with name and email before chatting, so every conversation starts as a contact in GHL",
          "Chat history is saved per person, so returning users pick up where they left off",
          "Usage caps per audience keep AI costs predictable",
          "Buyer emails link straight to the bot, with no login or extra account",
          "Fixed a regional API block by pinning where the Worker runs",
        ],
        impact:
          "Leads and buyers get coaching answers any time of day without waiting on the owner, and the bots now live on the brand's own site instead of a third-party platform that was shutting them down.",
      },
      {
        title: "Clinic Website, SEO & GEO",
        content:
          "A new homepage for theneyaclinic.co.uk, built in GHL to match the Inner Circle membership site, then set up so Google and AI search tools can understand the clinic. A full multi-page site with a page per treatment is planned next.",
        // TODO(screenshot): new clinic homepage → images: ["/img/neya-website.webp"]
        highlights: [
          "Business schema (JSON-LD) with services, opening hours, address, booking link and areas served",
          "XML sitemap and llms.txt (a summary of the clinic for AI search tools), verified live",
          "Google Search Console verified and sitemap submitted",
          "Location in every title and profile, so the clinic isn't confused with a same-name clinic abroad",
          "A 12-page plan mapping each treatment page to the local searches it should win",
        ],
        impact:
          "The clinic has a professional front door on its own domain and the technical groundwork for showing up in Google and AI answers.",
        links: [
          { label: "theneyaclinic.co.uk", url: "https://theneyaclinic.co.uk" },
        ],
      },
    ],
  },
  {
    slug: "lead-flow-ops",
    name: "Lead Flow Ops",
    title: "Contract GHL Builder — Lead Flow Ops",
    tier: "selected",
    role: "Contract GoHighLevel builder",
    context: "GHL agency · 4 clients, 5 sub-accounts",
    gallery: [
      { src: "/img/lfo-rrg.webp", alt: "Revenue Restoration Group website" },
      { src: "/img/lfo-gottfried.webp", alt: "Gottfried Marketing custom ordering site" },
    ],
    type: "AI Voice Agent, Webhooks, Memberships, Checkouts & Custom Front-End",
    description:
      "Contract GoHighLevel builder for a GHL agency, taking over build work across 4 active clients and 5 sub-accounts: a roofing revenue recovery agency, a tax deed investing education company, a print shop and psychology membership site with the same owner, and a roof care product brand. The work spans AI, automation, integrations, memberships, payments, and custom front-end, often built on top of systems other people started. I also train and review the work of a junior builder on the team.",
    image: "/img/lfo-cover.webp",
    tech: ["GoHighLevel", "Voice AI", "AI Extract Data", "Inbound Webhooks", "Workflows", "Memberships", "Square", "HTML", "CSS", "JavaScript", "SEO", "Meta Pixel", "Cloudflare Workers", "Stripe API", "HeyGen", "Sendspark", "Social Planner", "AI Agents"],
    caseStudy: [
      {
        title: "Revenue Restoration Group: AI Voice Agent",
        content:
          "A US agency that helps roofing companies recover lost revenue. I built an AI voice agent in GHL that answers the main line, qualifies callers, books roof inspections, live-transfers hot leads, and handles after-hours calls. What makes it unique: GHL's Voice AI can't write to dropdown fields, so I added an AI transcript-classification step that turns every call into clean, structured CRM data.",
        images: ["/img/lfo-rrg.webp"],
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
        images: ["/img/lfo-rrg-calculator.webp"],
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
        title: "Revenue Restoration Group: Sales Demo & Lead Diagnostic",
        content:
          "Two tools the agency uses to sell and qualify: a live demo it runs on sales calls, and a diagnostic that scores every lead before the call.",
        // TODO(screenshot): demo pipeline or calculator results page → images: ["/img/lfo-rrg-demo.webp"]
        highlights: [
          "A live \"Proof Machine\" sales demo: a prospect calls a demo number and misses, an AI text agent replies, an AI voice agent calls back, the lead lands in a demo pipeline, and a cleanup step resets it for the next demo. It passed the client's live QA",
          "The Revenue Leak Calculator now runs a 13-question diagnostic that scores each lead as high, medium or low readiness",
          "The results page plays an AI avatar video (HeyGen) explaining the findings",
          "The sales rep's booking email includes an assessment brief built from the lead's answers",
          "45 social posts scheduled in GHL Social Planner, plus 6 comment-keyword workflows that reply and DM the calculator link on Facebook and Instagram",
        ],
        impact:
          "The agency can show prospects the system working live on a call, and every booked lead arrives already scored and summarized for the rep.",
      },
      {
        title: "The Tax Deed Collective: Ads Funnel, Membership Onboarding & Trials",
        content:
          "An online education company that teaches tax deed investing. New members were getting a pile of conflicting login and onboarding emails from inherited workflows. I traced every send, cleaned it up without breaking course access, and built out the tier system around it.",
        images: ["/img/lfo-tdc.webp"],
        highlights: [
          "Traced 7 extra sends across 3 inherited workflows and paused them, keeping the one \"duplicate\" that was actually the password-setup link",
          "Per-tier welcome emails, so each membership level gets the right first message",
          "An automated tier trial system that grants access and ends trials on its own",
          "VIP purchase routing, workflow fixes, and a portal link migration",
          "A booking widget on the sales page so prospects can book a call directly",
          "A new ads funnel: lead form to webhook to booking page, with automatic reminders for the sales rep's calls, a nurture for people who don't book, and a step that stops follow-ups once someone books",
          "A warm list reactivation campaign to 695 past contacts, with 21% and 25% open rates on the first two emails",
          "Bounce cleanup and list hygiene before every send",
        ],
        impact:
          "New members now get 3 clean emails per purchase instead of a pile of conflicting instructions, and trials run without anyone granting or revoking access by hand. Ad leads now go straight to a booked call with the sales rep.",
        links: [
          { label: "Tax Deed 101 page", url: "https://course.thetaxdeedcollective.com/tdc-101" },
        ],
      },
      {
        title: "Gottfried Marketing + USPsychology: Ordering Wizard & Member Access",
        content:
          "Two brands with the same owner: a custom print and apparel shop and a psychology membership organization. What makes it unique: a custom HTML/JS ordering wizard that runs inside GHL, shows a live total and sends the customer to a Stripe checkout for that exact amount through a Cloudflare Worker, since GHL forms can't take a calculated total.",
        images: ["/img/lfo-gottfried.webp", "/img/lfo-uspsychology.webp"],
        highlights: [
          "Customers order custom shirts in 3 guided steps with a live price, using real color catalogs from 9 supplier PDFs",
          "Every paid order arrives with the garment, color, and notes attached, with no back-and-forth to confirm details",
          "A combined checkout for shirts and magnets",
          "A Cloudflare Worker creates each Stripe Checkout session with the exact order total and the order details attached",
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
        images: ["/img/lfo-roofsauce.webp", "/img/lfo-roofsauce-dealer.webp"],
        highlights: [
          "A subscription checkout on Square that grants access to the dealer area automatically",
          "A password-gated Dealer Hub with one-click resource downloads",
          "Fixed two platform bugs along the way: ignored noindex tags and blocked cross-domain downloads",
          "Website work across the brand: mobile navigation, SEO, blog, footer, Terms, pricing, and the dealer page",
          "Facebook lead forms mapped into GHL, with an automatic follow-up email that sends dealers to the booking section",
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
    slug: "legendary-acquisition",
    name: "Legendary Acquisition",
    title: "Contract GHL Builder · Legendary Acquisition",
    tier: "selected",
    role: "GoHighLevel builder (funnels, tracking & automation)",
    context: "Paid acquisition agency · 4 client launches",
    period: "Sept 2026 to ongoing",
    type: "VSL Funnels, Meta Pixel Tracking, Booking Automations & A2P for Paid-Traffic Launches",
    description:
      "The ads side of the same agency group. Its clients run Meta ads to a VSL funnel that books sales calls. I build everything after the ad: the funnel, the tracking, the booking and every follow-up. I've launched clients in four niches: an Amazon PPC agency, a client success consultant, a restoration marketing agency and a contractor marketing agency.",
    // TODO(screenshot): card cover needed (blurred landing page). The file doesn't exist yet, so
    // the card shows an empty frame until it's added (full + -sm WebP, see CLAUDE.md).
    image: "/img/la-cover.webp",
    tech: ["GoHighLevel", "Snapshots", "Meta Pixel", "Conversion Tracking", "Calendly", "Wistia", "A2P 10DLC", "Workflows", "Inbound Webhooks", "HTML/CSS/JS"],
    caseStudy: [
      {
        title: "Launch System & Agency Snapshot",
        content:
          "Every new client is built from a reusable GHL snapshot I maintain: funnels, forms, calendars, legal pages and 8 workflows already wired together. The goal is speed: onboard, build and send one review request on day one.",
        // TODO(screenshot): workflow canvas → images: ["/img/la-workflows.webp"]
        highlights: [
          "8 snapshot workflows: pre-call value emails, pre-call SMS reminders, a 26-week nurture, no-show recovery, cancellation recovery, missed call text back, lead form intake and won onboarding",
          "Custom values fill in each client's business info, booking links and email copy in one place",
          "One booking calendar per client, so no-shows and cancels rebook through the same reminders",
          "A per-client launch checklist tracks every task from intake to launch",
        ],
        impact:
          "A new client's full system is built and ready for review in one pass instead of piece by piece over a week.",
      },
      {
        title: "VSL Funnels",
        content:
          "Each client gets a funnel matched to their brand: a VSL landing page, a short lead form before the calendar, booking, and an FAQ page with short videos that warm people up before the call.",
        // TODO(screenshot): blurred landing page → images: ["/img/la-landing.webp"]
        highlights: [
          "Landing pages with an autoplaying muted VSL, a large unmute button and a booking call-to-action",
          "Lead form first (name, email, phone), then booking, so leads are captured even if they don't pick a time",
          "Booking through a GHL calendar popup or an inline Calendly, depending on the client",
          "FAQ video pages (Wistia), privacy and terms pages, and custom domains",
          "Landing page copy matched to each client's ads, updated through the agency's review process",
        ],
        impact:
          "Every client launches with a complete, on-brand funnel that captures the lead before the booking step.",
      },
      {
        title: "Meta Pixel & Conversion Tracking",
        content:
          "The ads only work if the pixel reports the right things. I set up and verify the Meta Pixel events on every funnel, and rebuild tracking when the data looks wrong.",
        // TODO(screenshot): Events Manager or pixel requests view → images: ["/img/la-pixel.webp"]
        highlights: [
          "PageView, Lead and Schedule events placed on the right page and the right action for each funnel",
          "For one client, I rebuilt tracking so Schedule fires only when a booking is actually completed, read from the booking widget's completion message, plus a custom VSL Start event on the first real play of the video",
          "Found and removed the sources of fake conversions: Schedule firing on every FAQ page load, Lead firing on page load, and an old funnel still sending events",
          "Every change verified live by checking which pixel requests the page actually sends",
        ],
        impact:
          "The client's 10 ad sets optimize on real booked calls, not page loads, so ad spend goes toward people who actually book.",
      },
      {
        title: "Booking & Follow-Up Automations",
        content:
          "Everything after the booking runs on its own, from reminders to win-backs, with versions for both GHL calendars and Calendly.",
        highlights: [
          "SMS reminders when booked, 24 hours before, 2 hours before and 5 minutes before with the meeting link",
          "Pre-call value emails that adjust to when the call is (same day, next day or later)",
          "No-show and cancellation recovery that sends people back to rebook",
          "Calendly versions of the reminder and value email workflows, with cancel handling that stops reminders for cancelled calls",
          "Missed call text back and lead alerts to each client by email and text",
        ],
        impact: "More booked calls actually show up, and nobody has to chase a lead by hand.",
      },
      {
        title: "A2P Registration & SMS Compliance",
        content:
          "US texting needs A2P 10DLC registration. I handle it for each client so their reminders actually deliver.",
        highlights: [
          "Manual A2P registration with the client's legal business details, campaign description and sample messages",
          "Consent checkboxes on every booking form naming the legal business, optional so booking still works without opting in",
          "Privacy and terms pages with the required SMS language",
          "SMS workflows switched on and tested only after approval",
        ],
        impact:
          "Client text reminders are registered, compliant and delivering, instead of getting filtered by carriers.",
      },
      {
        title: "Agency Operations Automation",
        content: "Automations for the agency itself, not just its clients.",
        highlights: [
          "Each client's booking workflow sends a webhook to the agency's own account, which counts that client's booked calls for the month and texts the agency owner",
          "A monthly reset per client keeps the counts accurate",
          "Separated no-shows from real cancellations on the agency's calendars, so the owner's cancellation alerts only fire on real cancels",
        ],
        impact:
          "The agency owner sees each client's booked-call count in real time without opening a single sub-account.",
      },
    ],
  },
  {
    slug: "zoho-crm-setup",
    name: "Zoho CRM & Automation Setup",
    title: "Zoho CRM & Automation Setup",
    tier: "selected",
    role: "Freelance Zoho CRM & automation specialist",
    context: "WordPress-based AI advisory firm",
    gallery: [
      { src: "/img/1stZoho.webp", alt: "Zoho CRM analytics dashboard" },
      { src: "/img/2ndZoho.webp", alt: "Zoho CRM lead pipeline by Lead Status" },
    ],
    flow: { label: "Lead Status flow", steps: ["New Lead", "Booked Call", "Call Completed", "Won / Lost"] },
    type: "CRM Setup, Booking System, Email Campaigns, Automation & Integration",
    description:
      "A full Zoho CRM and automation build for a WordPress-based AI advisory firm. Architected the CRM around a Lead Status flow, connected Zoho Bookings for call scheduling, and built branded email campaigns and workflow automations across the lead lifecycle. Also connected website forms to the CRM, debugging webhook integrations and field mappings so new leads flow in automatically.",
    image: "/img/1stZoho.webp",
    tech: ["Zoho CRM", "Zoho Bookings", "Zoho Campaigns", "Zoho Flow", "WordPress"],
    caseStudy: [
      {
        title: "Overview",
        content:
          "A complete Zoho CRM and automation build covering the full lead lifecycle — architecting the CRM around a Lead Status flow, connecting Zoho Bookings for call scheduling, building branded email campaigns, automating follow-ups and internal processes, and connecting website forms directly into the CRM so new inquiries become leads automatically.",
        images: ["/img/1stZoho.webp"],
      },
      {
        title: "CRM Architecture — Lead Status Flow",
        content:
          "Designed the CRM around a Lead Status field rather than a Deals pipeline (New Lead → Booked Call → Call Completed → Won/Lost), since records stay as Leads throughout the sales process and only convert to Contacts/Accounts on a won deal. Built the workflow logic behind each stage transition, including automatic conversion on Won and a scheduled win-back sequence on Lost.",
        images: ["/img/2ndZoho.webp"],
      },
      {
        title: "Call Scheduling — Zoho Bookings",
        content:
          "Connected Zoho Bookings to the CRM's Meetings module, then built a workflow rule so every booked call automatically updates the Lead's status, notifies the team, and creates a pre-call task — removing manual follow-up from the scheduling process.",
        images: ["/img/3rdZoho.webp"],
      },
      {
        title: "Email Design — Zoho Campaigns",
        content:
          "Designed a full branded email system in Zoho Campaigns, including a weekly executive newsletter with custom HTML layout, refined through multiple rounds of client feedback. Also built a segment-and-workflow structure to keep the real subscriber list clean, since Zoho's native CRM sync can't be filtered at the source.",
        images: ["/img/4thZoho.webp"],
      },
      {
        title: "Automation — Zoho Flow & Workflow Rules",
        content:
          "Built workflow rules for stage-based task creation, internal notifications, and welcome and win-back emails, plus a lead magnet flow that syncs a Google Form-based assessment tool into the CRM as a qualified lead, with automated result delivery once the report is ready.",
        images: ["/img/5thZoho.webp"],
      },
      {
        title: "Website Integration — WordPress & Webhooks",
        content:
          "Connected multiple WordPress forms to the CRM so submissions create leads automatically with proper source attribution. Debugged real integration issues along the way — mismatched webhook URLs, malformed field mappings, and spam submissions — to get each form reliably feeding clean data into the CRM.",
        images: ["/img/6thZoho.webp"],
      },
    ],
  },
  {
    slug: "content-growth-systems",
    name: "Content & Growth Systems",
    title: "Content & Growth Systems",
    tier: "selected",
    context: "Same AI advisory firm, beyond the CRM build",
    gallery: [
      { src: "/img/ainc-what-will-ai-drive.webp", alt: "Branded article header image" },
      { src: "/img/ainc-ikea-workforce.webp", alt: "Article header image for the IKEA chatbot piece" },
    ],
    flow: { label: "4-pass editing pipeline", steps: ["Draft", "Tighten", "Fact & logic check", "Client review"] },
    type: "Article Production, SEO / AEO / GEO, Newsletter Design, Visual Templates & Content Ops",
    description:
      "A content and marketing operations workstream for the same AI advisory firm, beyond the original CRM build. Built a research-to-publish article system with a 4-pass editing pipeline and strict sourcing standards, optimized each piece for both traditional search and AI answer engines, and designed the branded newsletter and article image templates that ship with every issue.",
    image: "/img/ainc-what-will-ai-drive.webp",
    tech: ["Zoho Campaigns", "HTML Email", "SEO", "AEO / GEO", "Daybreaker", "AI Image Generation", "Fact-Checking", "Editorial Operations"],
    link: "https://ainavigatorcollective.com/articles/four-companies-four-different-ways-ai-hit-their-bottom-line/",
    caseStudy: [
      {
        title: "Article System — Research, Editing & Search Optimization",
        content:
          "Built a repeatable process for turning raw, verified company data (\"use cases\") into published articles: every piece starts with a defined topic (title, argument, and hook), and every statistic is checked against primary sources like press releases, earnings calls, and official case studies, with overstated claims flagged and corrected. Drafts go through a 4-pass pipeline (Draft → Tighten → Conservative fact and logic check → Client content review) under a locked house style matched to a real published reference article. Each piece also gets an SEO checklist (keywords, URL slug, meta title and description) and FAQ sections built from real user search behavior with Daybreaker, so it surfaces in AI answer engines as well as traditional search. An editorial tracker and calendar run the schedule across multiple newsletter issues.",
        images: ["/img/ainc-what-will-ai-drive.webp"],
        links: [
          { label: "Four Companies, Four Different Ways AI Hit Their Bottom Line", url: "https://ainavigatorcollective.com/articles/four-companies-four-different-ways-ai-hit-their-bottom-line/" },
          { label: "How an IKEA Chatbot Became a $1.4B Sales Empire", url: "https://ainavigatorcollective.com/articles/how-anikea-chatbot-became-a-14b-sales-empire/" },
          { label: "How 7 Companies Are Winning With AI", url: "https://ainavigatorcollective.com/articles/how-7-companies-are-winning-with-ai/" },
          { label: "Who Owns Your AI Results?", url: "https://ainavigatorcollective.com/articles/who-owns-your-ai-results/" },
        ],
      },
      {
        title: "Newsletter Design — Zoho Campaigns",
        content:
          "Designed and built branded HTML newsletter templates from scratch in Zoho Campaigns, with an executive-level design system for layout, typography, and color. Added a recurring \"AI Opportunity Snapshot\" module and refined the templates through multiple rounds of client feedback across several issues, on top of the segment-and-workflow list structure from the CRM build.",
        images: ["/img/4thZoho.webp"],
      },
      {
        title: "Featured Images — Branded AI Image Templates",
        content:
          "Designed a reusable branded template system for AI-generated article header images, with a consistent layout, brand colors that alternate issue to issue, and logo placement rules. Wrote a structured image-generation prompt for each article, matched to its core idea or claim, plus a process for catching and fixing mismatches between image copy and article content after revisions.",
        images: ["/img/ainc-ikea-workforce.webp", "/img/ainc-ai-bets.webp"],
      },
    ],
  },
  {
    slug: "brew-ghl-sub-accounts",
    name: "Brew Mania, Brewtomation & Brewsmarinas",
    title: "GHL Sub-Accounts — Brew Mania, Brewtomation & Brewsmarinas",
    tier: "selected",
    context: "Three mock coffee businesses",
    gallery: [
      { src: "/img/brewmania-cover.webp", alt: "Brew Mania" },
      { src: "/img/brewacademy-cover.webp", alt: "Brewtomation" },
      { src: "/img/brewsmarinas-cover.webp", alt: "Brewsmarinas" },
    ],
    type: "3 GHL Sub-Accounts: CRM, Funnels, Pipelines & Automation",
    description:
      "Three complete GoHighLevel sub-accounts for three mock coffee businesses: an event booking CRM for a pop-up coffee bar, a batch-based barista coaching program, and a coffee equipment rental system. Each one has its own funnel, pipeline, and workflows covering the whole customer journey, plus an AI monthly report built with Zapier and Gemini.",
    image: "/img/brew-series-cover.webp",
    tech: ["GoHighLevel", "Zapier", "Jotform", "Gemini AI", "HTML Email Templates", "JavaScript", "Service Calendar", "Google Sheets", "Google Docs"],
    caseStudy: [
      {
        title: "Brew Mania — Event Booking CRM",
        content:
          "A complete CRM and booking system for a mock pop-up coffee bar. The website and funnel route visitors into a booking inquiry form, and a 6-stage Event Booking Pipeline (New Inquiry, Contacted, Pending, Booked, Event Done, Cancelled) shows where every lead stands.",
        images: ["/img/bm-website.webp", "/img/bm-pipeline.webp"],
      },
      {
        title: "Brew Mania — Booking Workflows",
        content:
          "Each booking form submission creates the contact, adds it to the pipeline, and sends a confirmation email, then sends up to 3 reminders to book a meeting before marking the lead as declined. Once the admin approves a booking, the system sends a day-before reminder and a thank-you email on event day. Separate workflows handle cancellations and a 31-day re-engagement sequence for past clients.",
        images: ["/img/bm-workflow1.webp", "/img/bm-workflow3.webp"],
      },
      {
        title: "Brew Mania — Feedback & AI Monthly Report",
        content:
          "Two Zapier workflows connected to the GHL automation. The first logs every Jotform feedback and rating submission into Google Sheets. The second runs on the 1st of every month: it pulls the latest feedback, sends it to Gemini AI for summarization, and creates a formatted monthly report in Google Docs.",
        images: ["/img/bm-zapier.webp", "/img/bm-wait-zapier.webp"],
      },
      {
        title: "Brewtomation — Barista Coaching Program",
        content:
          "A batch-based online barista coaching system. Students enroll through a custom funnel, go through 3 coaching sessions, and graduate with a certificate, all tracked per batch. The pipeline follows each student from New Lead through Enrolled, each session, Graduate, and Alumni, with separate stages for lost leads, dropouts, and no-shows.",
        images: ["/img/brewacademy.webp", "/img/brewto-pipeline.webp"],
      },
      {
        title: "Brewtomation — Enrollment, Sessions & Custom Emails",
        content:
          "Enrollment waits for payment confirmation and sends reminders before closing unpaid leads. Once a student is enrolled, tag-driven workflows track each session, send progress emails, and handle graduation, feedback, and alumni tagging. The hand-coded HTML emails include a welcome email with enrollment details and a completion email that works as an in-email certificate.",
        images: ["/img/brewto-welcome.webp", "/img/brewto-completion.webp"],
      },
      {
        title: "Brewsmarinas — Equipment Rental CRM",
        content:
          "A coffee equipment rental CRM across three equipment tiers: Starter, Barista, and Full Café. An 11-stage pipeline covers the full rental lifecycle, from New Rental Request through Confirmed, Equipment Out, Returned, and Completed, with separate stages for cancellations, damage, and lost leads.",
        images: ["/img/brewsmarinas.webp", "/img/brewsma-pipeline.webp"],
      },
      {
        title: "Brewsmarinas — Rental Lifecycle Workflows",
        content:
          "When the admin approves a rental, the system detects the equipment set and books the matching service calendar, then sends reminders to both the customer and the team. The workflows then cover delivery, return timing, and completion, plus a damage-inspection path that alerts the team. Completed rentals get a ratings request and two re-booking emails 31 days apart. Staff are notified at every step.",
        images: ["/img/brewsmarinas1.webp", "/img/brewsmarinas3.webp"],
      },
    ],
  },
  {
    slug: "zapier-enrollment",
    name: "Enrollment Automation",
    title: "Enrollment Automation — Zapier",
    tier: "compact",
    flow: { label: "Zap chain", steps: ["Jotform", "ClickFunnels", "ActiveCampaign", "Gmail"] },
    type: "Zapier Automation",
    description:
      "One form submission kicks off the whole chain: Jotform captures the lead, ClickFunnels enrolls them, ActiveCampaign tags them, and Gmail sends a personalized welcome. Nobody has to touch anything.",
    image: "/img/zapier-auto-enrollment-project.webp",
    tech: ["Zapier", "Jotform", "ClickFunnels", "ActiveCampaign", "Gmail"],
  },
  {
    slug: "ojt-summarizer",
    name: "OJT Report Summarizer",
    title: "OJT Report Summarizer",
    tier: "compact",
    flow: { label: "Zap chain", steps: ["Google Sheets", "Gemini AI", "Google Docs"] },
    type: "Zapier + AI Automation",
    description:
      "Every time a new row lands in Google Sheets, Gemini AI summarizes it and drops a formatted report into Google Docs. I built it with Zapier to make my daily OJT reporting hands-free.",
    image: "/img/ojt-summarizer.webp",
    tech: ["Zapier", "Gemini AI", "Google Sheets", "Google Docs"],
  },
  {
    slug: "capstone-booking",
    name: "Capstone Booking System",
    title: "Capstone Booking System",
    tier: "compact",
    role: "Capstone project",
    type: "Full-Stack Web Application",
    description:
      "My capstone project — a full booking system with a dynamic calendar. Users check availability, pick a time slot, and manage their bookings, all running on PHP and SQL with a Bootstrap frontend.",
    image: "/img/snvhoa.webp",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
  },
  {
    slug: "sku-request",
    name: "SKU Request System",
    title: "SKU Request System",
    tier: "compact",
    type: "AI-Assisted Web Application",
    description:
      "An SKU request system I built with AI-assisted development. React, ShadCN, and Tailwind on the front, Node.js and SQL behind it. This one's live — go click around.",
    image: "/img/skuRequestSystem.webp",
    tech: ["HTML", "CSS", "React", "Tailwind", "ShadCN", "Node.js"],
    link: "https://skusystem-wj8c.vercel.app/",
  },
];
