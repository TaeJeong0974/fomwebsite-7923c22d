import { useState } from "react";
import Footer from "@/components/Footer";
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
import {
  getYouTubeThumbnail,
  buildEpisodeSeo,
  buildEpisodeJsonLd,
  getEpisodeCanonicalUrl,
} from "@/lib/episodeUtils";

const PodcastDetail = () => {
  const { slug } = useParams();
  const [playTrigger, setPlayTrigger] = useState(0);
  const episode = getEpisodeBySlug(slug || "");

  const isIntro = !episode?.comingSoon && episode?.slug === "intro-to-fom";
  const seo = buildEpisodeSeo(episode);
  const ogImage = episode?.youtubeUrl
    ? getYouTubeThumbnail(episode.youtubeUrl, "hqdefault")
    : null;

  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    ogImage: ogImage || undefined,
    canonicalUrl: slug ? getEpisodeCanonicalUrl(slug) : undefined,
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

  const jsonLd = buildEpisodeJsonLd(episode, slug!, isIntro, ogImage);

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
        episodeTitle={
          isIntro
            ? (episode.hosts || []).map(h => h.name.split(" ")[0]).join(", ")
            : `${episode.title}, ${episode.company}`
        }
        onPlayClick={handlePlayFromBar}
      />

      <EpisodeOverlayLayout>
        {/* Title & Action Buttons */}
        <FadeInSection className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <div className="lg:col-span-2 space-y-1 sm:space-y-2">
            <h3 className="text-section-header mb-4">Episode {episode.id}{episode.duration && <span className="text-muted-foreground font-normal"> · {episode.duration}</span>}</h3>
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

            <FadeInSection>
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About this Episode</h3>
              <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-base lg:text-lg max-w-prose">
                {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}.`}
              </div>
            </FadeInSection>

            {episode.pullQuote && (
              <FadeInSection>
                <EpisodePullQuote quote={episode.pullQuote} attribution={episode.name} />
              </FadeInSection>
            )}

            <FadeInSection>
              <EpisodeTopics topics={episode.topics} />
            </FadeInSection>

            {episode.newslettersMentioned && episode.newslettersMentioned.length > 0 && (
              <FadeInSection>
                <EpisodeNewsletters newsletters={episode.newslettersMentioned} guestFirstName={episode.name.split(" ")[0]} />
              </FadeInSection>
            )}

            {!isIntro && episode.bio && (
              <FadeInSection>
                <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About the Guest</h3>
                <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
                  <span className="font-medium text-foreground">{episode.name}</span>{" "}
                  {episode.bio && episode.companyDomain ? (
                    <>
                      {episode.bio.split(episode.company)[0]}
                      <a href={`https://${episode.companyDomain}`} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">{episode.company}</a>
                      {episode.bio.split(episode.company).slice(1).join(episode.company)}
                    </>
                  ) : episode.bio}
                </p>
                {episode.linkedInUrl && (
                  <a
                    href={episode.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-3"
                  >
                    LinkedIn →
                  </a>
                )}
              </FadeInSection>
            )}

            {isIntro && (
              <FadeInSection>
                <AboutTheHosts />
              </FadeInSection>
            )}

            {!isIntro && episode.hosts && episode.hosts.length > 0 && (
              <FadeInSection>
                <AboutTheHosts hosts={episode.hosts} />
              </FadeInSection>
            )}

            {/* Guest & Hosts - Mobile only */}
            <div className="lg:hidden space-y-4">
              {!isIntro && (
                <EpisodeGuestCard
                  name={episode.name}
                  title={episode.title}
                  company={episode.company}
                  companyDomain={episode.companyDomain}
                  linkedInUrl={episode.linkedInUrl}
                  bio={episode.bio}
                />
              )}
              <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
            </div>
          </div>

          {/* Sidebar */}
          <FadeInSection className="hidden lg:flex lg:flex-col space-y-6">
            {!isIntro && (
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                companyDomain={episode.companyDomain}
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
      <Footer />
    </>
  );
};

export default PodcastDetail;
