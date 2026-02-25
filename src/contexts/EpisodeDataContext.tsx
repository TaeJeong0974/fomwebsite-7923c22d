import { createContext, useContext, ReactNode, useMemo } from "react";
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
  loading: false,
  getEpisodeBySlug: (slug) => staticEpisodes.find((ep) => ep.slug === slug),
  getPublishedEpisodes: () => staticEpisodes.filter((ep) => !ep.comingSoon),
  getComingSoonEpisodes: () => staticEpisodes.filter((ep) => ep.comingSoon),
});

export const useEpisodeData = () => useContext(EpisodeDataContext);
export { EpisodeDataContext };

export const EpisodeDataProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      episodes: staticEpisodes,
      hosts: staticHosts,
      loading: false,
      getEpisodeBySlug: (slug: string) => staticEpisodes.find((ep) => ep.slug === slug),
      getPublishedEpisodes: () => staticEpisodes.filter((ep) => !ep.comingSoon),
      getComingSoonEpisodes: () => staticEpisodes.filter((ep) => ep.comingSoon),
    }),
    []
  );

  return (
    <EpisodeDataContext.Provider value={value}>
      {children}
    </EpisodeDataContext.Provider>
  );
};
