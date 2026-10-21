// ─────────────────────────────────────────────────────────────────────────────
// ADITYASAHAI.COM: every word on the site lives in this file.
// Sources: Beyond Default master (2026-10-17), Thinking Beyond Club site copy,
// FRROST Demand System motherboard (2026-10-17).
// HONESTY RULE: no follower counts, client results, dates or testimonials
// until they are real and Aditya has approved them.
// ─────────────────────────────────────────────────────────────────────────────

export type Tone = "teal" | "sea" | "mint" | "cyan" | "yellow" | "red" | "fuchsia" | "ink" | "paper";

export const LINKS = {
  instagram: "https://instagram.com/adityasahai37",
  youtube: "https://youtube.com/@adityasahai37",
  linkedin: "https://www.linkedin.com/in/aditya-sahai-6939b8362",
  x: "https://x.com/adityasahai07",
  email: "mailto:adityasahai037@gmail.com",
  whatsapp: "https://wa.me/916207126091",
  tbc: "https://thinkingbeyondclub.vercel.app",
  frrost: "https://frrost-media.vercel.app",
} as const;

export const socials = [
  { label: "Instagram", handle: "@adityasahai37", href: LINKS.instagram, emoji: "📸", tone: "fuchsia" },
  { label: "YouTube", handle: "@adityasahai37", href: LINKS.youtube, emoji: "▶️", tone: "red" },
  { label: "LinkedIn", handle: "Aditya Sahai", href: LINKS.linkedin, emoji: "💼", tone: "cyan" },
  { label: "X", handle: "@adityasahai07", href: LINKS.x, emoji: "✖️", tone: "yellow" },
] as const;

export const nav = [
  { label: "About", href: "/about", tone: "red" },
  { label: "Beyond Default", href: "/beyond-default", tone: "cyan" },
  { label: "TBC", href: "/thinking-beyond-club", tone: "yellow" },
  { label: "FRROST", href: "/frrost-media", tone: "mint" },
  { label: "Work", href: "/work", tone: "fuchsia" },
  { label: "Writing", href: "/articles", tone: "sea" },
  { label: "Letter", href: "/newsletter", tone: "red" },
] as const;

export const preloader = ["THINK", "BEYOND", "THE", "DEFAULT."];

export const hero = {
  kicker: "HI, I'M 👋",
  name: ["ADITYA", "SAHAI"],
  title: "CREATIVE AI OPERATOR",
  identity: ["Creator", "Storyteller", "Builder"],
  line: "I make stories, AI systems and things on the internet that are worth your time. From India 🇮🇳, in public.",
  ctaPrimary: { label: "Watch Beyond Default", href: LINKS.youtube, emoji: "🎬" },
  ctaSecondary: { label: "Say hi", href: "/contact", emoji: "👋" },
  stickers: [
    { text: "Storyteller ✍️", tone: "yellow" },
    { text: "Builder 🛠️", tone: "mint" },
    { text: "Think Beyond Default", tone: "red" },
    { text: "For Good, Towards Greatness ✨", tone: "cyan" },
    { text: "🎬", tone: "paper" },
    { text: "🤖", tone: "paper" },
    { text: "Explorer 🧭", tone: "fuchsia" },
    { text: "hi! 👋", tone: "yellow" },
    { text: "☕", tone: "paper" },
    { text: "AI + taste", tone: "sea" },
  ] as { text: string; tone: Tone }[],
  scrollHint: "SCROLL, IT GETS BETTER ↓",
};

export const ribbons = [
  ["AI made average free 🤖", "Taste is the moat 👅", "One story can change a decision 📖", "Show up. Say it. Do it. Show it. ✊"],
  ["Think Beyond Default 🧠", "For Good, Towards Greatness ✨", "Build in public 🛠️", "Curiosity is the whole job 🔍"],
];

export const operator = {
  label: "01 / THE JOB TITLE",
  question: ["SO WHAT'S A", "CREATIVE AI", "OPERATOR?"],
  answer: "GOOD QUESTION.",
  cards: [
    { emoji: "🤖", title: "AI", body: "does the heavy lifting. Research, drafts, edits, code, the boring 80%.", tone: "cyan" },
    { emoji: "👅", title: "TASTE", body: "decides what's actually worth making, and what should never ship.", tone: "yellow" },
    { emoji: "📖", title: "STORY", body: "is why anyone cares. No story, no memory, no point.", tone: "red" },
  ],
  definition: "Someone who uses AI to move fast, taste to choose well and story to make people feel something. That's the whole job. I do it for my own channel, my own company and the people I build with.",
  scrub: "Everyone has the same AI now. The tools are free, the output is infinite, and most of it is forgettable. What isn't free is knowing what to make, why it matters and how to tell it so it stays with someone. That's the part I care about.",
  hot: ["forgettable.", "stays", "someone."],
};

