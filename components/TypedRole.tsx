"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Types each role, pauses, erases it, and moves to the next. */
export default function TypedRole() {
  const [text, setText] = useState(site.roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0;
    let shown = site.roles[0].length;
    let erasing = true;
    let timer = 0;
    const step = () => {
      const word = site.roles[role];
      if (erasing) {
        shown -= 1;
        if (shown <= 0) {
          erasing = false;
          role = (role + 1) % site.roles.length;
        }
      } else {
        shown += 1;
        if (shown >= site.roles[role].length) {
          erasing = true;
          setText(site.roles[role]);
          timer = window.setTimeout(step, 2200);
          return;
        }
      }
      setText((erasing ? word : site.roles[role]).slice(0, shown));
      timer = window.setTimeout(step, erasing ? 40 : 75);
    };
    timer = window.setTimeout(step, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="typed" aria-label={site.roles.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <i aria-hidden="true" />
    </span>
  );
}
