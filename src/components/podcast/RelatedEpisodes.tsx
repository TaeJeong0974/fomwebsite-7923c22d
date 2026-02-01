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
    <div id="related-episodes" className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border">
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
                <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status z-[3]">
                  Upcoming
                </span>
              )}
              
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal">
                  {ep.slug === 'intro-to-fom' ? (
                    <>
                      <span className="block font-semibold">Intro</span>
                      <span className="block font-normal">to FOM</span>
                    </>
                  ) : (
                    ep.name.split(' ').map((word, i) => (
                      <span 
                        key={i} 
                        className={`block ${i === 0 ? 'font-medium' : 'font-normal'}`}
                      >
                        {word}
                      </span>
                    ))
                  )}
                </h3>
                
                {/* Title & Company - stacked hierarchy */}
                {ep.title && ep.company && (
                  <div className="mt-2">
                    <p className="text-sm text-white/70">{ep.title}</p>
                    <p className="text-sm font-medium text-white">{ep.company}</p>
                  </div>
                )}
                
                {/* Hover content - overview and button */}
                <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {!ep.comingSoon && ep.overview && (
                    <p className="text-body-sm leading-relaxed text-white mb-4">{ep.overview}</p>
                  )}
                  <span className="btn-base btn-glass-light btn-sm">
                    {ep.comingSoon ? "Learn More" : "Watch Now"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedEpisodes;
