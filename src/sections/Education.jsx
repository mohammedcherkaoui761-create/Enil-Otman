import { GraduationCap } from "lucide-react";
import { SectionScene } from "@/components/SectionScene";
import { profile } from "@/data/profile";

export function Education() {
  return (
    <section id="education" className="education-section section-block">
      <SectionScene variant="education" />
      <div className="section-wrap">
        <div className="section-heading"><div><p className="eyebrow section-index">04 / FOUNDATION</p><h2>Curiosity, with<br />a framework.</h2></div><GraduationCap className="heading-icon" size={34} strokeWidth={1.3} /></div>
        <div className="education-grid">{profile.education.map((item) => <article className="education-card" key={item.place}><span>{item.years}</span><p>{item.place}</p><h3>{item.title}</h3></article>)}</div>
        <div className="quality-strip"><span>HOW I WORK</span><p>Project management <i>✳</i> Teamwork <i>✳</i> Creative problem-solving <i>✳</i> Adaptability</p></div>
      </div>
    </section>
  );
}
