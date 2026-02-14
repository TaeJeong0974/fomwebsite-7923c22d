import { useState } from "react";
import { useParams } from "react-router-dom";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import StickyBottomBar from "@/components/podcast/StickyBottomBar";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import EpisodeNewsletters from "@/components/podcast/EpisodeNewsletters";
import AboutTheHosts from "@/components/podcast/AboutTheHosts";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import FadeInSection from "@/components/podcast/FadeInSection";
import useDocumentMeta from "@/hooks/use-document-meta";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes } from "@/lib/podcastData";

const SITE_URL = "https://fomwebsite.lovable.app";

/** Extract YouTube video ID and build thumbnail URL */
const getYouTubeThumbnail = (url?: string, size: string = "mqdefault"): string | null => {
  const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/${size}.jpg` : null;
};

const PodcastDetail = () => {
  const { slug } = useParams();
  const [playTrigger, setPlayTrigger] = useState(0);
  const episode = getEpisodeBySlug(slug || "");

  const isIntro = !episode?.comingSoon && episode?.slug === "intro-to-fom";
  const seoTitle = episode
    ? `${episode.name} — Future of Marketing Podcast`
    : "Future of Marketing Podcast";
  const seoDescription = episode
    ? (episode.overview || `${episode.name}, ${episode.title} at ${episode.company}`)
    : "The Future of Marketing Podcast";
  const ogImage = episode?.youtubeUrl
    ? getYouTubeThumbnail(episode.youtubeUrl, "hqdefault")
    : null;

  useDocumentMeta({
    title: seoTitle.length > 60 ? seoTitle.slice(0, 57) + "…" : seoTitle,
    description: seoDescription.length > 160 ? seoDescription.slice(0, 157) + "…" : seoDescription,
    ogImage: ogImage || undefined,
    canonicalUrl: slug ? `${SITE_URL}/episode/${slug}` : undefined,
  });

  if (!episode) return <ComingSoonEpisode />;
  if (episode.comingSoon) return <ComingSoonEpisode episode={episode} />;

  const guestName = isIntro ? "INTRO" : episode.name;
  const thumbnailUrl = getYouTubeThumbnail(episode.youtubeUrl);

  const otherEpisodes = [
    ...getPublishedEpisodes().filter(ep => ep.slug !== slug),
    ...getComingSoonEpisodes().filter(ep => ep.slug !== slug),
  ].slice(0, 3);

  const handlePlayFromBar = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPlayTrigger(prev => prev + 1);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.overview || episode.name,
    description: seoDescription,
    url: `${SITE_URL}/episode/${slug}`,
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetailVerticalText guestName={guestName} />

      <StickyBottomBar
        youtubeUrl={episode.youtubeUrl}
        spotifyUrl={episode.spotifyUrl}
        thumbnailUrl={thumbnailUrl}
        episodeName={episode.name}
        episodeTitle={isIntro ? (episode.hosts || []).map(h => h.name.split(' ')[0]).join(', ') : `${episode.title}, ${episode.company}`}
        onPlayClick={handlePlayFromBar}
      />

      <EpisodeOverlayLayout>
        {/* Title & Action Buttons */}
        <FadeInSection className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
          <div className="lg:col-span-2 space-y-1 sm:space-y-2">
            <h3 className="text-section-header mb-4">Episode {episode.id}</h3>
            <h1 className="text-display-lg font-display font-medium text-foreground leading-[1.1]">
              {episode.overview || episode.name}
            </h1>
          </div>
          <div className="hidden lg:block mt-6 sm:mt-7">
            <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
          </div>
        </FadeInSection>

        {/* Video + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
            <FadeInSection className="space-y-4 sm:space-y-6">
              <FloatingMiniPlayer
                youtubeUrl={episode.youtubeUrl}
                spotifyUrl={episode.spotifyUrl}
                playTrigger={playTrigger}
              />
              <div className="pt-2 lg:hidden">
                <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About This Episode</h3>
              <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-base lg:text-lg max-w-prose">
                {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}.`}
              </div>
            </FadeInSection>

            {episode.pullQuote && (
              <FadeInSection delay={0.3}>
                <EpisodePullQuote quote={episode.pullQuote} attribution={episode.name} />
              </FadeInSection>
            )}

            <FadeInSection delay={0.45}>
              <EpisodeTopics topics={episode.topics} />
            </FadeInSection>

            {episode.newslettersMentioned && episode.newslettersMentioned.length > 0 && (
              <FadeInSection delay={0.5}>
                <EpisodeNewsletters newsletters={episode.newslettersMentioned} guestFirstName={episode.name.split(" ")[0]} />
              </FadeInSection>
            )}

            {!isIntro && episode.bio && (
              <FadeInSection delay={0.5}>
                <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About the Guest</h3>
                <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
                  <span className="font-medium text-foreground">{episode.name}</span> {episode.bio}
                </p>
              </FadeInSection>
            )}

            {isIntro && (
              <FadeInSection delay={0.45}>
                <AboutTheHosts />
              </FadeInSection>
            )}

            {/* Guest & Hosts - Mobile only */}
            <div className="lg:hidden space-y-4">
              {!isIntro && (
                <EpisodeGuestCard
                  name={episode.name}
                  title={episode.title}
                  company={episode.company}
                  linkedInUrl={episode.linkedInUrl}
                  bio={episode.bio}
                />
              )}
              <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
            </div>
          </div>

          {/* Sidebar */}
          <FadeInSection delay={0.1} className="hidden lg:flex lg:flex-col space-y-6">
            {!isIntro && (
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                linkedInUrl={episode.linkedInUrl}
                bio={episode.bio}
              />
            )}
            <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
          </FadeInSection>
        </div>

        <RelatedEpisodes episodes={otherEpisodes} />

        <FadeInSection id="stay-connected" className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12">
          <ListenSubscribeCards guestName={!isIntro ? episode.name.split(" ")[0] : undefined} />
        </FadeInSection>
      </EpisodeOverlayLayout>
    </>
  );
};

export default PodcastDetail;
