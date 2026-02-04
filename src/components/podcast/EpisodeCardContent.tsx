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

  // Grid-based height animation - always expanded on mobile, hidden on tablet, hover-triggered on desktop
  const hoverWrapperClasses = "grid grid-rows-[1fr] mt-4 md:hidden lg:grid lg:grid-rows-[0fr] lg:mt-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:mt-4 transition-[grid-template-rows,margin] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]";
  const hoverContentClasses = "min-h-0 overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-[cubic-bezier(0.33,1,0.68,1)]";

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
      
      {/* Overview text - grid height animation, content always visible inside */}
      {showOverview && episode.overview && (
        <div className={hoverWrapperClasses}>
          <div className={hoverContentClasses}>
            <p className="text-body-sm leading-relaxed text-white line-clamp-3 max-w-[85%]">
              {episode.overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeCardContent;
