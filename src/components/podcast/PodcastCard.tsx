"use client";

import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";
import type { PodcastEpisode } from "@/lib/podcastData";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { useSubscribe } from "@/contexts/SubscribeContext";
import { useIsMobile } from "@/hooks/use-mobile";
const guestBg = "/images/assets/guest-bg.jpg";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isNew?: boolean;
  isUpcoming?: boolean;
  image?: string;
  placeholderColor?: string;
  priority?: boolean;
}

const PodcastCard = ({
  episode,
  isNew = false,
  isUpcoming = false,
  image,
  placeholderColor,
  priority = false,
}: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    if (videoRef.current && episode.previewVideoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const cardImage = image || guestBg;

  const cardContent = (
    <div
      className="card-image md:hover-scale relative"
      ref={cardRef}
      style={
        placeholderColor ? { backgroundColor: placeholderColor } : undefined
      }
    >
      <Image
        src={cardImage}
        alt={
          episode.name
            ? `${episode.name}, ${episode.title} at ${episode.company}`
            : "Episode thumbnail"
        }
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
      />
      {episode.previewVideoUrl && !isUpcoming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-[1]"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={guestBg}
          >
            <source src={episode.previewVideoUrl} type="video/mp4" />
          </video>
        </motion.div>
      )}

      <div className="card-overlay-light hover-transition md:group-hover:opacity-90 z-[2]" />

      {!isUpcoming && (
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-[3] opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-smooth">
          <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center">
            <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
          </span>
        </div>
      )}

      {!isUpcoming && isNew && (
        <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status font-semibold text-foreground z-[3]">
          New
        </span>
      )}

      {isUpcoming && (
        <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status font-semibold text-foreground z-[3]">
          Upcoming
        </span>
      )}

      <EpisodeCardContent
        episode={episode}
        isUpcoming={isUpcoming}
        isHovered={isHovered}
      />
    </div>
  );

  if (isUpcoming) {
    return (
      <button
        type="button"
        className="block w-full text-left group cursor-pointer"
        aria-label={`Upcoming episode with ${episode.name}, ${episode.title} at ${episode.company}. Subscribe for updates.`}
        onClick={() =>
          openSubscribe({
            guestName: episode.name.split(" ")[0],
            guestSlug: episode.slug,
          })
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="block group"
      aria-label={`Listen to episode with ${episode.name}, ${episode.title} at ${episode.company}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
};

export default PodcastCard;
