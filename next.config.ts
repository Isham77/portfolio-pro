import type { NextConfig } from "next";

const config: NextConfig = {
  // Static export: the `out/` folder can be hosted on Vercel, Netlify, GitHub Pages or any web host.
  output: "export",
  serverExternalPackages: ["@react-pdf/renderer"],
  turbopack: {
    // This project sits inside the Classic portfolio's folder, so pin the root here rather than the parent.
    root: process.cwd(),
  },
  experimental: {
    // node_modules is a link to the fast C: drive; let Turbopack follow it there.
    turbopackAdditionalRoots: {
      deps: { path: "C:/Users/hp/dev-deps/portfolio-pro" },
    },
  },
};

export default config;
