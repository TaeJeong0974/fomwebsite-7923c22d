import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  title?: string;
  delay?: number;
}

const RelatedEpisodes = ({ episodes, title = "Other Great Speakers", delay = 0.4 }: RelatedEpisodesProps) => {
  if (episodes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border"
    >
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
        {title}
      </h3>
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
              <div className="card-overlay-light hover-transition group-hover:opacity-90" />
              
              {ep.companyDomain && (
                <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge z-[3]">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${ep.companyDomain}&sz=64`} 
                    alt={ep.company}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}
              
              {ep.comingSoon && (
                <span className="absolute top-4 right-4 bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full z-[3]">
                  Upcoming
                </span>
              )}
              
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {ep.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
                <p className="text-body-sm text-white mt-1">{ep.title}</p>
                <p className="text-body-sm font-medium text-white">{ep.company}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedEpisodes;
