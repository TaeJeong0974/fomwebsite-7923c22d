"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { PodcastEpisode } from "@/lib/podcastData";
import { useEpisodeData } from "@/contexts/EpisodeDataContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const HOVER_COLORS = [
  ["#594881", "#805781", "#9A5B77", "#594881"],
  ["#805781", "#9A5B77", "#AB5866", "#805781"],
  ["#9A5B77", "#AB5866", "#B45250", "#9A5B77"],
  ["#AB5866", "#B45250", "#B44C38", "#AB5866"],
  ["#B45250", "#B44C38", "#594881", "#B45250"],
  ["#B44C38", "#594881", "#805781", "#B44C38"],
];

interface PodcastListViewProps {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}

const PodcastListView = ({ episodes, comingSoonEpisodes }: PodcastListViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();
  const { hosts } = useEpisodeData();
  
  const allEpisodes = [...episodes, ...comingSoonEpisodes];

  return (
    <div className="divide-y divide-border/50">
      {allEpisodes.map((episode, index) => {
        const isComingSoon = episode.comingSoon;
        const isIntroEpisode = episode.slug === 'the-future-of-marketing';
        const hasBadge = isComingSoon;
        const isHovered = hoveredIndex === index && !isMobile;
        const colors = HOVER_COLORS[index % HOVER_COLORS.length];

        return (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: liquidEase }}
            className="relative"
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
          >
            {(() => {
              const innerContent = (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    {hasBadge && (
                      <div className={`flex gap-4 sm:gap-6 lg:gap-10 ${isComingSoon ? 'lg:hidden' : ''}`}>
                        <span className="text-label invisible" aria-hidden="true">EP 00</span>
                        <div className="mb-3 sm:mb-4 list-focus-transition">
                          {isComingSoon && <span className="badge-status">Upcoming</span>}
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
                      <span className="text-label pt-0 sm:pt-2 list-focus-transition">
                        EP {String(index).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-start gap-4 lg:gap-6">
                          <motion.h3 
                            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight list-focus-transition"
                            initial={false}
                            animate={isHovered ? {
                              color: colors,
                              x: 8,
                            } : {
                              color: '#1a1a1a',
                              x: 0,
                            }}
                            transition={{
                              color: isHovered
                                ? { duration: 4, ease: 'easeInOut', repeat: Infinity }
                                : { duration: 0.15, ease: liquidEase },
                              x: { duration: isHovered ? 0.6 : 0.15, ease: liquidEase },
                            }}
                          >
                            {isIntroEpisode ? 'Introduction' : episode.name}
                          </motion.h3>
                          <p className="hidden lg:block text-sm pt-1.5 text-foreground list-focus-transition">
                            {isIntroEpisode 
                              ? hosts.map((h, i) => <span key={h.name}>{h.name}{i < hosts.length - 1 && ', '}</span>) 
                              : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>
                            }
                          </p>
                        </div>
                        <p className="lg:hidden mt-2 text-sm text-foreground list-focus-transition">
                          {isIntroEpisode 
                            ? hosts.map((h, i) => <span key={h.name}>{h.name}{i < hosts.length - 1 && ', '}</span>) 
                            : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center shrink-0">
                    <motion.span
                      className="text-sm font-display font-semibold uppercase tracking-wider rounded-full inline-flex items-center justify-center"
                      initial={false}
                      animate={isHovered ? {
                        color: '#ffffff',
                        backgroundColor: '#1a1a1a',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.625rem',
                        paddingLeft: '1.25rem',
                        paddingRight: '1.25rem',
                      } : {
                        color: '#1a1a1a',
                        backgroundColor: 'rgba(0,0,0,0)',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.625rem',
                        paddingLeft: '0rem',
                        paddingRight: '0rem',
                      }}
                      transition={{ duration: 0.4, ease: liquidEase }}
                    >
                      {isComingSoon ? 'Upcoming' : 'Watch Now'}
                    </motion.span>
                  </div>
                </>
              );

              return isComingSoon ? (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Upcoming episode with ${episode.name}, ${episode.title} at ${episode.company}. Subscribe for updates.`}
                  className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 hover-transition relative z-10 cursor-pointer"
                  onClick={() => openSubscribe({ guestName: episode.name.split(' ')[0], guestSlug: episode.slug })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSubscribe({ guestName: episode.name.split(' ')[0], guestSlug: episode.slug }); } }}
                >
                  {innerContent}
                </div>
              ) : (
                <Link
                  href={`/podcast/${episode.slug}`}
                  aria-label={`Listen to episode with ${episode.name}, ${episode.title} at ${episode.company}`}
                  className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 hover-transition relative z-10"
                >
                  {innerContent}
                </Link>
              );
            })()}
          </motion.div>
        );
      })}
    </div>
  );
};

export default PodcastListView;