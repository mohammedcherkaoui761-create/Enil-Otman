import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["01", "Terminal", "#terminal"],
  ["02", "Approach", "#about"],
  ["03", "Experience", "#experience"],
  ["04", "Education", "#education"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={close} aria-label="Enil Otman home"><strong>EO<span>.</span></strong><small>ENGINEER / TANGIER</small></a>
      <div className="nav-availability"><i />Open to opportunities</div>
      <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
        {links.map(([index, label, href]) => <a key={href} href={href} onClick={close}><span>{index}</span>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={close}>Let&apos;s talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}
