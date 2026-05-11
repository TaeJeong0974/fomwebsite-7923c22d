import { podcastEpisodes } from "@/lib/podcastData";
import { SITE_URL } from "@/lib/seoConstants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const episodes = podcastEpisodes
    .filter((ep) => !ep.comingSoon)
    .map((ep) => ({
      url: `${SITE_URL}/podcast/${ep.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...episodes,
  ];
}
