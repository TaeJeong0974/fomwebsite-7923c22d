import { Link } from "react-router-dom";
import { PodcastEpisode } from "@/lib/podcastData";
import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";
import guestBg from "@/assets/guest-bg.png";

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  title?: string;
  delay?: number;
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
          <Link
            key={ep.id}
            to={`/episode/${ep.slug}`}
            className="block group"
          >
            <div 
              className="card-image hover-scale"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="card-overlay-light hover-transition group-hover:opacity-90 z-[2]" />
              
              {ep.comingSoon && (
                <span className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 badge-status z-[3]">
                  Upcoming
                </span>
              )}
              
              <EpisodeCardContent episode={ep} isUpcoming={ep.comingSoon} compact />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedEpisodes;
