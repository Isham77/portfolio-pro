"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { resumeHref, site } from "@/content/site";
import Icon from "./Icons";
import Portrait from "./Portrait";
import Sheets from "./Sheets";

const Stage3D = dynamic(() => import("./Stage3D"), { ssr: false });

const LINKS = [
  ["about", "About"],
  ["services", "Services"],
  ["work", "Projects"],
  ["system", "Architecture"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

/** The quiet label under the photo, naming the section being read. */
const CAPTIONS: Record<string, string> = {
  about: "A bit about me",
  services: "What I do",
  work: "Selected work",
  system: "Architecture",
  experience: "Where I've worked",
  skills: "Skills and tools",
  contact: "Let's work together",
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLSpanElement>(null);

  // Scroll reveal: content fades up as it enters the screen.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Highlights the section being read, and fills the progress bar at the top.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const [id] of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const read = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${read})`;
      // The tracker line under the photo: fills red → amber → green as the page is read.
      document.querySelector<HTMLElement>(".portrait-track")?.style.setProperty("--read", String(read));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A faint glow that follows the mouse (desktop only; skipped for reduced motion).
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    root.classList.add("has-spot");
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
      root.classList.remove("has-spot");
    };
  }, []);

  const index = LINKS.findIndex(([id]) => id === active);
  const caption =
    index < 0 ? { no: "", title: "Scroll to explore" } : { no: String(index + 1).padStart(2, "0"), title: CAPTIONS[active] };

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <i className="glow glow-warm" />
        <i className="glow glow-cool" />
        <i className="spot" />
      </div>
      <Stage3D />
      <Portrait caption={caption} />

      <nav className="nav" aria-label="Main">
        <span className="progress" ref={progress} aria-hidden="true" />
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            {"</>"}
          </span>
          <span className="brand-text">
            <strong>{site.name}</strong>
            <small>{site.role}</small>
          </span>
        </a>
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="btn btn-primary btn-small" href={resumeHref} download>
            Resume <Icon name="download" />
          </a>
          <button
            className="nav-menu"
            aria-expanded={menuOpen}
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <Sheets />
    </>
  );
}
