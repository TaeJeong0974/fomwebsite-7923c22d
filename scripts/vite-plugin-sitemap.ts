/**
 * Vite plugin: generates /public/sitemap.xml from src/lib/podcastData.ts
 * on dev-server start and at build time. No manual sitemap edits needed.
 */
import type { Plugin } from "vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://fom.xyz";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

function parsePublishedSlugs(root: string): { slug: string; date: string }[] {
  const src = readFileSync(resolve(root, "src/lib/podcastData.ts"), "utf-8");
  const results: { slug: string; date: string }[] = [];
  const blocks = src.split(/\{\s*\n\s*id:\s*\d+/).slice(1);

  for (const b of blocks) {
    const comingSoon = /comingSoon:\s*true/.test(b);
    if (comingSoon) continue;
    const slugMatch = b.match(/slug:\s*["']([^"']+)["']/);
    const dateMatch = b.match(/publishedDate:\s*["']([^"']+)["']/);
    if (slugMatch?.[1]) {
      results.push({
        slug: slugMatch[1],
        date: dateMatch?.[1] && dateMatch[1] !== "Coming Soon" ? dateMatch[1] : "",
      });
    }
  }
  return results;
}

function generate(root: string) {
  const today = new Date().toISOString().split("T")[0];
  const episodes = parsePublishedSlugs(root);

  const entries: SitemapEntry[] = [
    { loc: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: "/privacy", lastmod: today, changefreq: "yearly", priority: "0.3" },
    ...episodes.map((ep) => ({
      loc: `/podcast/${ep.slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  writeFileSync(resolve(root, "public/sitemap.xml"), xml, "utf-8");
  console.log(`✅ Sitemap generated with ${entries.length} URLs`);
}

export function sitemapPlugin(): Plugin {
  let root = "";
  return {
    name: "vite-plugin-sitemap",
    configResolved(c) { root = c.root; },
    buildStart() { generate(root); },
    configureServer(server) {
      generate(root);
      server.watcher.on("change", (file) => {
        if (file.includes("podcastData")) generate(root);
      });
    },
  };
}
