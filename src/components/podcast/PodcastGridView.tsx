"use client";

import { motion } from "framer-motion";
import { ChevronUp, Plus } from "lucide-react";
import { useState } from "react";

import { liquidEase } from "@/components/animations/PageLoadAnimation";
import PodcastCard from "@/components/podcast/PodcastCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { getEpisodeImage } from "@/lib/episodeImages";
import type { PodcastEpisode } from "@/lib/podcastData";

const HOVER_COLORS = [
  ["#594881", "#805781", "#9A5B77", "#594881"],
  ["#805781", "#9A5B77", "#AB5866", "#805781"],
  ["#9A5B77", "#AB5866", "#B45250", "#9A5B77"],
  ["#AB5866", "#B45250", "#B44C38", "#AB5866"],
  ["#B45250", "#B44C38", "#594881", "#B45250"],
  ["#B44C38", "#594881", "#805781", "#B44C38"],
];

interface PodcastGridViewProps {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}

const PodcastGridView = ({
  episodes,
  comingSoonEpisodes,
}: PodcastGridViewProps) => {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();
  const newestSlug =
    episodes.length > 0
      ? [...episodes].sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        )[0].slug
      : null;

  const allCards = [
    ...episodes.map((ep, i) => ({
      type: "episode" as const,
      episode: ep,
      index: i,
    })),
    ...comingSoonEpisodes.map((ep, i) => ({
      type: "coming-soon" as const,
      episode: ep,
      index: episodes.length + i,
    })),
  ];

  const MOBILE_INITIAL = 3;
  const hasMore = isMobile && allCards.length > MOBILE_INITIAL;
  const visibleCards =
    isMobile && !showAll ? allCards.slice(0, MOBILE_INITIAL) : allCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
      {visibleCards.map(({ type, episode, index }) => (
        <motion.div
          key={
            type === "coming-soon" ? `coming-soon-${episode.id}` : episode.id
          }
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1.0,
            delay: Math.floor(index / 3) * 0.1,
            ease: liquidEase,
          }}
        >
          <PodcastCard
            episode={episode}
            isNew={type === "episode" && episode.slug === newestSlug}
            isUpcoming={type === "coming-soon"}
            image={getEpisodeImage(episode.slug, index)}
            placeholderColor={HOVER_COLORS[index % HOVER_COLORS.length][0]}
            priority={index < 3}
          />
        </motion.div>
      ))}

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, delay: 0.15, ease: liquidEase }}
        >
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="card-image group cursor-pointer relative flex items-center justify-center bg-foreground/[0.03] border border-foreground/[0.06] hover:bg-foreground/[0.06] hover:border-foreground/[0.1] transition-all duration-500"
          >
            <div className="flex flex-col items-center gap-3 text-foreground/60 group-hover:text-foreground transition-colors duration-500">
              {showAll ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
              <span className="text-sm font-medium tracking-wide">
                {showAll
                  ? "Show Less"
                  : `${allCards.length - MOBILE_INITIAL} More`}
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PodcastGridView;
