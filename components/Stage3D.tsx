"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import CodeCloud from "./CodeCloud";

const MOBILE_QUERY = "(max-width: 900px)";

/** Where the photo's centre sits across the screen, from 0 (left edge) to 1 (right edge). */
function usePhotoCentre() {
  const [centre, setCentre] = useState(0.79);
  useEffect(() => {
    const read = () => {
      const photo = document.querySelector<HTMLElement>(".portrait");
      if (!photo) return;
      const box = photo.getBoundingClientRect();
      setCentre((box.left + box.width / 2) / window.innerWidth);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return centre;
}

/** The small, faint code lines that drift behind the photo, centred on it. */
function Scene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const width = useThree((s) => s.viewport.width);
  const centre = usePhotoCentre();
  const scale = mobile ? Math.min(0.56, width * 0.19) : Math.min(1.1, width * 0.12);
  const screenY = mobile ? 1.4 : 0.25;
  return (
    <group position={[mobile ? 0 : (centre - 0.5) * width, screenY - 0.75 * scale, 0]} scale={scale} rotation={[0.08, 0, 0]}>
      <CodeCloud reduced={reduced} mobile={mobile} />
    </group>
  );
}

function canUseWebGL() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function Stage3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [env, setEnv] = useState<{ mobile: boolean; reduced: boolean; webgl: boolean } | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setEnv({ mobile: mobile.matches, reduced: motion.matches, webgl: canUseWebGL() });
    read();
    mobile.addEventListener("change", read);
    motion.addEventListener("change", read);
    return () => {
      mobile.removeEventListener("change", read);
      motion.removeEventListener("change", read);
    };
  }, []);

  // On phones the canvas scrolls away with the hero, so stop rendering once it's gone.
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stage" ref={wrap} aria-hidden="true">
      {env?.webgl && (
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={env.mobile ? [1, 1.5] : [1, 2]}
          camera={{ fov: 35, position: [0, 0, 9] }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Scene mobile={env.mobile} reduced={env.reduced} />
        </Canvas>
      )}
    </div>
  );
}
