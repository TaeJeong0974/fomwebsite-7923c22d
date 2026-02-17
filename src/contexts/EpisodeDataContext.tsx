import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  PodcastEpisode,
  PodcastHost,
  podcastEpisodes as staticEpisodes,
  podcastHosts as staticHosts,
} from "@/lib/podcastData";

interface EpisodeDataContextType {
  episodes: PodcastEpisode[];
  hosts: PodcastHost[];
  loading: boolean;
  getEpisodeBySlug: (slug: string) => PodcastEpisode | undefined;
  getPublishedEpisodes: () => PodcastEpisode[];
  getComingSoonEpisodes: () => PodcastEpisode[];
}

const EpisodeDataContext = createContext<EpisodeDataContextType>({
  episodes: staticEpisodes,
  hosts: staticHosts,
  loading: true,
  getEpisodeBySlug: (slug) => staticEpisodes.find((ep) => ep.slug === slug),
  getPublishedEpisodes: () => staticEpisodes.filter((ep) => !ep.comingSoon),
  getComingSoonEpisodes: () => staticEpisodes.filter((ep) => ep.comingSoon),
});

export const useEpisodeData = () => useContext(EpisodeDataContext);
export { EpisodeDataContext };

function parseHostTitle(titleField: string | null): { title: string; company: string } {
  if (!titleField) return { title: "", company: "" };
  const parts = titleField.split(",").map((s) => s.trim());
  return { title: parts[0] || "", company: parts.slice(1).join(", ").trim() || "" };
}

function mapDbHost(row: any): PodcastHost {
  const { title, company } = parseHostTitle(row.title);
  return {
    name: row.name,
    title,
    company,
    linkedInUrl: row.linkedin_url || undefined,
    bio: row.bio || undefined,
  };
}

function mapDbEpisode(row: any, hostsForEpisode: PodcastHost[]): PodcastEpisode {
  const publishDate = row.publish_date
    ? new Date(row.publish_date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return {
    id: row.episode_number ?? 0,
    slug: row.slug,
    name: row.guest_name || row.title,
    title: row.guest_title || "",
    company: row.guest_company || "",
    companyDomain: row.guest_company_domain || "",
    overview: row.subtitle || "",
    fullDescription: row.full_description || "",
    bio: row.guest_bio || "",
    topics: (row.topics as string[]) || [],
    chapters: [],
    youtubeUrl: row.youtube_url || "",
    spotifyUrl: row.spotify_url || "",
    appleUrl: row.apple_url || undefined,
    duration: row.duration || "",
    publishedDate: row.published ? publishDate : "Coming Soon",
    comingSoon: !row.published,
    linkedInUrl: row.guest_linkedin_url || undefined,
    previewVideoUrl: row.preview_video_url || undefined,
    pullQuote: row.pull_quote || undefined,
    hosts: hostsForEpisode.length > 0 ? hostsForEpisode : undefined,
  };
}

export const EpisodeDataProvider = ({ children }: { children: ReactNode }) => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(staticEpisodes);
  const [hosts, setHosts] = useState<PodcastHost[]>(staticHosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DB sync disabled — public site uses static data only
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      episodes,
      hosts,
      loading,
      getEpisodeBySlug: (slug: string) => episodes.find((ep) => ep.slug === slug),
      getPublishedEpisodes: () => episodes.filter((ep) => !ep.comingSoon),
      getComingSoonEpisodes: () => episodes.filter((ep) => ep.comingSoon),
    }),
    [episodes, hosts, loading]
  );

  return (
    <EpisodeDataContext.Provider value={value}>
      {children}
    </EpisodeDataContext.Provider>
  );
};
