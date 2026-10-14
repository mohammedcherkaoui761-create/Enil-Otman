import { useState } from "react";
import { ArrowUpRight, Circle, Terminal as TerminalIcon } from "lucide-react";
import { SectionScene } from "@/components/SectionScene";
import { profile } from "@/data/profile";

const shortcuts = ["help", "whoami", "skills", "experience", "contact"];

function responseFor(command) {
  const [name] = command.trim().toLowerCase().split(/\s+/);
  switch (name) {
    case "help":
      return ["Available commands:", "whoami       engineer profile", "skills       languages, frameworks, and tools", "experience   career timeline", "contact      contact details", "clear        clear this terminal"];
    case "whoami":
      return ["Enil Otman", "Computer engineer · Web & mobile development", "Based in Tangier, Morocco · Open to opportunities"];
    case "skills":
      return profile.skills.map(({ group, items }) => `${group.padEnd(20)} ${items}`);
    case "experience":
      return profile.experience.map(({ date, role, company }) => `${date.padEnd(16)} ${role} · ${company}`);
    case "contact":
      return [`email      ${profile.email}`, `phone      ${profile.phone}`, `location   ${profile.location}`];
    case "clear":
      return [];
    case "sudo":
      return ["Nice try. This portfolio runs in a read-only sandbox.", "Try `help` to see what you can explore."];
    case "":
      return [];
    default:
      return [`command not found: ${name}`, "Type `help` to list available commands."];
  }
}

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const execute = (raw) => {
    const command = raw.trim();
    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    setHistory((items) => [...items, { command, output: responseFor(command) }]);
    setInput("");
  };
  return (
    <section id="terminal" className="terminal-section section-block">
      <SectionScene variant="terminal" />
      <div className="section-wrap terminal-layout">
        <div className="terminal-intro">
          <p className="eyebrow section-index">01 / INTERACTIVE PROFILE</p>
          <h2>A résumé is static.<br /><i>Try the command line.</i></h2>
          <p>Explore my skills and experience from a small portfolio shell. Type a command or pick one to get started.</p>
          <div className="terminal-command-list">{shortcuts.map((command) => <button key={command} type="button" onClick={() => execute(command)}><span>$</span> {command}</button>)}</div>
          <a className="terminal-cv-link" href={profile.cv} target="_blank" rel="noreferrer">Full résumé <ArrowUpRight size={15} /></a>
        </div>
        <div className="terminal-window">
          <div className="terminal-titlebar"><div className="terminal-dots"><Circle /><Circle /><Circle /></div><span><TerminalIcon size={13} /> enil@portfolio: ~</span><span className="terminal-secure">LOCAL SESSION</span></div>
          <div className="terminal-screen" aria-label="Interactive portfolio command line">
            <p className="terminal-welcome">Enil Otman · Portfolio CLI <span>v1.0.0</span></p>
            <p className="terminal-hint">Type <code>help</code> to explore available commands.</p>
            <div className="terminal-output" role="log" aria-live="polite">
              {history.map((entry, index) => <div className="terminal-entry" key={`${index}-${entry.command}`}>
                <p className="terminal-prompt"><b>enil@portfolio</b><span>:</span><i>~</i><span>$</span> {entry.command || <>&nbsp;</>}</p>
                {entry.output.map((line, lineIndex) => <p className="terminal-line" key={`${line}-${lineIndex}`}>{line}</p>)}
              </div>)}
            </div>
            <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); execute(input); }}>
              <label htmlFor="portfolio-command"><b>enil@portfolio</b><span>:</span><i>~</i><span>$</span></label>
              <input id="portfolio-command" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" aria-label="Enter a portfolio command" />
              <span className="terminal-cursor" aria-hidden="true" />
            </form>
          </div>
          <div className="terminal-status"><span>portfolio-shell</span><span>UTF-8</span><span>READ ONLY</span></div>
        </div>
      </div>
    </section>
  );
}
