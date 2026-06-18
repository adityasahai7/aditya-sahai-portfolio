export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  targetKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  featured: boolean;
  body: Array<{
    heading?: string;
    paragraphs: string[];
    note?: string;
  }>;
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-sahai-6939b8362" },
  { label: "X", href: "https://x.com/adityasahai07" },
  { label: "Instagram", href: "https://instagram.com/adityasahai37" },
  { label: "YouTube", href: "https://youtube.com/@adityasahai37" },
];

export const beliefs = [
  ["Taste beats tools.", "Tools can generate. Taste decides what deserves to ship."],
  ["Content is positioning at scale.", "Every post, article, video, and newsletter tells people what you stand for."],
  ["Sales pages are stories under pressure.", "A good sales page explains the offer so clearly that the next step feels obvious."],
  ["Brand is memory.", "A brand is what people remember when you are not in the room."],
  ["AI made average output free.", "When everyone can make more, the advantage moves to sharper thinking."],
  ["Open the file.", "Show the thinking. Show the draft. Show the decision. Show the receipt."],
];

export const creativeFiles = [
  ["001", "My Bio File", "Identity", "OPEN", "The story of who I am, what I believe, and why I’m building the Creative AI Operator lane.", "START HERE", "/about"],
  ["002", "FRROST Media Brand World", "Studio Identity", "BUILDING", "The dark-ice creative studio system behind FRROST Media.", "STUDIO FILE", "/frrost-media"],
  ["003", "AI Branding Article Series", "Article Cluster", "PUBLISHING", "A searchable article series on AI branding, AI marketing, creative direction, founder brands, and sales storytelling.", "RANK THE FILE", "/articles"],
  ["004", "Thinking Beyond Letter", "Newsletter", "OPENING", "The Sunday read for Indian operators who refuse the default path.", "JOIN THE LETTER", "/newsletter"],
  ["005", "Website World Breakdown", "Creative Direction", "DRAFT", "How a website becomes a brand world instead of a template.", "NOT A TEMPLATE", "/articles"],
  ["006", "Sales Story Notes", "Marketing Thinking", "DRAFT", "Notes on why sales pages are stories under pressure.", "SALES STORY", "/articles/sales-pages-are-stories-under-pressure"],
  ["007", "Beyond Default", "Content World", "BUILDING", "The show layer for creative business breakdowns, AI drops, and operator thinking.", "BEYOND DEFAULT", "/newsletter"],
  ["008", "Thinking Beyond Average", "Anchor Phrase", "LIVE", "The phrase behind the personal brand and community direction.", "ANCHOR", "/about"],
];

