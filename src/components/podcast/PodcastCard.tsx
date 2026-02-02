import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isNew?: boolean;
  isUpcoming?: boolean;
}

const PodcastCard = ({ episode, isNew = false, isUpcoming = false }: PodcastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && episode.previewVideoUrl) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  };

  const handleMouseLeave = () => {
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
      <div className="card-image hover-scale relative">
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

        <div className="card-overlay-light hover-transition group-hover:opacity-90 z-[2]" />
        
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
        
        <div className="card-content-bottom card-padding-lg z-[3]">
          <h3 className="font-display text-4xl sm:text-3xl lg:text-4xl text-white leading-[0.95] tracking-normal">
            {episode.slug === 'intro-to-fom' ? (
              <>
                <span className="block font-semibold">Intro</span>
                <span className="block font-normal">to FOM</span>
              </>
            ) : (
              episode.name.split(' ').map((word, i, arr) => (
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
          
          {/* Hover content - overview and button */}
          <div className="max-h-40 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-40 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            {episode.overview && (
              <p className="text-body-sm leading-relaxed text-white mb-4 line-clamp-3">
                {episode.overview}
              </p>
            )}
            <span className="btn-base btn-glass-light btn-sm">
              {isUpcoming ? "Learn More" : "Watch Now"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
