import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SectionScene } from "@/components/SectionScene";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <SectionScene variant="contact" />
      <div className="section-wrap contact-inner">
      <p className="eyebrow">05 / YOUR TURN</p>
      <h2>Have something<br />good in <i>mind?</i></h2>
      <p className="contact-copy">I&apos;m looking for a team and a challenge where thoughtful engineering can make a difference. I&apos;d be glad to hear what you&apos;re building.</p>
      <a className="button button-light" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={17} /></a>
      <div className="contact-details"><a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a><a href="tel:+212665256496"><Phone size={16} /> {profile.phone}</a><span><MapPin size={16} /> {profile.location}</span></div>
      <div className="contact-coordinate">35°46′ N · 5°49′ W</div>
      </div>
    </section>
  );
}
