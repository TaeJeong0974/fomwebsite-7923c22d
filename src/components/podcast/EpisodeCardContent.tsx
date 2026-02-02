import { PodcastEpisode } from "@/lib/podcastData";

interface EpisodeCardContentProps {
  episode: PodcastEpisode;
  isUpcoming?: boolean;
  showOverview?: boolean;
  compact?: boolean;
}

/**
 * Shared content rendering for episode cards.
 * Used by PodcastCard and RelatedEpisodes for DRY code.
 */
const EpisodeCardContent = ({ 
  episode, 
  isUpcoming = false, 
  showOverview = true,
  compact = false 
}: EpisodeCardContentProps) => {
  const isIntro = episode.slug === 'intro-to-fom';
  const textSize = compact 
    ? "text-2xl sm:text-3xl lg:text-4xl" 
    : "text-4xl sm:text-3xl lg:text-4xl";

  // Static hover content classes for proper Tailwind JIT detection
  const hoverContentClasses = compact
    ? "max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
    : "max-h-40 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:max-h-40 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0";

  return (
    <div className="card-content-bottom card-padding-lg z-[3]">
      {/* Episode Name */}
      <h3 className={`font-display ${textSize} text-white leading-[0.95] tracking-normal`}>
        {isIntro ? (
          <>
            <span className="block font-semibold">Intro</span>
            <span className="block font-normal">to FOM</span>
          </>
        ) : (
          episode.name.split(' ').map((word, i) => (
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
      {episode.title && episode.company && (
        <div className="mt-2">
          <p className="text-sm text-white/70">{episode.title}</p>
          <p className="text-sm font-medium text-white">{episode.company}</p>
        </div>
      )}
      
      {/* Hover content - overview and button with liquid ease */}
      <div className={hoverContentClasses}>
        {showOverview && episode.overview && (
          <p className="text-body-sm leading-relaxed text-white mb-4 line-clamp-3">
            {episode.overview}
          </p>
        )}
        <span className="btn-base btn-glass-light btn-sm">
          {isUpcoming ? "Learn More" : "Watch Now"}
        </span>
      </div>
    </div>
  );
};

export default EpisodeCardContent;
