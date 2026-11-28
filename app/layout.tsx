import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { isTodo, site } from "@/content/site";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const title = `${site.name}, ${site.role}`;
const description = site.summary;
const image = { url: "/og-image.jpg", width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  metadataBase: isTodo(site.url) ? undefined : new URL(site.url),
  title,
  description,
  // The card shown when the link is shared on LinkedIn, WhatsApp, Slack, X, etc.
  openGraph: { type: "website", url: "/", siteName: site.name, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const viewport: Viewport = {
  themeColor: "#111315",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
