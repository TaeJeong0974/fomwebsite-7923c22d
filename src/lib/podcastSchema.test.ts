import { describe, it, expect } from "vitest";
import { podcastEpisodes } from "./podcastData";
import {
  baseEpisodeSchema,
  publishedEpisodeSchema,
  seoEpisodeSchema,
  validateEpisodeCollection,
} from "./podcastSchema";

describe("Podcast episode schema validation", () => {
  it("every episode passes base schema", () => {
    for (const ep of podcastEpisodes) {
      const result = baseEpisodeSchema.safeParse(ep);
      if (!result.success) {
        throw new Error(
          `Episode "${ep.slug}" failed base schema: ${result.error.issues.map((i) => i.message).join(", ")}`,
        );
      }
    }
  });

  it("published episodes have required media fields", () => {
    for (const ep of podcastEpisodes) {
      const result = publishedEpisodeSchema.safeParse(ep);
      if (!result.success) {
        throw new Error(
          `Episode "${ep.slug}" failed published schema: ${result.error.issues.map((i) => i.message).join(", ")}`,
        );
      }
    }
  });

  it("episode overviews are within SEO length limits", () => {
    for (const ep of podcastEpisodes) {
      const result = seoEpisodeSchema.safeParse(ep);
      if (!result.success) {
        throw new Error(
          `Episode "${ep.slug}" overview too long (${ep.overview.length} chars): "${ep.overview.slice(0, 60)}…"`,
        );
      }
    }
  });

  it("no duplicate ids or slugs", () => {
    const errors = validateEpisodeCollection(podcastEpisodes as any);
    expect(errors).toEqual([]);
  });
});
