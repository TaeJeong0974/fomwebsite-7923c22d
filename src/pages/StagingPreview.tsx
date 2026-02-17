import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { PodcastEpisode, PodcastHost } from "@/lib/podcastData";
import { EpisodeDataContext } from "@/contexts/EpisodeDataContext";
import Footer from "@/components/Footer";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import GuestBio from "@/components/podcast/GuestBio";
import AboutTheHosts from "@/components/podcast/AboutTheHosts";
import FadeInSection from "@/components/podcast/FadeInSection";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import { getYouTubeThumbnail } from "@/lib/episodeUtils";
import ep1Poster from "@/assets/ep1-poster.png";
import ep0Poster from "@/assets/ep0-poster.png";

/* ── DB → domain mappers ── */

function parseHostTitle(t: string | null) {
  if (!t) return { title: "", company: "" };
  const p = t.split(",").map((s) => s.trim());
  return { title: p[0] || "", company: p.slice(1).join(", ").trim() || "" };
}

function mapDbHost(row: any): PodcastHost {
  const { title, company } = parseHostTitle(row.title);
  return { name: row.name, title, company, linkedInUrl: row.linkedin_url || undefined, bio: row.bio || undefined };
}

function mapDbEpisode(row: any, hosts: PodcastHost[]): PodcastEpisode & { _dbId: string } {
  const publishDate = row.publish_date
    ? new Date(row.publish_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  return {
    _dbId: row.id,
    id: row.episode_number ?? 0, slug: row.slug,
    name: row.guest_name || row.title, title: row.guest_title || "",
    company: row.guest_company || "", companyDomain: row.guest_company_domain || "",
    overview: row.subtitle || "", fullDescription: row.full_description || "",
    bio: row.guest_bio || "", topics: (row.topics as string[]) || [], chapters: [],
    youtubeUrl: row.youtube_url || "", spotifyUrl: row.spotify_url || "",
    duration: row.duration || "",
    publishedDate: row.published ? publishDate : "Coming Soon",
    comingSoon: !row.published,
    linkedInUrl: row.guest_linkedin_url || undefined,
    previewVideoUrl: row.preview_video_url || undefined,
    pullQuote: row.pull_quote || undefined,
    hosts: hosts.length > 0 ? hosts : undefined,
  };
}

/* ── Simple in-memory cache with 10s TTL ── */
let _cache: { data: { episodes: PodcastEpisode[]; hosts: PodcastHost[] } | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL = 10_000; // 10 seconds

async function fetchStagingData(): Promise<{ episodes: PodcastEpisode[]; hosts: PodcastHost[] }> {
  if (_cache.data && Date.now() - _cache.ts < CACHE_TTL) return _cache.data;

  const [epRes, hostRes, linkRes] = await Promise.all([
    supabase.from("episodes").select("*").order("episode_number", { ascending: false }),
    supabase.from("hosts").select("*"),
    supabase.from("episode_hosts").select("episode_id, host_id"),
  ]);

  const hostRows = hostRes.data || [];
  const hosts = hostRows.map(mapDbHost);

  const hostMap = new Map<string, PodcastHost>();
  hostRows.forEach((r: any) => hostMap.set(r.id, mapDbHost(r)));

  const links = linkRes.data || [];
  const episodes = (epRes.data || []).map((r: any) => {
    const ids = links.filter((l: any) => l.episode_id === r.id).map((l: any) => l.host_id);
    return mapDbEpisode(r, ids.map((id: string) => hostMap.get(id)).filter(Boolean) as PodcastHost[]);
  });

  _cache = { data: { episodes, hosts }, ts: Date.now() };
  return _cache.data!;
}

/** Invalidate cache so the next fetch hits the DB */
export function invalidateStagingCache() { _cache = { data: null, ts: 0 }; }

/* ── Page ── */

const StagingPreview = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const episodeDbId = searchParams.get("id");
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [allHosts, setAllHosts] = useState<PodcastHost[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [playTrigger, setPlayTrigger] = useState(0);

  useEffect(() => {
    if (!slug && !episodeDbId) return;
    (async () => {
      setLoading(true);
      try {
        const { episodes, hosts } = await fetchStagingData();
        setAllHosts(hosts);
        setAllEpisodes(episodes);
        // Try matching by DB id first (handles slug changes), then by slug
        const match = (episodeDbId
          ? episodes.find((e) => (e as any)._dbId === episodeDbId)
          : undefined) || episodes.find((e) => e.slug === slug);
        setEpisode(match || null);
      } catch (err) {
        console.error("Staging fetch failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, episodeDbId]);

  // Override the EpisodeDataContext so child components read DB data
  const ctxValue = useMemo(() => ({
    episodes: allEpisodes,
    hosts: allHosts,
    loading,
    getEpisodeBySlug: (s: string) => allEpisodes.find((e) => e.slug === s),
    getPublishedEpisodes: () => allEpisodes.filter((e) => !e.comingSoon),
    getComingSoonEpisodes: () => allEpisodes.filter((e) => e.comingSoon),
  }), [allEpisodes, allHosts, loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f2ef]">
      <p className="text-muted-foreground">Loading staging preview…</p>
    </div>
  );

  if (!episode) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f2ef]">
      <p className="text-muted-foreground">Episode not found in staging database.</p>
    </div>
  );

  const isIntro = episode.slug === "the-future-of-marketing";

  return (
    <EpisodeDataContext.Provider value={ctxValue}>
      {/* Staging banner */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-400 text-black text-center text-xs font-bold py-1.5">
        ⚠️ STAGING PREVIEW — This is not the live page
      </div>

      <div style={{ paddingTop: 32 }}>
        <EpisodeOverlayLayout>
          {/* Title */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
            <div className="lg:col-span-2 space-y-1 sm:space-y-2">
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
                Episode {episode.id}{episode.duration && <span className="text-muted-foreground font-normal"> · {episode.duration}</span>}
              </h3>
              <h1 className="text-display-lg font-display font-medium text-foreground leading-[1.1]">
                {episode.overview || episode.name}
              </h1>
            </div>
            <div className="hidden lg:block mt-6 sm:mt-7">
              <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
            </div>
          </div>

          {/* Video + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
              <FadeInSection className="space-y-4 sm:space-y-6">
                <FloatingMiniPlayer
                  youtubeUrl={episode.youtubeUrl}
                  spotifyUrl={episode.spotifyUrl}
                  playTrigger={playTrigger}
                  thumbnailImage={episode.slug === "meagen-eisenberg" ? ep1Poster : isIntro ? ep0Poster : undefined}
                />
                <div className="pt-2 lg:hidden">
                  <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
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
                <EpisodeTopics topics={episode.topics} />
              </FadeInSection>

              {!isIntro && episode.bio && (
                <FadeInSection>
                  <GuestBio name={episode.name} bio={episode.bio} company={episode.company} companyDomain={episode.companyDomain} linkedInUrl={episode.linkedInUrl} />
                </FadeInSection>
              )}

              {isIntro ? (
                <FadeInSection><AboutTheHosts /></FadeInSection>
              ) : episode.hosts && episode.hosts.length > 0 ? (
                <FadeInSection><AboutTheHosts hosts={episode.hosts} /></FadeInSection>
              ) : null}

              {/* Sidebar cards on mobile */}
              <div className="lg:hidden space-y-4">
                {!isIntro && (
                  <EpisodeGuestCard name={episode.name} title={episode.title} company={episode.company} companyDomain={episode.companyDomain} linkedInUrl={episode.linkedInUrl} />
                )}
                <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
              </div>
            </div>

            {/* Sidebar */}
            <FadeInSection className="hidden lg:flex lg:flex-col space-y-4">
              {!isIntro && (
                <EpisodeGuestCard name={episode.name} title={episode.title} company={episode.company} companyDomain={episode.companyDomain} linkedInUrl={episode.linkedInUrl} />
              )}
              <EpisodeHostsCard showAllHosts={isIntro} episodeHosts={episode.hosts} />
            </FadeInSection>
          </div>
        </EpisodeOverlayLayout>
        <Footer />
      </div>
    </EpisodeDataContext.Provider>
  );
};

export default StagingPreview;
