import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="wordmark" href="#home">EO<span>.</span></a>
      <p>Built with care in Tangier, Morocco.</p>
      <a href={profile.cv}>Résumé <ArrowUpRight size={14} /></a>
      <span>© {new Date().getFullYear()} ENIL OTMAN</span>
    </footer>
  );
}