export const articles: Article[] = [
  {
    slug: "what-is-a-creative-ai-operator",
    title: "What Is a Creative AI Operator?",
    subtitle: "The new operator is not a prompt engineer. It is a brand, marketing, and creative thinker who knows how to use AI without losing taste.",
    excerpt: "The new operator is not a prompt engineer. It is a brand, marketing, and creative thinker who knows how to use AI without losing taste.",
    category: "Creative AI Operator",
    tags: ["creative AI operator", "AI branding", "AI marketing", "creative strategy"],
    targetKeywords: ["creative AI operator", "AI operator India", "AI creative strategist", "AI branding", "AI marketing"],
    metaTitle: "What Is a Creative AI Operator? — Aditya Sahai",
    metaDescription: "A Creative AI Operator uses AI to sharpen branding, marketing, sales storytelling, content, websites, and creative direction without losing taste.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "7 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [
      {
        paragraphs: [
          "A Creative AI Operator is not someone who collects tools. That is the easiest version of the role, and also the weakest.",
          "A Creative AI Operator sits between AI, branding, marketing, content, sales, and taste. The job is not just to generate more output. The job is to decide what should exist, shape it into something memorable, and use AI to move faster without sounding like everyone else.",
          "AI made production cheaper. It did not make judgment cheaper. That is the difference.",
        ],
      },
      {
        heading: "The old operator was about execution",
        paragraphs: [
          "For years, the operator role meant getting things done. Build the funnel. Send the emails. Ship the campaign. Edit the video. Make the website. Run the process. That still matters.",
          "But AI changed the baseline. Now anyone can generate copy, draft posts, create visual directions, outline a landing page, or ask a model for campaign ideas.",
          "The bottleneck is no longer output. The bottleneck is taste. What idea should the brand own? What message should the market remember? What should the website say first? What article should exist? What should be deleted?",
        ],
      },
      {
        heading: "The five layers",
        paragraphs: [
          "The Creative AI Operator works across brand, marketing, sales story, creative direction, and writing. Brand is the memory layer. Marketing is signal design. Sales story is clarity under pressure. Creative direction is judgment. Writing is how thinking compounds.",
          "AI can accelerate every layer. It can research language, draft options, remix references, outline campaigns, and pressure-test angles. But it cannot decide what belongs to your world. That is the human layer.",
        ],
        note: "Creative Operator Note: Do not ask AI to make the final thing first. Ask it to reveal options, tensions, angles, contradictions, and missing proof. Then use taste.",
      },
      {
        heading: "Mistakes to avoid",
        paragraphs: [
          "The first mistake is becoming tool-first. If your idea begins and ends with a tool, the market will forget it when the next tool arrives.",
          "The second mistake is confusing volume with signal. More posts do not automatically create more trust. More pages do not automatically make the offer clearer. More creative does not automatically make the brand sharper.",
          "The third mistake is sounding like everyone else because the machine gave everyone the same first draft.",
        ],
      },
      {
        heading: "Open the file",
        paragraphs: [
          "A Creative AI Operator uses AI as leverage, not as identity. The identity is the thinking: the taste, the story, the system, and the signal.",
          "That is the lane I am building in. Not AI content for the sake of AI content. Creative work with receipts. Brand thinking in public. Articles that become an archive. A newsletter that documents the build.",
          "If that is your kind of internet, start with the articles and join the Thinking Beyond Letter.",
        ],
      },
    ],
  },
  {
    slug: "ai-branding-founder-guide",
    title: "AI Branding: How Founders Can Build Sharper Brands With AI",
    subtitle: "AI can generate options. It cannot decide what your brand should mean.",
    excerpt: "AI can generate options. It cannot decide what your brand should mean.",
    category: "AI Branding",
    tags: ["AI branding", "brand strategy", "founder brand", "AI brand voice"],
    targetKeywords: ["AI branding", "AI brand strategy", "AI branding India", "AI-powered branding", "startup branding with AI"],
    metaTitle: "AI Branding: How Founders Can Build Sharper Brands With AI",
    metaDescription: "A practical guide to AI branding for founders who want sharper positioning, voice, visual direction, and content without losing taste.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "8 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [
      {
        paragraphs: [
          "AI branding is not asking a model for a logo idea and calling it strategy. That is decoration with a faster engine.",
          "Real branding starts before the asset. It starts with memory. What should people remember when they hear your name? What should they believe after seeing your content for thirty days? What should feel unmistakably yours?",
        ],
      },
      {
        heading: "AI is useful before the final decision",
        paragraphs: [
          "AI can help founders explore customer language, competitor patterns, voice territories, visual references, positioning angles, and content themes. It is brilliant at widening the board.",
          "But the founder still has to narrow the board. A brand cannot be every adjective the model suggests. Premium, bold, friendly, disruptive, trusted, modern, warm, intelligent, playful. That pile is not a brand. It is a moodboard with no spine.",
        ],
      },
      {
        heading: "A sharper branding workflow",
        paragraphs: [
          "Start with the market. What does the audience already think? What do they misunderstand? What are they tired of hearing? What do they secretly want but rarely say clearly?",
          "Then define the position. What hill does the brand stand on? What does it refuse? What language does it own? What does it make easier to understand?",
          "Only after that should you explore voice, visual direction, content angles, website structure, and launch language.",
        ],
        note: "Creative Operator Note: Use AI to create contrast. Ask for the generic version, then build the opposite. The gap is often where the brand starts becoming memorable.",
      },
      {
        heading: "Founder brand matters",
        paragraphs: [
          "For early-stage brands, the founder often carries the trust before the brand does. AI can help a founder turn messy thinking into sharper posts, essays, landing page copy, and newsletters.",
          "But the founder’s point of view has to stay intact. A founder brand with no opinion is just a content calendar wearing a face.",
        ],
      },
      {
        heading: "Open the file",
        paragraphs: [
          "AI branding works when AI supports the thinking, not when it replaces it. Use it for research, options, language, references, and pressure tests. Use taste for direction.",
          "Your brand does not need more random assets. It needs a sharper memory. That is the work.",
        ],
      },
    ],
  },
  {
    slug: "ai-marketing-indian-founders",
    title: "AI Marketing for Indian Founders: Strategy Before Tools",
    subtitle: "Most founders ask which AI tool to use. The better question is what message their market needs to hear.",
    excerpt: "Most founders ask which AI tool to use. The better question is what message their market needs to hear.",
    category: "AI Marketing",
    tags: ["AI marketing India", "startup marketing", "content strategy", "campaign strategy"],
    targetKeywords: ["AI marketing India", "AI marketing for startups", "AI marketing consultant India", "AI marketing strategy"],
    metaTitle: "AI Marketing for Indian Founders: Strategy Before Tools",
    metaDescription: "A founder-focused guide to using AI for content, campaigns, landing pages, and marketing decisions without getting lost in tools.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "7 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [
      {
        paragraphs: [
          "Most founders ask the wrong AI marketing question first. They ask which tool will make content faster. The better question is what the market needs to understand before it trusts you.",
          "Speed is useful. But fast unclear marketing is still unclear marketing.",
        ],
      },
      {
        heading: "Strategy before tools",
        paragraphs: [
          "AI can create hooks, posts, email drafts, landing page angles, campaign concepts, and newsletter outlines. But if the strategy is weak, it only helps you produce weak marketing more consistently.",
          "For Indian founders especially, the temptation is to copy what looks loud. Viral hooks, fake urgency, borrowed authority, template funnels. The internet is full of it. The problem is that attention without trust does not compound.",
        ],
      },
      {
        heading: "The message-market fit question",
        paragraphs: [
          "Before building a content engine, ask: what pain is the market already feeling? What language do they use? What proof do they need? What belief has to change? What would make the offer feel obvious?",
          "AI can help map these questions. It can cluster objections, turn interviews into themes, and generate campaign angles from real customer language. But the founder still chooses the narrative.",
        ],
        note: "Creative Operator Note: Use AI to create ten campaign angles. Then delete the ones that sound impressive but do not change belief.",
      },
      {
        heading: "What to build",
        paragraphs: [
          "Build a small system: one clear positioning line, five content territories, ten recurring hooks, three proof formats, one newsletter rhythm, and one landing page story.",
          "That is more useful than chasing a new tool every week. AI marketing should make the message sharper, not the chaos louder.",
        ],
      },
      {
        heading: "Open the file",
        paragraphs: [
          "The founder who wins with AI marketing will not be the one with the longest tool stack. It will be the one who understands the audience deeply and uses AI to ship sharper versions of that understanding.",
          "Strategy first. Tools second. Signal always.",
        ],
      },
    ],
  },
  {
    slug: "ai-made-output-free-taste-is-the-moat",
    title: "AI Made Output Free. Taste Is the Moat.",
    subtitle: "When everyone can make more content, the advantage moves from output to judgment.",
    excerpt: "When everyone can make more content, the advantage moves from output to judgment.",
    category: "Creative Direction",
    tags: ["AI creative direction", "taste", "creative strategy", "brand memory"],
    targetKeywords: ["AI creative direction", "AI creative studio", "AI-assisted creative production", "brand taste"],
    metaTitle: "AI Made Output Free. Taste Is the Moat",
    metaDescription: "Why AI makes creative taste, judgment, and direction more valuable than ever.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "6 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [
      {
        paragraphs: [
          "AI made average output free. That sentence sounds dramatic until you open any feed for five minutes.",
          "More posts. More graphics. More scripts. More landing pages. More carousels. More newsletters. More of everything. And somehow, less of it feels worth remembering.",
        ],
      },
      {
        heading: "The new scarcity",
        paragraphs: [
          "Output used to be the scarce thing. If you could write, design, edit, or publish fast, you had an advantage. Now the machine compresses that advantage.",
          "The scarce thing is judgment. Knowing what belongs. Knowing what is generic. Knowing when the first draft is technically correct but emotionally dead. Knowing when a campaign needs a sharper angle, not more assets.",
        ],
      },
      {
        heading: "Taste is not decoration",
        paragraphs: [
          "Taste is strategy felt through decisions. It is the reason a website feels like a world instead of a template. It is the reason a sentence lands. It is the reason a brand uses one color instead of twelve.",
          "Taste decides the cut. AI gives you material. Taste shapes the material into signal.",
        ],
        note: "Creative Operator Note: If AI gives you ten good options, your advantage is knowing which nine to ignore.",
      },
      {
        heading: "How to train taste",
        paragraphs: [
          "Collect references. Study campaigns. Read sales pages. Watch how strong brands repeat ideas. Notice what feels cheap. Notice what feels earned. Ask why a page made you trust it.",
          "Taste is not magic. It is repeated attention plus honest editing.",
        ],
      },
      {
        heading: "Open the file",
        paragraphs: [
          "The future does not belong to people who can make the most stuff. It belongs to people who can make the right stuff easier to notice, easier to trust, and harder to forget.",
          "AI is the lever. Taste is the moat.",
        ],
      },
    ],
  },
  {
    slug: "content-is-positioning-at-scale",
    title: "Content Is Positioning at Scale",
    subtitle: "A founder brand is not posting daily. It is making the market remember what you stand for.",
    excerpt: "A founder brand is not posting daily. It is making the market remember what you stand for.",
    category: "Founder Brand",
    tags: ["founder personal brand", "content strategy", "positioning", "AI personal branding"],
    targetKeywords: ["founder personal branding India", "AI personal branding", "founder-led content", "personal brand strategist India"],
    metaTitle: "Content Is Positioning at Scale — Founder Brand Notes",
    metaDescription: "Why founder content is not just distribution, but a public expression of positioning, trust, and authority.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "6 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [
      {
        paragraphs: [
          "Content is not posting. Content is positioning at scale.",
          "Every public idea tells people what you notice, what you value, what you understand, and what you can be trusted with. That is why founder content matters.",
        ],
      },
      {
        heading: "The calendar is not the strategy",
        paragraphs: [
          "A content calendar can keep you consistent, but it cannot make you worth remembering. The strategy is the repeated point of view underneath the posts.",
          "What do you want the market to associate with you? What should a founder, student, creator, or operator remember after seeing your work for a month?",
        ],
      },
      {
        heading: "Founder-led content builds trust in public",
        paragraphs: [
          "A founder does not need to perform expertise every day. They need to document clear thinking. The build, the lesson, the mistake, the decision, the customer insight, the campaign breakdown, the article note.",
          "AI can help turn those raw notes into posts, essays, scripts, and newsletters. But the signal has to start from real thought.",
        ],
        note: "Creative Operator Note: Do not outsource your point of view. Outsource the friction around shaping it.",
      },
      {
        heading: "A simple content system",
        paragraphs: [
          "Pick three recurring territories: what you are building, what you believe, and what you are learning. Then create formats around them: notes, breakdowns, articles, newsletter issues, and short posts.",
          "The goal is not to appear everywhere. The goal is to become clear somewhere, then compound.",
        ],
      },
      {
        heading: "Open the file",
        paragraphs: [
          "Founder content works when it makes the founder easier to understand and trust. It is not noise. It is memory, repeated with proof.",
          "If your content does not position you, it is just activity.",
        ],
      },
    ],
  },
  {
    slug: "sales-pages-are-stories-under-pressure",
    title: "Sales Pages Are Stories Under Pressure",
    subtitle: "A sales page is not just copy. It is the clearest version of your offer when attention is limited.",
    excerpt: "A sales page is not just copy. It is the clearest version of your offer when attention is limited.",
    category: "Sales Pages",
    tags: ["sales page", "landing page", "conversion copy", "website story"],
    targetKeywords: ["sales page copywriting", "AI sales page copywriting", "landing page strategy", "conversion copywriting"],
    metaTitle: "Sales Pages Are Stories Under Pressure",
    metaDescription: "A sales page is not just copy or design. It is your offer story under pressure.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "4 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [{ paragraphs: ["A sales page is a story under pressure. It has to make a stranger understand the problem, the promise, the proof, and the next move before attention disappears.", "This article file is open, with the full breakdown being expanded in public."] }],
  },
  {
    slug: "what-we-are-building-with-frrost-media",
    title: "What We Are Building With FRROST Media",
    subtitle: "FRROST Media is not a normal agency. It is the studio layer for AI branding, marketing, websites, sales stories, and creative direction.",
    excerpt: "The operating thesis behind FRROST Media: AI-powered branding, marketing, websites, sales pages, and creative systems.",
    category: "FRROST Notes",
    tags: ["FRROST Media", "AI creative studio India", "AI branding studio", "AI marketing studio"],
    targetKeywords: ["FRROST Media", "AI creative studio India", "AI branding studio India", "AI marketing studio India"],
    metaTitle: "What We Are Building With FRROST Media",
    metaDescription: "The operating thesis behind FRROST Media: AI-powered branding, marketing, websites, sales pages, and creative systems.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "4 min read",
    author: "Aditya Sahai",
    featured: true,
    body: [{ paragraphs: ["FRROST Media is the studio layer for brand worlds, marketing systems, websites, content, sales stories, and AI-assisted creative direction.", "The full file is being built in public."] }],
  },
  {
    slug: "thinking-beyond-average",
    title: "Thinking Beyond Average: What It Actually Means",
    subtitle: "The phrase is not motivation. It is a refusal to drift into the default path.",
    excerpt: "The phrase is not motivation. It is a refusal to drift into the default path.",
    category: "Thinking Beyond",
    tags: ["Thinking Beyond Average", "Aditya Sahai", "operator mindset", "Indian creators"],
    targetKeywords: ["Thinking Beyond Average", "Aditya Sahai", "creative AI operator", "Indian operators"],
    metaTitle: "Thinking Beyond Average — Aditya Sahai",
    metaDescription: "The meaning behind Thinking Beyond Average and why it sits at the center of Aditya Sahai’s personal brand.",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "3 min read",
    author: "Aditya Sahai",
    featured: false,
    body: [{ paragraphs: ["Thinking Beyond Average is not a motivational line. It is a refusal to drift into the default path.", "It is the anchor phrase behind the personal brand, newsletter, and future community direction."] }],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];
