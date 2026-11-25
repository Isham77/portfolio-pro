"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { isTodo, site } from "@/content/site";

const W = 1024;
const H = 76;
const WORLD_W = 3.6;
const WORLD_H = (WORLD_W * H) / W;
const COLOR = { base: "#ece6da", keyword: "#d6a45b", string: "#a9c9a0", call: "#e58a5c", comment: "#868d93" };

const skills = site.skills.flatMap((g) => g.items).filter((s) => !isTodo(s));
const skillLines: string[] = [];
for (let i = 0; i < skills.length; i += 2) {
  skillLines.push("  " + skills.slice(i, i + 2).map((s) => `"${s}"`).join(", ") + ",");
}

/** The code that floats behind the photo for each page section, in scroll order. */
const SNIPPETS: string[][] = [
  ["const developer = {", `  name: "${site.name}",`, `  role: "${site.role}",`, "};", "developer.startBuilding();"],
  ["const projects = [", ...site.projects.slice(0, 4).map((p) => `  "${p.short}",`), "];", "projects.forEach(ship);"],
  ["const atm = connect(", `  "React UI",`, `  "WebView2",`, `  "ATM device",`, ");", "atm.exchange(bills);"],
  ["const experience = [", ...site.experience.map((j) => `  "${j.company}",`), "];", "keepLearning(experience);"],
  ["const skills = [", ...skillLines.slice(0, 3), "];", "// always adding more"],
  [`await sayHello("${site.firstName}");`, "// let's build something", "resume.download();"],
];

const AMBIENT = [
  "npm run build",
  "git commit -m \"ship it\"",
  "if (connected) render();",
  "await device.ready();",
  "return <App />;",
  "dotnet run --release",
  "export default Bridge;",
  "for (const port of ports) {",
  "useEffect(() => sync(), []);",
  "git push origin main",
  "const data = await fetch(api);",
  "console.log(\"it works\");",
];

const TOKEN = /("[^"]*")|(\/\/.*)|\b(const|await|return|export|default|for|if)\b|([A-Za-z_]\w*)(?=\()/g;

function spans(line: string) {
  const out: { text: string; color: string }[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), color: COLOR.base });
    out.push({ text: m[0], color: m[1] ? COLOR.string : m[2] ? COLOR.comment : m[3] ? COLOR.keyword : COLOR.call });
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push({ text: line.slice(last), color: COLOR.base });
  return out;
}

function drawLine(g: CanvasRenderingContext2D, line: string, chars: number) {
  g.clearRect(0, 0, W, H);
  const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono");
  g.font = `500 50px ${mono}, Consolas, monospace`;
  g.textBaseline = "middle";
  const cw = g.measureText("M").width;
  let left = chars;
  let x = 4;
  for (const s of spans(line)) {
    if (left <= 0) break;
    const text = s.text.slice(0, left);
    g.fillStyle = s.color;
    g.fillText(text, x, H / 2);
    x += text.length * cw;
    left -= text.length;
  }
}

function useLineTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { g: canvas.getContext("2d")!, texture };
  }, []);
}

/** Staggered starting points, so the lines don't read as one rigid block. */
const OFFSETS = [-1.9, -1.35, -1.75, -1.2, -1.85, -1.5];

function TypedLine({
  line,
  row,
  offset,
  startedAt,
  reduced,
}: {
  line: string;
  row: number;
  offset: number;
  startedAt: React.RefObject<number>;
  reduced: boolean;
}) {
  const { g, texture } = useLineTexture();
  const mesh = useRef<THREE.Mesh>(null!);
  const drawn = useRef(-1);
  const baseY = 3 - row * 0.52;
  const baseX = OFFSETS[row % OFFSETS.length] + WORLD_W / 2;

  useEffect(() => {
    drawn.current = -1;
  }, [line]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const chars = reduced ? line.length : Math.max(0, Math.min(line.length, Math.floor((t - startedAt.current) * 34 - offset)));
    if (chars !== drawn.current) {
      drawn.current = chars;
      drawLine(g, line, chars);
      texture.needsUpdate = true;
    }
    if (!reduced) {
      mesh.current.position.y = baseY + Math.sin(t * 0.7 + row * 1.3) * 0.045;
      mesh.current.position.x = baseX + Math.sin(t * 0.45 + row) * 0.04;
    }
  });

  return (
    <mesh ref={mesh} position={[baseX, baseY, -1.15 - (row % 3) * 0.3]}>
      <planeGeometry args={[WORLD_W, WORLD_H]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function AmbientLine({ line, index, reduced }: { line: string; index: number; reduced: boolean }) {
  const { g, texture } = useLineTexture();
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.MeshBasicMaterial>(null!);
  const seed = useMemo(
    () => ({
      x: ((index * 37) % 11) * 0.3 - 1.65,
      z: -3 - ((index * 13) % 5) * 0.5,
      phase: ((index * 53) % 17) / 17,
      speed: 0.018 + ((index * 7) % 5) * 0.004,
    }),
    [index],
  );

  // Waits for the web font, or the first draw falls back to a font with different spacing.
  useEffect(() => {
    let cancelled = false;
    const draw = () => {
      if (cancelled) return;
      drawLine(g, line, line.length);
      texture.needsUpdate = true;
    };
    document.fonts.ready.then(draw, draw);
    return () => {
      cancelled = true;
    };
  }, [g, line, texture]);

  useFrame(({ clock }) => {
    const p = reduced ? seed.phase : (seed.phase + clock.elapsedTime * seed.speed) % 1;
    mesh.current.position.y = -2.4 + p * 5.8;
    // Fades at the top and bottom so lines never pop in or out.
    material.current.opacity = Math.min(1, Math.min(p, 1 - p) * 6) * 0.3;
  });

  return (
    <mesh ref={mesh} position={[seed.x + (WORLD_W / 2) * 0.72, 0, seed.z]} scale={0.72}>
      <planeGeometry args={[WORLD_W, WORLD_H]} />
      <meshBasicMaterial ref={material} map={texture} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

export default function CodeCloud({ section, reduced, mobile }: { section: number; reduced: boolean; mobile: boolean }) {
  const lines = SNIPPETS[Math.min(section, SNIPPETS.length - 1)];
  const startedAt = useRef(0);
  const pending = useRef(true);

  useEffect(() => {
    pending.current = true;
  }, [section]);

  useFrame(({ clock }) => {
    if (!pending.current) return;
    pending.current = false;
    startedAt.current = clock.elapsedTime;
  });

  let offset = 0;
  return (
    <group>
      {(mobile ? AMBIENT.slice(0, 5) : AMBIENT).map((line, i) => (
        <AmbientLine key={line} line={line} index={i} reduced={reduced} />
      ))}
      {lines.map((line, row) => {
        const at = offset;
        offset += line.length + 2;
        return <TypedLine key={`${section}-${row}`} line={line} row={row} offset={at} startedAt={startedAt} reduced={reduced} />;
      })}
    </group>
  );
}