export const whatIDo = {
  label: "02 / WHAT I ACTUALLY DO",
  title: ["FOUR THINGS.", "EVERY WEEK."],
  cards: [
    { emoji: "🎬", title: "I tell stories", body: "Beyond Default is my YouTube home. Ideas, extraordinary stories and the things I'm building, told properly.", href: "/beyond-default", cta: "See the show", tone: "red" },
    { emoji: "🧠", title: "I build AI systems", body: "Agents, automations and workflows that do real work, so the creative part gets more of my time.", href: "/work", cta: "See the builds", tone: "cyan" },
    { emoji: "📈", title: "I engineer growth", body: "FRROST Media finds where growth is breaking for founders and brands, then builds the system that fixes it.", href: "/frrost-media", cta: "Meet FRROST", tone: "mint" },
    { emoji: "🫂", title: "I build a room", body: "Thinking Beyond Club is a free, application-only club for people building a life that compounds.", href: "/thinking-beyond-club", cta: "Meet the club", tone: "yellow" },
  ] as { emoji: string; title: string; body: string; href: string; cta: string; tone: Tone }[],
};

export const sides = {
  label: "03 / SEVEN SIDES, ONE GUY",
  title: ["NOT SEVEN NICHES.", "SEVEN SIDES OF ME."],
  cards: [
    { emoji: "📖", name: "The Storyteller", body: "Finds extraordinary stories and tells them with feeling, humour and a bit of cinema." },
    { emoji: "🛠️", name: "The Builder", body: "Makes things. Experiments with tech. Shows what you can build with an idea and a weekend." },
    { emoji: "🧭", name: "The Explorer", body: "Follows curiosity anywhere: history, science, business, philosophy, culture." },
    { emoji: "💡", name: "The Explainer", body: "Takes complicated things and makes them simple, interesting and fun." },
    { emoji: "🎥", name: "The Documentarian", body: "Investigates properly. Research, evidence, structure and strong visuals." },
    { emoji: "🎭", name: "The Entertainer", body: "Wit, observation and personality. Learning shouldn't feel like homework." },
    { emoji: "🎙️", name: "The Conversationalist", body: "Coming soon: long conversations with interesting people." },
  ],
};

export const beyondDefault = {
  label: "04 / THE SHOW",
  title: ["BEYOND", "DEFAULT."],
  tagline: "A universe of stories, ideas and possibilities.",
  notThis: ["Not another AI channel.", "Not just a business channel.", "Not another motivation channel."],
  isThis: "A personality-led media universe built around curiosity, creativity, storytelling and meaningful ideas.",
  belief: ["Sometimes, one story can change your perspective.", "One idea can change your decisions.", "And one decision can change your life."],
  experiences: [
    { when: "WEEKDAYS", name: "Build Your World", emoji: "🌍", body: "Long-form YouTube in English. AI, business, branding, creativity, psychology, the ideas that help you build a life and a career that's yours.", tone: "cyan" },
    { when: "WEEKENDS", name: "Beyond the Story", emoji: "🎞️", body: "Stories That Stay With You. Cinematic deep dives into extraordinary people, history, mythology and moments that changed things.", tone: "ink" },
  ] as { when: string; name: string; emoji: string; body: string; tone: Tone }[],
  worlds: ["🤖 AI", "💻 Technology", "🚀 Entrepreneurship", "💼 Business", "🎨 Branding", "📣 Marketing", "✨ Creativity", "🎬 Filmmaking", "🧠 Psychology", "🏛️ Philosophy", "📜 History", "🐉 Mythology", "🔬 Science", "❤️ Relationships", "🌱 Personal growth", "🌍 Culture", "🎞️ Cinema", "📚 Literature", "🧪 Experiments", "🎙️ Interviews"],
  reactions: [
    { word: "WOW", emoji: "🤯", body: "I didn't know that.", tone: "yellow" },
    { word: "AHA", emoji: "💡", body: "Now I get it.", tone: "cyan" },
    { word: "I CAN", emoji: "💪", body: "I could actually do this.", tone: "mint" },
    { word: "THAT'S ME", emoji: "🫵", body: "He's talking about me.", tone: "red" },
  ] as { word: string; emoji: string; body: string; tone: Tone }[],
  signature: "FOR GOOD, TOWARDS GREATNESS.",
};

