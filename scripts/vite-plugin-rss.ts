/**
 * Vite plugin: generates /public/rss.xml from src/lib/podcastData.ts
 * on dev-server start and at build time. No new episodes require manual RSS edits.
 */
import type { Plugin } from "vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://fom.xyz";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface Ep {
  slug: string;
  name: string;
  overview: string;
  desc: string;
  date: string;
  duration: string;
  comingSoon: boolean;
}

function parseEpisodes(root: string): Ep[] {
  const src = readFileSync(resolve(root, "src/lib/podcastData.ts"), "utf-8");
  const eps: Ep[] = [];

  // Split on each episode object start
  const blocks = src.split(/\{\s*\n\s*id:\s*\d+/).slice(1);

  for (const b of blocks) {
    const str = (k: string) => {
      const m = b.match(new RegExp(`${k}:\\s*["']([^"']*?)["']`));
      return m?.[1] ?? "";
    };
    const comingSoon = /comingSoon:\s*true/.test(b);
    const slug = str("slug");
    if (!slug) continue;

    // Extract first paragraph of fullDescription
    const fdMatch = b.match(/fullDescription:\s*[`"]([\s\S]*?)[`"]\s*,/);
    const firstP = fdMatch?.[1]?.split(/\n\n/)[0]?.trim().replace(/\\n/g, " ") ?? "";

    eps.push({
      slug,
      name: str("name"),
      overview: str("overview"),
      desc: firstP || str("overview"),
      date: str("publishedDate"),
      duration: str("duration"),
      comingSoon,
    });
  }
  return eps;
}

function generate(root: string) {
  const eps = parseEpisodes(root)
    .filter((e) => !e.comingSoon && e.date && e.date !== "Coming Soon")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items = eps
    .map(
      (e) => `    <item>
      <title>${esc(`${e.name}: ${e.overview}`)}</title>
      <link>${SITE_URL}/podcast/${e.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/podcast/${e.slug}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <description>${esc(e.desc)}</description>${e.duration ? `\n      <itunes:duration>${e.duration.replace(" min", ":00")}</itunes:duration>` : ""}
      <itunes:author>Future of Marketing</itunes:author>
    </item>`
    )
    .join("\n\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Future of Marketing</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Future of Marketing explores how B2B marketing teams are actually using AI at work. Each episode features honest conversations with CMOs, growth leaders, and operators about real workflows, real decisions, and the trade-offs involved in AI adoption across GTM, content, SEO, analytics, and revenue teams.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Future of Marketing. All rights reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>XYZ Venture Capital, Upside, Graphite Growth</itunes:author>
    <itunes:category text="Business">
      <itunes:category text="Marketing" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${SITE_URL}/images/og-homepage.png" />
    <image>
      <url>${SITE_URL}/images/og-homepage.png</url>
      <title>Future of Marketing</title>
      <link>${SITE_URL}</link>
    </image>

${items}

  </channel>
</rss>
`;

  writeFileSync(resolve(root, "public/rss.xml"), xml, "utf-8");
  console.log(`✅ RSS feed generated with ${eps.length} episodes`);
}

export function rssPlugin(): Plugin {
  let root = "";
  return {
    name: "vite-plugin-rss",
    configResolved(c) { root = c.root; },
    buildStart() { generate(root); },
    configureServer() { generate(root); },
  };
}
