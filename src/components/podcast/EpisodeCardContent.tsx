"use client";

import type { PodcastEpisode } from "@/lib/podcastData";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";

const getUpcomingCTA = () => "Get Notified";

interface EpisodeCardContentProps {
  episode: PodcastEpisode;
  isUpcoming?: boolean;
  showOverview?: boolean;
  compact?: boolean;
  isHovered?: boolean;
}

/**
 * Shared content rendering for episode cards.
 * Used by PodcastCard and RelatedEpisodes for DRY code.
 */
const EpisodeCardContent = ({
  episode,
  isUpcoming = false,
  showOverview = true,
  compact = false,
  isHovered = false,
}: EpisodeCardContentProps) => {
  const isIntro = episode.slug === "the-future-of-marketing";
  const textSize = compact
    ? "text-2xl sm:text-3xl lg:text-4xl"
    : "text-4xl sm:text-3xl lg:text-4xl";

  // Grid-based height animation - always expanded on mobile, hover-triggered on desktop
  const hoverWrapperClasses =
    "grid grid-rows-[1fr] mt-4 md:grid-rows-[0fr] md:mt-0 md:group-hover:grid-rows-[1fr] md:group-hover:mt-4 transition-[grid-template-rows,margin] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]";
  const hoverContentClasses =
    "min-h-0 overflow-hidden opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-[cubic-bezier(0.33,1,0.68,1)]";

  return (
    <div className="card-content-bottom card-padding-lg z-[3]">
      {/* Default state: Name + Title/Company */}
      <div className="md:group-hover:opacity-0 transition-opacity duration-700 ease-smooth">
        <h3
          className={`font-display ${textSize} text-white leading-[0.95] tracking-normal`}
        >
          {isIntro ? (
            <>
              <span className="block font-semibold">Intro</span>
              <span className="block font-normal">to FOM</span>
            </>
          ) : (
            episode.name.split(" ").map((word, i) => (
              <span
                key={word}
                className={`block ${i === 0 ? "font-medium" : "font-normal"}`}
              >
                {word}
              </span>
            ))
          )}
        </h3>

        {episode.title && episode.company && (
          <div className="mt-2">
            <p className="text-sm text-white/70">{episode.title}</p>
            <p className="text-sm font-medium text-white">{episode.company}</p>
          </div>
        )}
      </div>

      {/* Hover state: Overview title morphs in */}
      {!isUpcoming && showOverview && episode.overview && (
        <div className="hidden md:block absolute bottom-0 left-0 right-0 card-padding-lg">
          <AnimatePresence>
            {isHovered && (
              <motion.p
                className="font-display text-xl sm:text-2xl lg:text-2xl text-white leading-[1.15] tracking-normal font-medium"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
                  },
                }}
              >
                {episode.overview.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mobile: always show overview below */}
      {!isUpcoming && showOverview && episode.overview && (
        <div className="grid grid-rows-[1fr] mt-4 md:hidden">
          <div className="min-h-0 overflow-hidden">
            <p className="text-body-sm leading-relaxed text-white line-clamp-3 max-w-[85%]">
              {episode.overview}
            </p>
          </div>
        </div>
      )}

      {/* Upcoming CTA */}
      {isUpcoming && (
        <div className={hoverWrapperClasses}>
          <div className={hoverContentClasses}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white group/bell">
              <Bell
                size={14}
                className="md:group-hover:animate-[bell-swing_2.5s_ease-in-out_infinite] origin-top"
              />
              {getUpcomingCTA()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeCardContent;