export const tbc = {
  label: "THE COMMUNITY",
  title: ["THINKING", "BEYOND", "CLUB."],
  tagline: "Build a life that compounds.",
  creed: ["SHOW UP.", "SAY IT.", "DO IT.", "SHOW IT."],
  what: "A free, application-only club for people building a life that compounds. Body, mind, money. Online now. In your city soon.",
  scripts: {
    old: ["Study.", "Get the degree.", "Get the job.", "Get the EMI.", "Get the weekend."],
    new: ["Buy the course.", "Post the quote.", "Chase the hustle.", "Call it freedom."],
    stamp: "BOTH ARE SCRIPTS. NEITHER ONE IS YOURS.",
  },
  truth: "You're not lazy. You're doing it alone, at 11pm, in a room full of people who aren't building anything. Nobody becomes disciplined by deciding to be. People become whatever the room expects of them.",
  hot: ["alone,", "11pm,", "room"],
  axes: [
    { label: "BODY", emoji: "💪", tone: "red" },
    { label: "MIND", emoji: "🧠", tone: "cyan" },
    { label: "MONEY", emoji: "💰", tone: "yellow" },
  ] as { label: string; emoji: string; tone: Tone }[],
  week: [
    { day: "MON", name: "The Monday Note", emoji: "📝", body: "One line. One thing you're doing this week. Not five. One.", tone: "mint" },
    { day: "WED", name: "The Big Table", emoji: "☕", body: "45 minutes, live. Someone builds something real, or gets their work looked at properly.", tone: "cyan" },
    { day: "FRI", name: "Show and Tell", emoji: "🎒", body: "Post what you actually did. \"Nothing happened, here's why\" counts.", tone: "yellow" },
    { day: "SUN", name: "Sunday Shoes", emoji: "👟", body: "You moved your body. A walk counts. Turning up is the whole thing.", tone: "red" },
  ] as { day: string; name: string; emoji: string; body: string; tone: Tone }[],
  beliefs: ["The default is a decision you didn't make.", "You become the room you're in.", "Compounding beats intensity.", "Proof beats opinion.", "Nobody is above anybody."],
  free: "IT'S FREE.",
  freeLine: "No course. No upsell. No card. It costs you one thing: you have to actually turn up.",
  cta: "Enter the Club",
  ctaNote: "Takes you to thinkingbeyondclub.vercel.app ↗",
};

export const frrost = {
  label: "THE COMPANY",
  question: ["WHERE IS", "GROWTH", "BREAKING?"],
  category: "AI-native Demand Engineering for founders and consumer brands.",
  promise: "We diagnose the constraint holding growth back, then build the system that removes it.",
  service: "The FRROST Demand System",
  serviceLine: "One premium engagement. Not a menu of disconnected services.",
  who: "For founders and consumer brands that already have something worth scaling, but not the connected system to scale it.",
  constraints: [
    { emoji: "🏛️", name: "Authority", symptom: "Real expertise, but the market doesn't know, remember or trust it enough.", fix: "A repeatable authority system that turns expertise into recognition, trust and demand.", tone: "cyan" },
    { emoji: "🎯", name: "Acquisition", symptom: "The product sells, but attention, creative and media don't produce predictable demand.", fix: "One learning system across creative, campaigns, landing pages and paid.", tone: "yellow" },
    { emoji: "⚙️", name: "Operations", symptom: "Demand exists, but manual, scattered processes stop the company from capturing and compounding it.", fix: "A growth operating system that stops demand, data, time and revenue from leaking.", tone: "mint" },
  ] as { emoji: string; name: string; symptom: string; fix: string; tone: Tone }[],
  tagline: "GROWTH, ENGINEERED.",
  cta: "Visit FRROST",
  ctaNote: "Takes you to frrost-media.vercel.app ↗",
};

