import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";
import { useIsMobile } from "@/hooks/use-mobile";
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

  return (
    <Link
      to={`/episode/${episode.slug}`}
      className="block group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image md:hover-scale relative">
        {/* Lazy loaded background image */}
        <img
          src={guestBg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Video overlay - only for published episodes with preview */}
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
          <span className="absolute top-6 right-6 lg:top-8 lg:right-8 badge-status z-[3]">
            New
          </span>
        )}
        
        {isUpcoming && (
          <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status z-[3]">
            Upcoming
          </span>
        )}
        
        <EpisodeCardContent episode={episode} isUpcoming={isUpcoming} />
      </div>
    </Link>
  );
};

export default PodcastCard;
