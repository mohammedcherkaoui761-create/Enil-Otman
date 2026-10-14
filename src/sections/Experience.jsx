import { BriefcaseBusiness } from "lucide-react";
import { SectionScene } from "@/components/SectionScene";
import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="experience-section section-wrap section-block">
      <SectionScene variant="experience" />
      <div className="section-heading"><div><p className="eyebrow section-index">03 / CAREER LOG</p><h2>Learning by<br />making things.</h2></div><BriefcaseBusiness className="heading-icon" size={32} strokeWidth={1.3} /></div>
      <div className="timeline">{profile.experience.map((item) => <article className="timeline-item" key={`${item.company}-${item.date}`}><div className="timeline-date">{item.date}</div><div className="timeline-dot" /><div className="timeline-content"><p className="eyebrow timeline-type">{item.type} · {item.company}</p><h3>{item.role}</h3><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div>
    </section>
  );
}