export const builds = {
  label: "05 / THINGS I'VE BUILT",
  title: ["MADE BY ME.", "(AND A LOT OF AI.) 🤖"],
  items: [
    { name: "Thinking Beyond Club", kind: "Website + community", emoji: "🫂", body: "The full club site: manifesto, the weekly rhythm, a quiz and applications. Designed and built end to end.", href: LINKS.tbc, tone: "yellow", size: "wide" },
    { name: "FRROST Media", kind: "Company + website", emoji: "📈", body: "Positioning, the Demand System and the website for my growth company.", href: LINKS.frrost, tone: "mint", size: "tall" },
    { name: "Beyond Default", kind: "YouTube show", emoji: "🎬", body: "The show: its creative universe, story system and visual identity.", href: LINKS.youtube, tone: "red", size: "base" },
    { name: "This website", kind: "You're on it", emoji: "🌀", body: "Physics stickers, flip letters, a working newsletter. Built with Next.js, GSAP and Motion.", href: "/", tone: "cyan", size: "base" },
  ] as { name: string; kind: string; emoji: string; body: string; href: string; tone: Tone; size: "wide" | "tall" | "base" }[],
};

export const toolkit = ["Claude 🧠", "Next.js ▲", "React ⚛️", "Supabase ⚡", "GSAP 🟢", "Motion 🌀", "Vercel ▲", "Higgsfield 🎥", "Veo 🎞️", "Canva 🎨", "Figma ✏️", "Premiere 🎬", "Notion 📓", "Resend 💌", "n8n 🔁", "OpenRouter 🔀"];

export const letter = {
  label: "THE THINKING BEYOND LETTER 💌",
  title: ["ONE EMAIL.", "EVERY SUNDAY."],
  body: "One story worth knowing. One idea worth stealing. One thing I'm building, and what broke. Short enough for chai ☕.",
  promises: ["📖 One story", "💡 One idea", "🛠️ One build", "🚫 Zero spam"],
  success: "You're in! 🎉 Check your inbox.",
};

export const contact = {
  label: "06 / SAY IT",
  title: "SAY IT.",
  body: "Collab, a project, a story I should cover, or just a hi. I read every single note.",
  options: ["🎬 A story idea", "🤝 Collab", "📈 FRROST project", "🎙️ Podcast / interview", "👋 Just saying hi"],
};

export const footer = {
  big: "FOR GOOD, TOWARDS GREATNESS.",
  line: "Think Beyond Default.",
  made: "Made in India 🇮🇳 with too much chai and a lot of AI.",
};

export const about = {
  title: ["HI, I'M", "ADITYA. 👋"],
  intro: "I'm a Creative AI Operator from India. I make videos, build AI systems, run a growth company and host a club for people who refuse to live on autopilot.",
  scrub: "I don't want to be followed for one topic. I want people to come back because of how I think, how I tell stories and who I am. Some weeks that's an AI build, some weeks it's a forgotten piece of history. The thread is the same: curiosity, taste, and the belief that one good story can change a decision.",
  hot: ["how", "think,", "one", "story"],
  mission: ["THINK DIFFERENTLY.", "FEEL DEEPLY.", "LEARN CONTINUOUSLY.", "CREATE BOLDLY.", "QUESTION ASSUMPTIONS.", "BUILD LIVES THAT MATTER."],
  beliefs: [
    { emoji: "👅", title: "Taste is the moat.", body: "AI made average output free. Knowing what's worth making didn't get cheaper.", tone: "yellow" },
    { emoji: "📖", title: "Stories change decisions.", body: "Facts inform. Stories move. I'd rather move one person than inform a thousand.", tone: "red" },
    { emoji: "🛠️", title: "Build in public.", body: "Show the draft, the mistake and the fix. The receipts are the content.", tone: "mint" },
    { emoji: "🧭", title: "Curiosity is the job.", body: "The best ideas come from following a question somewhere you didn't plan to go.", tone: "cyan" },
    { emoji: "🔁", title: "Compounding beats intensity.", body: "Small things, repeated. Not big things attempted once.", tone: "fuchsia" },
    { emoji: "🫂", title: "Nobody builds alone.", body: "You become the room you're in. So I'm building a better room.", tone: "sea" },
  ] as { emoji: string; title: string; body: string; tone: Tone }[],
  now: ["🎬 Making Beyond Default", "📈 Building FRROST Media", "🫂 Growing Thinking Beyond Club", "🤖 Shipping AI systems every week", "📚 Reading whatever makes me curious"],
};
