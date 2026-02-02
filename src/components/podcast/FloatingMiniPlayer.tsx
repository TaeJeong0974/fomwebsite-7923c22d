import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Maximize } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  spotifyUrl?: string;
}

const FloatingMiniPlayer = ({ youtubeUrl, spotifyUrl }: FloatingMiniPlayerProps) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current) {
        const rect = videoContainerRef.current.getBoundingClientRect();
        const isPast = rect.bottom < 100;
        setIsScrolledPast(isPast);
        // Reset mini player visibility when scrolling back to top
        if (!isPast) {
          setShowMiniPlayer(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToVideo = () => {
    videoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Main Video Player */}
      <div ref={videoContainerRef}>
        <div 
          className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
          style={{
            backgroundImage: `url(${guestBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 hover-transition shadow-lg shadow-black/10">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mini Player */}
      <AnimatePresence>
        {isScrolledPast && showMiniPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-32 right-[calc((100vw-1280px)/2+1rem)] z-50 shadow-2xl rounded-xl overflow-hidden max-w-[320px] w-[calc(100vw/3-3rem)] min-w-[280px]"
          >
            <div 
              className="relative aspect-video cursor-pointer group"
              onClick={scrollToVideo}
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 hover-transition">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Expand icon */}
              <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all">
                <Maximize className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-1 p-2 bg-black/90 backdrop-blur-xl">
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              )}
              {spotifyUrl && (
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMiniPlayer(false);
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMiniPlayer;
