/**
 * Sitemap generator — run with: npx tsx scripts/generate-sitemap.ts
 * Outputs public/sitemap.xml with all indexable pages.
 */
import { podcastEpisodes } from "../src/lib/podcastData";
import { writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://fomwebsite.lovable.app";
const TODAY = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const staticPages: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
];

const episodePages: SitemapEntry[] = podcastEpisodes
  .filter((ep) => !ep.comingSoon)
  .map((ep) => ({
    loc: `/episode/${ep.slug}`,
    lastmod: ep.publishedDate !== "Coming Soon" ? TODAY : undefined,
    changefreq: "monthly" as const,
    priority: "0.8",
  }));

const allEntries = [...staticPages, ...episodePages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq || "monthly"}</changefreq>
    <priority>${e.priority || "0.5"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap written to ${outPath} with ${allEntries.length} URLs`);
