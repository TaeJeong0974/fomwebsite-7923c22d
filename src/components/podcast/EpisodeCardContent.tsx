import { Bell } from "lucide-react";
import { PodcastEpisode } from "@/lib/podcastData";

const upcomingCTAs: Record<string, string> = {
  Katrina: "Get Notified for Katrina",
  Lena: "Get Notified for Lena",
  Dave: "Get Notified for Dave",
  Sara: "Get Notified for Sara",
  Kate: "Get Notified for Kate",
  Idan: "Get Notified for Idan",
  Lindsey: "Get Notified for Lindsey",
  Sheila: "Get Notified for Sheila",
  Ceci: "Get Notified for Ceci",
  Meagen: "Get Notified for Meagen",
};

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

  // Grid-based height animation - always expanded on mobile, hover-triggered on desktop
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
      
      {/* Overview text - grid height animation, content always visible inside */}
      {isUpcoming ? (
        <div className={hoverWrapperClasses}>
          <div className={hoverContentClasses}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
              <Bell size={14} />
              {upcomingCTAs[episode.name.split(" ")[0]] || "Get Notified"}
            </span>
          </div>
        </div>
      ) : showOverview && episode.overview ? (
        <div className={hoverWrapperClasses}>
          <div className={hoverContentClasses}>
            <p className="text-body-sm leading-relaxed text-white line-clamp-3 max-w-[85%]">
              {episode.overview}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EpisodeCardContent;
