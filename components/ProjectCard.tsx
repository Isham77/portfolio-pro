"use client";

import { useId, useState } from "react";
import { Project, shown, visible } from "@/content/site";
import T from "./T";

const CASE_FIELDS = [
  ["problem", "Context"],
  ["built", "What I built"],
  ["contribution", "My role"],
  ["challenge", "Key engineering"],
  ["result", "Outcome"],
] as const;

/** A compact project card; the full case study opens when "View case study" is clicked. */
export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    // Open state lives in data-open, not className: React rewriting className would drop the "is-in"
    // class that the scroll fade-in adds, and the card would vanish.
    <article className="card project" data-open={open} data-reveal>
      <div className="chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{p.file}</span>
        <em>{p.kind}</em>
      </div>
      <div className="project-body">
        <span className="project-num" aria-hidden="true">
          {p.code}
        </span>
        <h3>{p.name}</h3>
        <p className="project-tag">
          <T>{p.tagline}</T>
        </p>
        <ul className="tags">
          {shown(p.stack).map((s) => (
            <li key={s}>
              <T>{s}</T>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="project-toggle"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide case study" : "View case study"}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div className="project-details" id={detailsId} inert={!open}>
          <div className="project-details-inner">
            <dl className="case">
              {CASE_FIELDS.filter(([key]) => visible(p[key])).map(([key, label]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>
                    <T>{p[key]}</T>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}
