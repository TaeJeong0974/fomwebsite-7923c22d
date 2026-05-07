import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { podcastEpisodes } from "@/lib/podcastData";
import {
  buildEpisodeSeo,
  buildEpisodeJsonLd,
  getEpisodeCanonicalUrl,
  getYouTubeThumbnail,
} from "@/lib/episodeUtils";
import { OG_IMAGES } from "@/lib/episodeImages";
import { DEFAULT_OG_IMAGE } from "@/lib/seoConstants";
import PodcastDetailClient from "@/components/podcast/PodcastDetailClient";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return podcastEpisodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params;
  const episode = podcastEpisodes.find((ep) => ep.slug === slug);
  if (!episode) return {};

  const seo = buildEpisodeSeo(episode);
  const canonical = getEpisodeCanonicalUrl(slug);
  const ogImage =
    OG_IMAGES[slug] ??
    (episode.youtubeUrl ? getYouTubeThumbnail(episode.youtubeUrl, "hqdefault") : null) ??
    DEFAULT_OG_IMAGE;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      images: [ogImage],
      type: "article",
      siteName: "Future of Marketing",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}

export default async function PodcastDetailPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const episode = podcastEpisodes.find((ep) => ep.slug === slug);
  if (!episode) notFound();

  const isIntro = !episode.comingSoon && episode.slug === "the-future-of-marketing";
  const ogImage =
    OG_IMAGES[slug] ??
    (episode.youtubeUrl ? getYouTubeThumbnail(episode.youtubeUrl, "hqdefault") : null);
  const jsonLd = buildEpisodeJsonLd(episode, slug, isIntro, ogImage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PodcastDetailClient slug={slug} />
    </>
  );
}
