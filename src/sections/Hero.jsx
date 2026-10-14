import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Compass } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { profile } from "@/data/profile";

export function Hero() {
  const photoCandidates = ["/enil-otman-portrait.jpg", "/enil-otman.png", "/enil-otman.jpg", "/enil-otman.jpeg", "/enil-otman.webp"];
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoSrc = photoCandidates[photoIndex];
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const handlePhotoError = () => {
    if (photoIndex < photoCandidates.length - 1) setPhotoIndex((index) => index + 1);
    else setPhotoFailed(true);
  };
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="availability-dot" /> COMPUTER ENGINEER · TANGIER, MOROCCO</p>
        <h1>Engineering<br /><span>with intent.</span></h1>
        <p className="hero-intro">I&apos;m Enil Otman, a computer engineer focused on web and mobile development. I turn real-world needs into clear, dependable digital tools.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#terminal">Enter my workspace <ArrowDownRight size={18} /></a>
          <a className="text-link" href={profile.cv} target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={16} /></a>
        </div>
        <div className="hero-foot"><span>OPEN TO NEW OPPORTUNITIES</span><span>35°46&apos; N&nbsp;&nbsp; 5°49&apos; W</span></div>
      </div>
      <div className="hero-art">
        <HeroScene />
        <div className="portrait-frame">
          <div className="portrait-arch">
            <div className="portrait-grid" />
            {!photoFailed && <img className={photoLoaded ? "portrait-photo portrait-photo-ready" : "portrait-photo"} src={photoSrc} alt="Enil Otman" onLoad={() => setPhotoLoaded(true)} onError={handlePhotoError} />}
            {!photoLoaded && <div className="portrait-initials">EO</div>}
            <span className="portrait-caption">ENIL OTMAN <span>· COMPUTER ENGINEER</span></span>
          </div>
        </div>
        <div className="art-note"><Compass size={17} /><span>Building for people,<br />grounded in the details.</span></div>
        <div className="hero-stamp">EST.<br /><b>2021</b><br />MA · 35.7°N</div>
        <div className="hero-chip chip-angular">&lt; /&gt; <span>Angular</span></div>
        <div className="hero-chip chip-database">◉ <span>Data + systems</span></div>
      </div>
      <a className="scroll-cue" href="#terminal"><span>SCROLL TO EXPLORE</span><span>↓</span></a>
    </section>
  );
}
