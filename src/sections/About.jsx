import { Sparkles } from "lucide-react";
import { AboutScene } from "@/components/AboutScene";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="about-section section-block">
      <AboutScene />
      <div className="section-wrap about-layout">
        <div className="about-lead">
          <p className="eyebrow section-index">02 / HOW I THINK</p>
          <h2>Good software<br />starts with <i>listening.</i></h2>
          <p className="about-copy">I&apos;m a recent engineering graduate who enjoys taking a messy, real-world problem and finding its simplest useful shape. I&apos;ve worked with industrial teams, supported client projects, and learned to care as much about the person using the software as the code behind it.</p>
          <p className="about-copy">Curious by nature and steady in a team, I like moving between details—data, edge cases, and business rules—and the bigger picture of how a product feels to use.</p>
          <a className="text-link" href={`mailto:${profile.email}`}>Start a conversation ↗</a>
        </div>
        <div className="skills-panel">
          <div className="skills-title"><Sparkles size={17} /><span>TOOLKIT</span></div>
          {profile.skills.map((skill) => <div className="skill-row" key={skill.group}><span>{skill.group}</span><p>{skill.items}</p></div>)}
          <div className="language-row">{profile.languages.map((language) => <span key={language}>{language}</span>)}</div>
        </div>
      </div>
    </section>
  );
}
