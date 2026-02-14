import { z } from "zod";

/** Base schema for all episodes */
const baseEpisodeSchema = z.object({
  id: z.number().int().min(0),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Name is required"),
  title: z.string(),
  company: z.string(),
  companyDomain: z.string(),
  overview: z.string().min(1, "Overview is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  bio: z.string().optional(),
  topics: z.array(z.string().min(1)).min(1, "At least one topic is required"),
  chapters: z.array(z.object({ time: z.string(), title: z.string() })),
  youtubeUrl: z.string(),
  spotifyUrl: z.string(),
  duration: z.string(),
  publishedDate: z.string().min(1),
  comingSoon: z.boolean(),
  linkedInUrl: z.string().url().optional(),
  previewVideoUrl: z.string().url().optional(),
  hosts: z
    .array(z.object({ name: z.string(), title: z.string(), company: z.string() }).passthrough())
    .optional(),
  pullQuote: z.string().optional(),
  newslettersMentioned: z
    .array(z.object({ name: z.string().min(1), url: z.string().url().optional(), description: z.string().optional() }))
    .optional(),
});

/** Published episodes must have YouTube, Spotify, duration, and a real date */
export const publishedEpisodeSchema = baseEpisodeSchema.refine(
  (ep) => {
    if (ep.comingSoon) return true;
    return (
      ep.youtubeUrl.length > 0 &&
      ep.spotifyUrl.length > 0 &&
      ep.duration.length > 0 &&
      ep.publishedDate !== "Coming Soon"
    );
  },
  { message: "Published episodes must have youtubeUrl, spotifyUrl, duration, and a valid publishedDate" },
);

/** SEO constraints */
export const seoEpisodeSchema = baseEpisodeSchema.refine(
  (ep) => ep.overview.length <= 200,
  { message: "Overview should be ≤200 chars for SEO meta descriptions" },
);

/** Unique IDs and slugs across all episodes */
export function validateEpisodeCollection(episodes: z.infer<typeof baseEpisodeSchema>[]) {
  const errors: string[] = [];

  const ids = new Set<number>();
  const slugs = new Set<string>();

  for (const ep of episodes) {
    if (ids.has(ep.id)) errors.push(`Duplicate episode id: ${ep.id}`);
    if (slugs.has(ep.slug)) errors.push(`Duplicate episode slug: ${ep.slug}`);
    ids.add(ep.id);
    slugs.add(ep.slug);
  }

  return errors;
}

export { baseEpisodeSchema };
