import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  title?: string;
  delay?: number;
}

const RelatedEpisodes = ({ episodes, title = "Other Speakers", delay = 0.4 }: RelatedEpisodesProps) => {
  if (episodes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border"
    >
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
            <div className="card-image hover-scale overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${guestBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                initial={{ scale: 1 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
              <div className="card-overlay-light hover-transition group-hover:opacity-90" />
              
              {ep.companyDomain && (
                <div className="absolute top-4 left-4 glass rounded-full p-2.5 hover-scale-badge z-[3]">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${ep.companyDomain}&sz=64`} 
                    alt={ep.company}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}
              
              {ep.comingSoon && (
                <span className="absolute top-4 right-4 glass text-foreground text-xs font-semibold tracking-wide uppercase px-3 pt-2.5 pb-2 rounded-full z-[3] flex items-center justify-center leading-none">
                  Upcoming
                </span>
              )}
              
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-normal">
                  {ep.name.split(' ').map((word, i) => (
                    <span key={i} className={`block ${i === 0 ? 'font-medium' : 'font-normal'}`}>{word}</span>
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
