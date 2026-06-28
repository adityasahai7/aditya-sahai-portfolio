import type { Metadata } from "next";
import { NewsletterForm } from "@/components/site/Forms";
import { SiteShell } from "@/components/site/Chrome";
import { PageHero, SectionHeading } from "@/components/site/UI";

export const metadata: Metadata = {
  title: { absolute: "Thinking Beyond Letter — Newsletter by Aditya Sahai" },
  description: "A Sunday letter for Indian operators building beyond average: one creative build, one sharp lesson, and three signals worth your attention.",
  alternates: { canonical: "/newsletter" },
};

const promiseCards = [
  ["01", "One Creative Build", "A real build, experiment, workflow, website, content system, or brand idea I’m working through."],
  ["02", "One Sharp Lesson", "A useful idea from AI, branding, storytelling, content, sales pages, or operator life."],
  ["03", "Three Signals", "Tools, videos, essays, campaigns, brands, creators, or examples worth studying."],
] as const;

const newsletterFaqs = [
  ["How often do you send it?", "Once a week, usually on Sunday. I only send when there is something useful to share."],
  ["Is it free?", "Yes. Thinking Beyond Letter is free."],
  ["What do you write about?", "AI, branding, content, websites, business, creative systems, and the practical lessons behind what I am building."],
  ["Is this just AI news?", "No. There are enough tool round-ups already. This is about taste, systems, story, execution, and useful signal."],
  ["Can I unsubscribe?", "Yes. You can unsubscribe at any time or email me directly and I will remove your address."],
  ["Who is it for?", "Young operators, founders, creators, students, and agency builders who care about sharper thinking and better execution."],
] as const;

export default function NewsletterPage() {
  return (
    <SiteShell>
      <main>
        <PageHero eyebrow="THINKING BEYOND LETTER" title="A Sunday letter for people building beyond average." copy="Every week, I send one creative build, one sharp lesson, and three things worth your attention — across AI, branding, content, websites, business, and operator thinking.">
          <NewsletterForm source="newsletter" sourceComponent="hero-form" />
        </PageHero>

        <section className="ice-page-section">
          <div className="ice-container">
            <SectionHeading label="THE READER PROMISE" title="Useful enough to keep opening." copy="A compact field note designed to give you one thing to build, one thing to think about, and three signals to study." />
            <div className="ice-newsletter-promise-grid">
              {promiseCards.map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="ice-page-section is-dark">
          <div className="ice-container ice-newsletter-not-grid">
            <div><p className="ice-section-label">WHAT THIS IS NOT</p><h2>Signal, without the creator theatre.</h2></div>
            <ul><li>This is not generic AI news.</li><li>This is not motivation.</li><li>This is not “10 tools you must try.”</li><li>This is not fake founder advice.</li></ul>
          </div>
        </section>

        <section className="ice-page-section is-tint">
          <div className="ice-container ice-sample-issue-wrap">
            <SectionHeading label="SAMPLE ISSUE" title="See the shape of a Sunday." copy="The format stays tight. The thinking goes deep." />
            <article className="ice-sample-issue">
              <header><span>ISSUE 001</span><b>THINKING BEYOND LETTER</b></header>
              <div><p>TASTE IS THE MOAT</p><h2>AI made average output free. What happens next?</h2></div>
              <ol>
                <li><b>Build</b><span>Rewriting a personal brand homepage from generic to sharp.</span></li>
                <li><b>Lesson</b><span>Why AI made average output free.</span></li>
                <li><b>Signals</b><span>One brand, one creator, and one website worth studying.</span></li>
              </ol>
              <a href="#join-the-letter">Join to get the next one</a>
            </article>
          </div>
        </section>

        <section className="ice-page-section">
          <div className="ice-container">
            <SectionHeading label="WHO IT IS FOR" title="People building seriously." />
            <div className="ice-newsletter-audience">{["Young operators", "Founders", "Creators", "Serious students", "Agency builders", "People learning AI, branding, content, and business", "People who care about taste and execution"].map((item) => <span key={item}>{item}</span>)}</div>
            <p className="ice-newsletter-honesty">I’m early. This letter is part of the build-in-public journey.</p>
          </div>
        </section>

        <section className="ice-page-section is-tint" id="join-the-letter">
          <div className="ice-container ice-newsletter-grid">
            <div><p className="ice-section-label">JOIN THE LETTER</p><h2>One build. One lesson. Three signals.</h2><p>No spam. No generic AI news. No fake guru advice.</p></div>
            <NewsletterForm source="newsletter" sourceComponent="bottom-form" />
          </div>
        </section>

        <section className="ice-page-section ice-faq-section">
          <div className="ice-container"><SectionHeading label="FAQ" title="Before you join." /><div className="ice-faq-list">{newsletterFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
        </section>
      </main>
    </SiteShell>
  );
}
