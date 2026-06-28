import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/site/Chrome";
import { ContactForm } from "@/components/site/Forms";
import { PageHero, SectionHeading } from "@/components/site/UI";
import { socialLinks } from "@/lib/site-content";

export const metadata: Metadata = { title: "Contact Aditya Sahai", description: "Send Aditya Sahai a note about brand positioning, websites, content systems, AI workflows, FRROST Media, or collaboration.", alternates: { canonical: "/contact" } };
export default function ContactPage(){return <SiteShell><main><PageHero eyebrow="CONTACT" title="Send a note." copy="Tell me what you are building, what feels unclear, and where you need sharper thinking."><div className="ice-direct-links ice-direct-light"><a href="mailto:adityasahai037@gmail.com"><Mail size={17}/>Email</a><a href="https://wa.me/916207126091" target="_blank" rel="noreferrer"><MessageCircle size={17}/>WhatsApp</a></div></PageHero><section className="ice-page-section"><div className="ice-container ice-contact-page-grid"><div><SectionHeading label="DIRECT COLLABORATION" title="Let’s see if it fits." copy="I’m currently opening space for selected early projects. A clear note is the best place to start. There is no hard sell and no obligation." /><div className="ice-footer-links ice-contact-socials">{socialLinks.map(([label,href])=><a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>)}</div></div><ContactForm source="contact-page" /></div></section></main></SiteShell>}
