import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { PodcastEpisode } from "@/lib/podcastData";
import EpisodeCardContent from "@/components/podcast/EpisodeCardContent";

import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import guestBg from "@/assets/guest-bg.png";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isNew?: boolean;
  isUpcoming?: boolean;
  image?: string;
  placeholderColor?: string;
}

const PodcastCard = ({ episode, isNew = false, isUpcoming = false, image, placeholderColor }: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImage, setShowImage] = useState(false);
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
      style={placeholderColor ? { backgroundColor: placeholderColor } : undefined}
    >
      <img
        src={cardImage}
        alt={episode.name ? `${episode.name}, ${episode.title} at ${episode.company}` : "Episode thumbnail"}
        loading="lazy"
        decoding="async"
        onLoad={() => setTimeout(() => setShowImage(true), 400)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${showImage ? 'opacity-100' : 'opacity-0'}`}
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
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-[3] flex items-center gap-2">
          {isNew && (
            <span className="badge-status font-semibold text-foreground">New</span>
          )}
          <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center">
            <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
          </span>
        </div>
      )}
      
      {isUpcoming && (
        <span className="absolute top-6 left-6 lg:top-8 lg:left-8 badge-status font-semibold text-foreground z-[3]">
          Upcoming
        </span>
      )}
      
      <EpisodeCardContent episode={episode} isUpcoming={isUpcoming} isHovered={isHovered} />
      
    </div>
  );

  if (isUpcoming) {
    return (
      <div
        className="block group cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Upcoming episode with ${episode.name}, ${episode.title} at ${episode.company}. Subscribe for updates.`}
        onClick={() => openSubscribe({ guestName: episode.name.split(' ')[0] })}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSubscribe({ guestName: episode.name.split(' ')[0] }); } }}
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
      aria-label={`Listen to episode with ${episode.name}, ${episode.title} at ${episode.company}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cardContent}
    </Link>
  );
};

export default PodcastCard;
