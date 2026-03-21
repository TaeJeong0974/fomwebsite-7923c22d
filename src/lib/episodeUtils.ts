import { PodcastEpisode } from "@/lib/podcastData";

const SITE_URL = "https://fom.xyz";

/**
 * Extract a YouTube thumbnail URL from a YouTube video URL.
 */
export function getYouTubeThumbnail(
  youtubeUrl: string,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" | "sddefault" = "maxresdefault"
): string {
  const match = youtubeUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  const videoId = match?.[1] ?? "";
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Build SEO title + description for an episode page.
 */
export function buildEpisodeSeo(episode?: PodcastEpisode) {
  if (!episode) {
    return {
      title: "Episode Not Found | FOM Podcast",
      description: "The episode you're looking for doesn't exist.",
    };
  }

  const SUFFIX = " | FOM Podcast";
  const MAX_TITLE = 60;

  let title: string;
  if (episode.comingSoon) {
    title = `${episode.name} — Coming Soon${SUFFIX}`;
  } else {
    const base = `${episode.name}: ${episode.overview}${SUFFIX}`;
    if (base.length <= MAX_TITLE) {
      title = base;
    } else {
      // Truncate overview to fit
      const budget = MAX_TITLE - `${episode.name}: ${SUFFIX}`.length - 1;
      const truncated = episode.overview.slice(0, budget).trimEnd();
      title = `${episode.name}: ${truncated}…${SUFFIX}`;
    }
  }

  const description = episode.comingSoon
    ? `${episode.name} (${episode.title}, ${episode.company}) joins the Future of Marketing podcast soon.`
    : `${episode.name} (${episode.title}, ${episode.company}) discusses ${episode.overview}. Listen now on YouTube, Spotify, and Apple Podcasts.`;

  return { title, description };
}

/**
 * Build JSON-LD structured data for an episode.
 */
export function buildEpisodeJsonLd(
  episode: PodcastEpisode,
  slug: string,
  isIntro: boolean,
  ogImage: string | null
) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: isIntro ? "Future of Marketing — Intro" : `${episode.name}: ${episode.overview}`,
    description: episode.fullDescription || episode.overview,
    url: `${SITE_URL}/podcast/${slug}`,
    datePublished: episode.publishedDate,
    image: ogImage || undefined,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Future of Marketing",
      url: SITE_URL,
    },
  };
}

/**
 * Get the canonical URL for an episode.
 */
export function getEpisodeCanonicalUrl(slug: string): string {
  return `${SITE_URL}/podcast/${slug}`;
}
