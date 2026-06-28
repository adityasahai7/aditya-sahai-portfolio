import {
  Aperture,
  Blocks,
  Bot,
  Compass,
  FileText,
  Globe2,
  Layers3,
  Megaphone,
  PenTool,
  ScanSearch,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navigation = [
  ["About", "/about"],
  ["Work", "/work"],
  ["Articles", "/articles"],
  ["Newsletter", "/newsletter"],
  ["FRROST", "/frrost-media"],
  ["Contact", "/contact"],
] as const;

export const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/aditya-sahai-6939b8362"],
  ["X", "https://x.com/adityasahai07"],
  ["Instagram", "https://instagram.com/adityasahai37"],
  ["YouTube", "https://youtube.com/@adityasahai37"],
] as const;

export const signalLines = [
  "AI made average output free.",
  "Taste is the moat.",
  "Content is positioning at scale.",
  "Brand is memory.",
  "Sales pages are stories under pressure.",
  "Systems make creativity repeatable.",
];

export const buildCards = [
  {
    title: "Brand Positioning",
    copy: "Naming, messaging, offer clarity, visual direction, tone, and the story your market should remember.",
    icon: Compass,
  },
  {
    title: "Websites & Landing Pages",
    copy: "Premium web experiences that explain what you do, build trust, and make the next step obvious.",
    icon: Globe2,
  },
  {
    title: "Content Systems",
    copy: "Video ideas, newsletters, founder posts, article systems, and repeatable content engines.",
    icon: Layers3,
  },
  {
    title: "AI Creative Workflows",
    copy: "Practical workflows that help brands produce faster without sounding or looking generic.",
    icon: Bot,
  },
  {
    title: "Sales Stories",
    copy: "Sales pages, offer pages, pitch narratives, case-study structures, and conversion-focused messaging.",
    icon: Megaphone,
  },
];

export const stackCards = [
  ["Taste", "What belongs. What does not. What feels premium. What feels fake."],
  ["Story", "The positioning, hook, narrative, and emotional reason people care."],
  ["System", "The repeatable structure behind content, websites, articles, campaigns, and workflows."],
  ["Signal", "The public memory created through consistent ideas, visuals, writing, and visible thinking."],
] as const;

export const proofCards = [
  {
    title: "FRROST Media Build-in-Public",
    category: "Studio Build",
    status: "In Progress",
    copy: "The early studio layer where I’m building brand worlds, websites, content systems, sales stories, and AI-assisted creative direction.",
    icon: Aperture,
  },
  {
    title: "Website Experience Experiments",
    category: "Web",
    status: "Self-Initiated",
    copy: "Landing-page structures, homepage systems, section flows, visual directions, and conversion ideas for sharper online presence.",
    icon: Globe2,
  },
  {
    title: "Content Engine Experiments",
    category: "Content",
    status: "In Progress",
    copy: "Systems for turning one idea into videos, short-form clips, newsletters, articles, carousels, and founder-led content.",
    icon: Workflow,
  },
  {
    title: "Brand Breakdown Notes",
    category: "Strategy",
    status: "Draft",
    copy: "Breakdowns of how strong brands create memory, trust, positioning, and demand.",
    icon: ScanSearch,
  },
  {
    title: "Thumbnail & Visual Direction Lab",
    category: "Creative Direction",
    status: "Experiment",
    copy: "Experiments around thumbnails, business case-study visuals, click psychology, and premium Indian content design.",
    icon: PenTool,
  },
  {
    title: "AI Workflow Experiments",
    category: "AI Systems",
    status: "In Progress",
    copy: "Prompt systems, research workflows, scripting flows, design-direction systems, and content repurposing workflows.",
    icon: Bot,
  },
  {
    title: "Sales Page Story Lab",
    category: "Conversion",
    status: "Draft",
    copy: "How offers, landing pages, sales pages, and pitch narratives can be structured like stories under pressure.",
    icon: Megaphone,
  },
  {
    title: "Article Library",
    category: "Writing",
    status: "Live",
    copy: "Essays on AI, branding, creative direction, marketing, content systems, founder brands, and operator thinking.",
    icon: FileText,
  },
];

export const worlds = [
  {
    title: "FRROST Media",
    label: "The studio layer",
    copy: "An early-stage AI creative studio for brand worlds, websites, marketing systems, sales stories, content engines, and creative direction.",
    href: "/frrost-media",
    cta: "Learn about FRROST",
    className: "ice-world-dark",
  },
  {
    title: "Beyond Default",
    label: "The breakdown layer",
    copy: "A show for AI, business, brands, creators, founders, and operator systems, focused on mechanisms instead of motivation.",
    href: "/beyond-default",
    cta: "Explore the build",
    className: "ice-world-blue",
  },
  {
    title: "Thinking Beyond Club",
    label: "The community layer",
    copy: "A future space for ambitious Indian operators who want to build skill, taste, leverage, and execution in public.",
    href: "/thinking-beyond-club",
    cta: "Join the waitlist",
    className: "ice-world-moss",
  },
];

