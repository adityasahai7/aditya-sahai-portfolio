import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { articles } from "@/lib/operator-content";
import {
  buildCards,
  collaborationCards,
  commandCards,
  faqs,
  processSteps,
  proofCards,
  signalLines,
  stackCards,
  worlds,
} from "@/lib/site-content";
import { ContactForm, NewsletterForm } from "@/components/site/Forms";
import { Badge, ButtonLink, IconCard, SectionHeading, StatusDot } from "@/components/site/UI";
import { SiteShell } from "@/components/site/Chrome";
import { TrackedExternalLink, TrackedInternalLink } from "@/components/site/Experience";
import { EXTERNAL_LINKS } from "@/lib/external-links";

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <Link className="ice-card ice-article-card" href={`/articles/${article.slug}`}>
      <div><Badge tone="quiet">{article.category}</Badge><span>{article.readingTime}</span></div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <small>{article.publishedAt} · {article.tags.slice(0, 2).join(" · ")}</small>
      <b>Read Article <ArrowRight size={16} /></b>
    </Link>
  );
}

function Hero() {
  return (
    <section className="ice-hero">
      <div className="ice-container ice-hero-grid">
        <div className="ice-hero-copy">
          <p className="ice-eyebrow">ADITYA SAHAI · CREATIVE AI OPERATOR · INDIA</p>
          <h1>I help founders turn <span>AI, taste, and storytelling</span> into sharper brands.</h1>
          <p>I’m Aditya Sahai, a Creative AI Operator from India. I build brand worlds, websites, content systems, sales stories, and AI-assisted creative workflows for people who want to look sharper, move faster, and sound less average.</p>
          <div className="ice-actions">
            <ButtonLink href="/contact">Work With Me</ButtonLink>
            <ButtonLink href="/articles" variant="secondary">Read My Thinking</ButtonLink>
            <ButtonLink href="/frrost-media" variant="moss">Learn About FRROST</ButtonLink>
          </div>
          <div className="ice-honesty-line"><StatusDot>Available for selected early projects</StatusDot><span>Early. Serious. Building in public.</span></div>
        </div>
        <div className="ice-command-panel">
          <div className="ice-command-top"><span>CREATIVE OPERATOR SYSTEM</span><i>LIVE SIGNAL</i></div>
          <div className="ice-portrait-command">
            <div className="ice-portrait-frame"><Image src="/images/aditya-photo.png" alt="Aditya Sahai, Creative AI Operator" width={322} height={292} priority /></div>
            <div><b>Aditya Sahai</b><span>Creative AI Operator</span><small>India · Building in public</small></div>
          </div>
          <div className="ice-command-grid">
            {commandCards.map(([title, meta, Icon]) => <article key={title}><Icon size={18} /><div><b>{title}</b><span>{meta}</span></div></article>)}
          </div>
          <div className="ice-command-belief"><span>CORE THESIS</span><b>AI made average output free. Taste is the moat.</b></div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = articles.filter((article) => article.featured).slice(0, 6);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": "https://adityasahai.com/#person", name: "Aditya Sahai", url: "https://adityasahai.com", jobTitle: "Creative AI Operator", image: "https://adityasahai.com/images/aditya-photo.png", sameAs: ["https://www.linkedin.com/in/aditya-sahai-6939b8362", "https://x.com/adityasahai07", "https://instagram.com/adityasahai37", "https://youtube.com/@adityasahai37"] },
      { "@type": "WebSite", "@id": "https://adityasahai.com/#website", name: "Aditya Sahai", url: "https://adityasahai.com", publisher: { "@id": "https://adityasahai.com/#person" } },
    ],
  };
  return (
    <SiteShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Hero />
        <section className="ice-signal-strip" aria-label="Core beliefs"><div className="ice-container">{signalLines.map((line) => <span key={line}>{line}</span>)}</div></section>

        <section className="ice-section" id="build">
          <div className="ice-container">
            <SectionHeading label="WHAT I BUILD" title="What I actually build." copy="Not tool tutorials. Not AI slop. I use AI as leverage for sharper thinking, better creative systems, and stronger business communication." />
            <div className="ice-grid ice-build-grid">{buildCards.map((card) => <IconCard key={card.title} {...card} />)}</div>
          </div>
        </section>

        <section className="ice-section ice-dark-section">
          <div className="ice-container">
            <SectionHeading invert label="THE OPERATING LOGIC" title="The creative operator stack." copy="AI can generate. It cannot decide what should exist. That is where taste, story, systems, and signal come in." />
            <div className="ice-stack-grid">{stackCards.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="ice-section ice-proof-section">
          <div className="ice-container">
            <SectionHeading label="THE OPERATOR LAB" title="Proof of thinking." copy="I’m still early, so I’m not going to pretend this is a wall of fake client results. This is where I show the way I think, build, design, write, break down brands, and create systems." />
            <div className="ice-grid ice-proof-grid">
              {proofCards.map(({ title, category, status, copy, icon: Icon }) => (
                <article className="ice-card ice-proof-card" key={title}>
                  <div className="ice-proof-top"><Badge tone="quiet">{category}</Badge><StatusDot>{status}</StatusDot></div>
                  <Icon size={26} strokeWidth={1.6} />
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
            <div className="ice-section-action"><ButtonLink href="/work" variant="secondary">Explore Builds, Experiments & Notes</ButtonLink></div>
          </div>
        </section>

        <section className="ice-section ice-worlds-section">
          <div className="ice-container">
            <SectionHeading label="THE ECOSYSTEM" title="Three worlds. One operating system." copy="The personal brand, studio, show, newsletter, and community connect into one larger creative operator ecosystem." />
            <div className="ice-world-grid">
              {worlds.map((world) => <article className={`ice-world-card ${world.className}`} key={world.title}><Badge tone={world.className === "ice-world-dark" ? "blue" : "dark"}>{world.label}</Badge><h3>{world.title}</h3><p>{world.copy}</p><div className="ice-world-actions">{world.title === "FRROST Media" ? <TrackedInternalLink href={world.href} eventName="frrost_learn_click">{world.cta}<ArrowRight size={16} /></TrackedInternalLink> : <Link href={world.href}>{world.cta}<ArrowRight size={16} /></Link>}{world.title === "FRROST Media" ? <TrackedExternalLink href={EXTERNAL_LINKS.frrostMedia} eventName="frrost_visit_click">Visit FRROST Media<ArrowRight size={16} /></TrackedExternalLink> : null}</div></article>)}
            </div>
          </div>
        </section>

        <section className="ice-section">
          <div className="ice-container">
            <SectionHeading label="PROCESS" title="How I work." copy="Every project starts with clarity. Then story. Then system. Then shipping." />
            <ol className="ice-process-list">{processSteps.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="ice-section ice-collaboration-section">
          <div className="ice-container">
            <SectionHeading label="DIRECT COLLABORATION" title="Work with me." copy="I’m currently opening space for selected early projects where sharp brand thinking, website storytelling, content systems, or AI-assisted creative workflows can make a real difference." />
            <div className="ice-grid ice-collaboration-grid">{collaborationCards.map((card) => <article className="ice-card ice-collaboration-card" key={card.title}><Badge tone="moss">Selected early project</Badge><h3>{card.title}</h3><p><b>For</b>{card.for}</p><p><b>Builds</b>{card.builds}</p><Link href="/contact">Let’s see if it fits <ArrowRight size={16} /></Link></article>)}</div>
          </div>
        </section>

        <section className="ice-section">
          <div className="ice-container">
            <SectionHeading label="PUBLIC THINKING" title="Read my thinking." copy="Essays on AI, branding, marketing, creative direction, content systems, sales pages, founder brands, and operator thinking." />
            <div className="ice-grid ice-articles-grid">{featured.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
            <div className="ice-section-action"><ButtonLink href="/articles" variant="secondary">Read All Articles</ButtonLink></div>
          </div>
        </section>

        <section className="ice-section ice-newsletter-section">
          <div className="ice-container ice-newsletter-grid">
            <div><p className="ice-section-label">THINKING BEYOND LETTER</p><h2>The Sunday read for Indian operators who refuse the default path.</h2><p>One creative build. One sharp lesson. Three things worth your attention.</p><ul><li>AI, branding, content, websites, and creative systems</li><li>Lessons from building FRROST Media</li><li>Brand, creator, page, and growth-system breakdowns</li><li>Honest notes from building in public</li></ul><small className="ice-newsletter-microcopy">No spam. No generic AI news. No fake guru advice.</small></div>
            <NewsletterForm source="homepage" sourceComponent="homepage-newsletter" />
          </div>
        </section>

        <section className="ice-section ice-faq-section">
          <div className="ice-container">
            <SectionHeading label="FAQ" title="Clear answers." />
            <div className="ice-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="ice-section ice-contact-section" id="contact">
          <div className="ice-container ice-contact-grid">
            <div><SectionHeading invert label="SEND A NOTE" title="Tell me what you’re building." copy="Tell me what feels unclear and where you need sharper thinking. I’ll read it properly and reply if it feels aligned." /><div className="ice-direct-links"><a href="mailto:adityasahai037@gmail.com"><Mail size={18} />Email</a><a href="https://wa.me/916207126091" target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a></div></div>
            <ContactForm source="homepage" />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
