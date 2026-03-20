import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ep1Poster from "@/assets/ep1-poster.png?format=webp";
import ep0Poster from "@/assets/ep0-poster.png?format=webp";
import guestLena from "@/assets/guest-lena-waters-cover.png?format=webp";
import guestDaveCover from "@/assets/guest-dave-steer-cover.png?format=webp";
import guestSaraCover from "@/assets/guest-sara-varni-cover.png?format=webp";
import guestKateCover from "@/assets/guest-kate-johnson-cover.png?format=webp";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import StickyBottomBar from "@/components/podcast/StickyBottomBar";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import EpisodeNewsletters from "@/components/podcast/EpisodeNewsletters";
import GuestBio from "@/components/podcast/GuestBio";
import AboutTheHosts from "@/components/podcast/AboutTheHosts";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import FadeInSection from "@/components/podcast/FadeInSection";
import { useEpisodeData } from "@/contexts/EpisodeDataContext";
import { EPISODE_IMAGES, OG_IMAGES } from "@/lib/episodeImages";
import { DEFAULT_OG_IMAGE } from "@/lib/seoConstants";
import {
  getYouTubeThumbnail,
  buildEpisodeSeo,
  buildEpisodeJsonLd,
  getEpisodeCanonicalUrl,
} from "@/lib/episodeUtils";


const PodcastDetail = () => {

  const { slug } = useParams();
  const [playTrigger, setPlayTrigger] = useState(0);
  const { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes } = useEpisodeData();
  const episode = getEpisodeBySlug(slug || "");

  const isIntro = !episode?.comingSoon && episode?.slug === "the-future-of-marketing";
  const seo = buildEpisodeSeo(episode);

  const ogImage = OG_IMAGES[episode?.slug || ""]
    ?? (episode?.youtubeUrl ? getYouTubeThumbnail(episode.youtubeUrl, "hqdefault") : null);

  const canonicalUrl = slug ? getEpisodeCanonicalUrl(slug) : undefined;
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;

  if (!episode || episode.comingSoon) return <NotFound />;

  const guestName = isIntro ? "INTRO" : episode.name;
  const thumbnailUrl = getYouTubeThumbnail(episode.youtubeUrl);

  const otherEpisodes = getPublishedEpisodes()
    .filter(ep => ep.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

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
        appleUrl={episode.appleUrl}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <div className="lg:col-span-2 space-y-1 sm:space-y-2">
            <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">Episode {episode.id}{episode.duration && <span className="text-muted-foreground font-normal"> · {episode.duration}</span>}</h3>
            <h1 className="text-display-lg font-display font-medium text-foreground leading-[1.1] stable-text lg:text-[2.2rem]">
              {episode.overview || episode.name}
            </h1>
          </div>
          <div className="hidden lg:block mt-6 sm:mt-7">
            <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} appleUrl={episode.appleUrl} />
          </div>
        </div>

        {/* Video + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
            <FadeInSection className="space-y-4 sm:space-y-6">
              <FloatingMiniPlayer
                youtubeUrl={episode.youtubeUrl}
                spotifyUrl={episode.spotifyUrl}
                appleUrl={episode.appleUrl}
                playTrigger={playTrigger}
                thumbnailImage={episode.slug === "meagen-eisenberg" ? ep1Poster : episode.slug === "lena-waters" ? guestLena : episode.slug === "dave-steer" ? guestDaveCover : episode.slug === "sara-varni" ? guestSaraCover : episode.slug === "kate-johnson" ? guestKateCover : isIntro ? ep0Poster : undefined}
              />
              <div className="pt-2 lg:hidden">
                <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} appleUrl={episode.appleUrl} />
              </div>
            </FadeInSection>

            <FadeInSection>
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About this Episode</h3>
              <div className="text-foreground/80 whitespace-pre-line text-[1em] max-w-prose">
                {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}.`}
              </div>
            </FadeInSection>

            {episode.pullQuote && (
              <FadeInSection>
                <EpisodePullQuote quote={episode.pullQuote} attribution={isIntro ? "Ethan Smith" : episode.name} />
              </FadeInSection>
            )}

            <FadeInSection>
              <EpisodeTopics topics={episode.topics} detailTags={episode.detailTags} />
            </FadeInSection>

            {episode.newslettersMentioned && episode.newslettersMentioned.length > 0 && (
              <FadeInSection>
                <EpisodeNewsletters newsletters={episode.newslettersMentioned} guestFirstName={episode.name.split(" ")[0]} />
              </FadeInSection>
            )}

            {!isIntro && episode.bio && (
              <FadeInSection>
                <GuestBio
                  name={episode.name}
                  bio={episode.bio}
                  company={episode.company}
                  companyDomain={episode.companyDomain}
                  linkedInUrl={episode.linkedInUrl}
                />
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
                />
              )}
              <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
            </div>
          </div>

          {/* Sidebar */}
          <FadeInSection data-pip-anchor className="hidden lg:flex lg:flex-col space-y-4">
            {!isIntro && (
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                companyDomain={episode.companyDomain}
                linkedInUrl={episode.linkedInUrl}
              />
            )}
            <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
          </FadeInSection>
        </div>

        <FadeInSection>
          <RelatedEpisodes episodes={otherEpisodes} title="More Episodes" />
        </FadeInSection>

        <FadeInSection id="stay-connected" className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12">
          <ListenSubscribeCards guestName={!isIntro ? episode.name.split(" ")[0] : undefined} />
        </FadeInSection>
      </EpisodeOverlayLayout>
      <Footer />
    </>
  );
};

export default PodcastDetail;