export const processSteps = [
  ["01", "Find the gap", "Understand what is unclear, generic, weak, or forgettable."],
  ["02", "Build the story", "Turn the idea into positioning, messaging, and a reason to care."],
  ["03", "Design the system", "Create the website, content engine, brand system, workflow, or sales asset."],
  ["04", "Ship the asset", "Make it real, usable, and clean enough to publish."],
  ["05", "Improve with feedback", "Refine based on behavior, clarity, conversion, and taste."],
] as const;

export const collaborationCards = [
  {
    title: "Founder Brand / Personal Brand Sprint",
    for: "Founders, creators, coaches, and operators who want to become easier to understand and remember.",
    builds: "Positioning, content pillars, profile story, visual direction, and a practical content system.",
  },
  {
    title: "Website / Landing Page Sprint",
    for: "Brands, startups, local businesses, and creators who need a premium web presence that explains and sells.",
    builds: "Page structure, copy, visual direction, sections, CTA flow, and a launch-ready website experience.",
  },
  {
    title: "Content & AI Workflow System",
    for: "People who want to publish more without becoming generic.",
    builds: "Idea system, research flow, scripting structure, repurposing workflow, and publishing rhythm.",
  },
];

export const faqs = [
  ["Who is Aditya Sahai?", "Aditya Sahai is a Creative AI Operator from India building at the intersection of AI, branding, marketing, websites, content systems, sales storytelling, creative direction, FRROST Media, Beyond Default, and Thinking Beyond Letter."],
  ["What is a Creative AI Operator?", "A Creative AI Operator uses AI, taste, story, strategy, and systems to improve the creative and strategic parts of a brand: positioning, content, websites, sales pages, articles, newsletters, and public trust."],
  ["What can I hire Aditya for?", "You can reach out for brand positioning, website or landing-page direction, content systems, AI creative workflows, founder-brand strategy, sales-page storytelling, or FRROST Media-related work."],
  ["What is FRROST Media?", "FRROST Media is the early-stage AI creative studio I’m building for brand worlds, websites, marketing systems, content engines, sales stories, campaigns, and creative direction."],
  ["What is Beyond Default?", "Beyond Default is my breakdown layer for AI, business, brands, creators, founders, and operator systems, focused on mechanisms rather than motivation."],
  ["What is Thinking Beyond Letter?", "Thinking Beyond Letter is my newsletter for Indian operators who refuse the default path. It covers creative builds, sharp lessons, AI, branding, marketing, and operator thinking."],
  ["Is this a services website?", "Yes and no. AdityaSahai.com is my personal brand and thinking hub. FRROST Media is the studio layer. I’m early and currently open to selected aligned projects."],
  ["How do I contact Aditya?", "Use the Send a Note form, email, WhatsApp, LinkedIn, or Instagram."],
] as const;

export const labGroups = [
  ["Studio Build", "FRROST Media", "The brand, offer, website, onboarding, and AI-assisted operating system for the studio layer."],
  ["Website Experiments", "Experience systems", "Homepage structures, landing-page stories, interaction patterns, and conversion flows."],
  ["Content Systems", "Repeatable publishing", "Idea capture, research, scripting, repurposing, and platform-native distribution systems."],
  ["Brand Breakdowns", "Memory and demand", "Notes on how brands become easier to understand, trust, and remember."],
  ["Visual Direction Lab", "Click and story tension", "Thumbnail systems, case-study visuals, editorial art direction, and Indian internet culture."],
  ["AI Workflow Systems", "Leverage without slop", "Research, writing, design direction, and repurposing workflows that keep judgment in the loop."],
  ["Sales Story Experiments", "Clarity under pressure", "Offer logic, landing-page structure, objections, proof, and next-step design."],
  ["Writing Library", "Public thinking", "Essays that make the creative operator lane clearer over time."],
] as const;

export const commandCards = [
  ["Brand System", "Positioning + memory", Sparkles],
  ["Website Story", "Structure + trust", Globe2],
  ["Content Engine", "Ideas + rhythm", Blocks],
  ["AI Workflow", "Speed + judgment", Workflow],
  ["Sales Page", "Narrative + action", Megaphone],
  ["Creative Direction", "Taste + signal", PenTool],
] as const;
