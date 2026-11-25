"use client";

import { Fragment, useState } from "react";
import { site } from "@/content/site";

export default function SystemDiagram() {
  const { nodes } = site.system;
  const [activeId, setActiveId] = useState(nodes[0].id);
  const active = nodes.find((n) => n.id === activeId)!;

  return (
    <figure className="system" data-reveal>
      <figcaption>Tap a layer to see what it does</figcaption>
      <div className="system-path">
        {nodes.map((n, i) => (
          <Fragment key={n.id}>
            <button className="system-node" aria-pressed={n.id === activeId} onClick={() => setActiveId(n.id)}>
              <small>{n.layer}</small>
              {n.label}
            </button>
            {i < nodes.length - 1 && (
              <span className="system-wire" aria-hidden="true">
                <i style={{ animationDelay: `${i * 0.5}s` }} />
              </span>
            )}
          </Fragment>
        ))}
      </div>
      <p className="system-detail" aria-live="polite">
        <strong>{active.label}.</strong> {active.detail}
      </p>
    </figure>
  );
}
