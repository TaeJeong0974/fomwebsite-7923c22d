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

  // Grid-based height animation with smoother, longer duration
  const hoverWrapperClasses = "grid grid-rows-[1fr] mt-4 md:grid-rows-[0fr] md:mt-0 md:group-hover:grid-rows-[1fr] md:group-hover:mt-4 transition-[grid-template-rows,margin] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]";
  const hoverContentClasses = "min-h-0 overflow-hidden opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-[cubic-bezier(0.33,1,0.68,1)]";

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
      
      {/* Hover content - grid height animation, content always visible inside */}
      <div className={hoverWrapperClasses}>
        <div className={hoverContentClasses}>
          {showOverview && episode.overview && (
            <p className="text-body-sm leading-relaxed text-white mb-4 line-clamp-3 max-w-[85%]">
              {episode.overview}
            </p>
          )}
          <span className="btn-base btn-glass-light btn-sm">
            {isUpcoming ? "Learn More" : "Watch Now"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCardContent;
