import { PodcastEpisode } from "@/lib/podcastData";

const SITE_URL = "https://fomwebsite.lovable.app";

/** Extract YouTube video ID and build thumbnail URL */
export const getYouTubeThumbnail = (
  url?: string,
  size: string = "mqdefault"
): string | null => {
  const match = url?.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/${size}.jpg` : null;
};

/** Build SEO title & description for an episode */
export const buildEpisodeSeo = (episode?: PodcastEpisode) => {
  const title = episode
    ? `${episode.name} — Future of Marketing Podcast`
    : "Future of Marketing Podcast";
  const description = episode
    ? episode.overview || `${episode.name}, ${episode.title} at ${episode.company}`
    : "The Future of Marketing Podcast";

  return {
    title: title.length > 60 ? title.slice(0, 57) + "…" : title,
    description: description.length > 160 ? description.slice(0, 157) + "…" : description,
  };
};

/** Build JSON-LD structured data for a podcast episode */
export const buildEpisodeJsonLd = (
  episode: PodcastEpisode,
  slug: string,
  isIntro: boolean,
  ogImage: string | null
) => ({
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  name: episode.overview || episode.name,
  description:
    episode.overview ||
    `${episode.name}, ${episode.title} at ${episode.company}`,
  url: `${SITE_URL}/podcast/${slug}`,
  episodeNumber: episode.id,
  partOfSeries: {
    "@type": "PodcastSeries",
    name: "Future of Marketing",
    url: SITE_URL,
  },
  ...(ogImage && { thumbnailUrl: ogImage }),
  ...(episode.duration && { timeRequired: episode.duration }),
  ...(episode.publishedDate && { datePublished: episode.publishedDate }),
  ...(!isIntro && {
    guest: {
      "@type": "Person",
      name: episode.name,
      jobTitle: episode.title,
      worksFor: { "@type": "Organization", name: episode.company },
    },
  }),
});

/** Canonical URL for an episode */
export const getEpisodeCanonicalUrl = (slug: string) =>
  `${SITE_URL}/podcast/${slug}`;
