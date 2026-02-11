import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import guestBg from "@/assets/guest-bg.png";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isNew?: boolean;
  isUpcoming?: boolean;
}

const PodcastCard = ({ episode, isNew = false, isUpcoming = false }: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();

  const handleMouseEnter = () => {
    if (isMobile || isUpcoming) return;
    setIsHovered(true);
    if (videoRef.current && episode.previewVideoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isMobile || isUpcoming) return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const cardContent = (
    <div className={`card-image relative ${isUpcoming ? '' : 'md:hover-scale'}`}>
      <img
        src={guestBg}
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

      {/* Subscribe CTA for upcoming episodes - hover only */}
      {isUpcoming && (
        <div className="absolute bottom-0 left-0 right-0 z-[4] card-padding-lg pb-6 lg:pb-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openSubscribe();
            }}
            className="btn-base btn-sm bg-white/90 backdrop-blur-sm text-foreground hover:bg-white transition-colors"
          >
            Get Notified
          </button>
        </div>
      )}
    </div>
  );

  if (isUpcoming) {
    return (
      <div className="block group">
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
