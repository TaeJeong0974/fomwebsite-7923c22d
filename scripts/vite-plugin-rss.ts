/**
 * Vite plugin that generates public/rss.xml from podcastData at build time
 * and during dev server startup.
 */
import { Plugin } from "vite";
import { writeFileSync } from "fs";
import { resolve } from "path";

// We import the data inline to avoid TS path alias issues in the plugin context.
// This plugin re-reads the source file directly.

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRfc822(dateStr: string): string {
  // Handles "Jan 15, 2026" style dates
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toUTCString();
}

export function rssPlugin(): Plugin {
  let root = "";

  function generate() {
    // Dynamic import won't work for TS with aliases, so we read & eval the data
    // Use a fresh require each time by clearing cache
    const dataPath = resolve(root, "src/lib/podcastData.ts");
    
    // We'll use a simple approach: import the transpiled module
    // Since this runs in Node context during build, we parse the TS source
    const fs = require("fs");
    const source: string = fs.readFileSync(dataPath, "utf-8");
    
    // Extract published episodes from the static data
    // Parse the array by evaluating a simplified version
    const episodes = extractEpisodes(source);
    
    const SITE_URL = "https://fom.xyz";
    const now = new Date().toUTCString();
    
    const items = episodes
      .filter((ep) => !ep.comingSoon && ep.publishedDate !== "Coming Soon")
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .map((ep) => {
        const pubDate = formatRfc822(ep.publishedDate);
        return `    <item>
      <title>${escapeXml(ep.isIntro ? `${ep.name}: ${ep.overview}` : `${ep.name}: ${ep.overview}`)}</title>
      <link>${SITE_URL}/podcast/${ep.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/podcast/${ep.slug}</guid>${pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ""}
      <description>${escapeXml(ep.description)}</description>${ep.duration ? `\n      <itunes:duration>${ep.duration.replace(" min", ":00")}</itunes:duration>` : ""}
      <itunes:author>Future of Marketing</itunes:author>
    </item>`;
      })
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
    <lastBuildDate>${now}</lastBuildDate>
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

    const outPath = resolve(root, "public/rss.xml");
    writeFileSync(outPath, xml, "utf-8");
    console.log(`✅ RSS feed generated with ${episodes.filter((e) => !e.comingSoon && e.publishedDate !== "Coming Soon").length} episodes`);
  }

  return {
    name: "vite-plugin-rss",
    configResolved(config) {
      root = config.root;
    },
    buildStart() {
      generate();
    },
    configureServer() {
      // Also generate on dev server start
      generate();
    },
  };
}

interface EpisodeData {
  slug: string;
  name: string;
  overview: string;
  description: string;
  publishedDate: string;
  comingSoon: boolean;
  duration: string;
  isIntro: boolean;
}

function extractEpisodes(source: string): EpisodeData[] {
  const episodes: EpisodeData[] = [];
  
  // Match each episode object block in the array
  const episodeBlocks = source.split(/\{\s*\n\s*id:\s*\d+/).slice(1);
  
  for (const block of episodeBlocks) {
    const get = (key: string): string => {
      // Match key: "value" or key: 'value' or key: `value`
      const match = block.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]*?)["'\`]`));
      return match?.[1] ?? "";
    };
    
    const comingSoon = /comingSoon:\s*true/.test(block);
    const slug = get("slug");
    const name = get("name");
    const overview = get("overview");
    const publishedDate = get("publishedDate");
    const duration = get("duration");
    
    // Get fullDescription first paragraph as description
    const fullDescMatch = block.match(/fullDescription:\s*`([\s\S]*?)`/);
    const fullDesc = fullDescMatch?.[1] ?? "";
    const firstParagraph = fullDesc.split("\n\n")[0]?.trim() ?? overview;
    
    if (slug) {
      episodes.push({
        slug,
        name,
        overview,
        description: firstParagraph || overview,
        publishedDate,
        comingSoon,
        duration,
        isIntro: slug === "the-future-of-marketing",
      });
    }
  }
  
  return episodes;
}
