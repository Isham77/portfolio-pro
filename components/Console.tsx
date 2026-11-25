"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { isTodo, resumeHref, site } from "@/content/site";

type Line = { kind: "in" | "out"; text: string };

const known = (items: string[]) => items.filter((s) => !isTodo(s));

const GREETING: Line[] = [{ kind: "out", text: "ismail@portfolio. Type a command, or tap one below." }];
const QUICK = ["whoami", "projects", "skills", "resume", "sudo hire"];

export default function Console() {
  const [lines, setLines] = useState<Line[]>(GREETING);
  const [value, setValue] = useState("");
  const screen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight;
  }, [lines]);

  const commands: Record<string, () => string | string[]> = {
    help: () => "whoami  projects  experience  skills  resume  clear",
    whoami: () => `${site.name}. ${site.role}. ${site.statement}`,
    projects: () => site.projects.map((p) => `${p.code}  ${p.name}`),
    experience: () => site.experience.map((j) => j.company),
    skills: () => known(site.skills.flatMap((g) => g.items)).join(", "),
    resume: () => {
      const a = document.createElement("a");
      a.href = resumeHref;
      a.download = "";
      a.click();
      return "Downloading resume PDF.";
    },
    "sudo hire": () => "Permission granted. My contact details are right here.",
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const result = commands[cmd]?.() ?? `command not found: ${cmd}. Try "help".`;
    const out = (Array.isArray(result) ? result : [result]).map<Line>((text) => ({ kind: "out", text }));
    setLines((prev) => [...prev, { kind: "in", text: raw.trim() }, ...out]);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  return (
    <div className="console">
      <div className="console-screen" ref={screen} role="log">
        {lines.map((l, i) => (
          <p key={i} className={l.kind}>
            {l.text}
          </p>
        ))}
      </div>
      <form onSubmit={submit}>
        <label htmlFor="console-input">$</label>
        <input
          id="console-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help"
        />
      </form>
      <div className="console-quick">
        {QUICK.map((c) => (
          <button key={c} onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
