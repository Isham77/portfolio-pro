"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const W = 1024;
const H = 76;
const WORLD_W = 3.6;
const WORLD_H = (WORLD_W * H) / W;
const COLOR = { base: "#ece6da", keyword: "#d6a45b", string: "#a9c9a0", call: "#e58a5c", comment: "#868d93" };

/** Small, faint lines of code that drift slowly upward behind the photo. */
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

function drawLine(g: CanvasRenderingContext2D, line: string) {
  g.clearRect(0, 0, W, H);
  const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono");
  g.font = `500 50px ${mono}, Consolas, monospace`;
  g.textBaseline = "middle";
  const cw = g.measureText("M").width;
  let x = 4;
  for (const s of spans(line)) {
    g.fillStyle = s.color;
    g.fillText(s.text, x, H / 2);
    x += s.text.length * cw;
  }
}

function AmbientLine({ line, index, reduced }: { line: string; index: number; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.MeshBasicMaterial>(null!);
  const { g, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { g: canvas.getContext("2d")!, texture };
  }, []);
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
      drawLine(g, line);
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

export default function CodeCloud({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  return (
    <group>
      {(mobile ? AMBIENT.slice(0, 5) : AMBIENT).map((line, i) => (
        <AmbientLine key={line} line={line} index={i} reduced={reduced} />
      ))}
    </group>
  );
}
