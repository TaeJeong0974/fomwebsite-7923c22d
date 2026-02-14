import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";
import CursorFollowCTA from "@/components/podcast/CursorFollowCTA";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import guestBg from "@/assets/guest-bg.png";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isNew?: boolean;
  isUpcoming?: boolean;
  image?: string;
}

const PodcastCard = ({ episode, isNew = false, isUpcoming = false, image }: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ w: 0, h: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardSize({ w: rect.width, h: rect.height });
    }
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
    <div className="card-image md:hover-scale relative" ref={cardRef} onMouseMove={handleMouseMove}>
      <img
        src={cardImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
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
      
      {isNew && (
        <span className="absolute top-6 right-6 lg:top-8 lg:right-8 badge-status font-semibold text-foreground z-[3]">
          New
        </span>
      )}
      
      {isUpcoming && (
        <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status font-semibold text-foreground z-[3]">
          Upcoming
        </span>
      )}
      
      <EpisodeCardContent episode={episode} isUpcoming={isUpcoming} />
      
      <CursorFollowCTA
        isVisible={isHovered}
        x={mousePos.x}
        y={mousePos.y}
        centerX={cardSize.w / 2}
        centerY={cardSize.h / 2}
        variant={isUpcoming ? "notify" : "watch"}
      />
    </div>
  );

  if (isUpcoming) {
    return (
      <div
        className="block group cursor-pointer"
        onClick={() => openSubscribe({ guestName: episode.name.split(' ')[0] })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/episode/${episode.slug}`}
      className="block group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
};

export default PodcastCard;
