import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { podcastEpisodes } from "./podcastData";

const sitemapXml = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf-8");

describe("Sitemap /podcast/* coverage", () => {
  const publishedEpisodes = podcastEpisodes.filter((ep) => !ep.comingSoon);

  it("contains /podcast/ route for every published episode", () => {
    for (const ep of publishedEpisodes) {
      expect(sitemapXml).toContain(`/podcast/${ep.slug}`);
    }
  });

  it("does not contain old /episode/ routes", () => {
    expect(sitemapXml).not.toContain("/episode/");
  });

  it("does not include coming-soon episodes", () => {
    const comingSoon = podcastEpisodes.filter((ep) => ep.comingSoon);
    for (const ep of comingSoon) {
      expect(sitemapXml).not.toContain(`/podcast/${ep.slug}`);
    }
  });

  it("includes lastmod for published episodes", () => {
    for (const ep of publishedEpisodes) {
      const locIndex = sitemapXml.indexOf(`/podcast/${ep.slug}`);
      const surroundingBlock = sitemapXml.slice(locIndex, locIndex + 200);
      expect(surroundingBlock).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    }
  });
});
