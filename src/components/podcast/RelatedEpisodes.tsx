import { PodcastEpisode } from "@/lib/podcastData";
import PodcastCard from "@/components/podcast/PodcastCard";

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  title?: string;
}

const RelatedEpisodes = ({ episodes, title = "Other Speakers" }: RelatedEpisodesProps) => {
  if (episodes.length === 0) return null;

  return (
    <div id="related-episodes" className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12 border-t border-border">
      <h2 
        className="text-display-xl text-foreground mb-6 sm:mb-8"
        style={{ fontWeight: 500 }}
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {episodes.map((ep) => (
          <PodcastCard
            key={ep.id}
            episode={ep}
            isUpcoming={ep.comingSoon}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedEpisodes;
