import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUp, Maximize, PictureInPicture2 } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

interface VideoScrollOptionsProps {
  activeOption: 1 | 2 | 3;
}

const VideoScrollOptions = ({ activeOption }: VideoScrollOptionsProps) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current) {
        const rect = videoContainerRef.current.getBoundingClientRect();
        const isPast = rect.bottom < 100;
        setIsScrolledPast(isPast);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToVideo = () => {
    videoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePiP = async () => {
    // In a real implementation, this would trigger Picture-in-Picture on an actual video element
    alert('Picture-in-Picture would activate here with a real video');
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

          {/* PiP Button - Option 2 */}
          {activeOption === 2 && (
            <button
              onClick={handlePiP}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white hover:bg-black/70 transition-all z-10"
              title="Picture-in-Picture"
            >
              <PictureInPicture2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Option 1: Floating Mini Player */}
      <AnimatePresence>
        {activeOption === 1 && isScrolledPast && showMiniPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-xl overflow-hidden"
            style={{ width: '320px' }}
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

              {/* Expand hint */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white/80 text-xs">
                <Maximize className="w-3.5 h-3.5" />
                <span>Click to expand</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMiniPlayer(false);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl text-white hover:bg-black/80 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option 3: Back-to-Video FAB */}
      <AnimatePresence>
        {activeOption === 3 && isScrolledPast && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={scrollToVideo}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-display font-medium text-sm shadow-2xl hover:scale-105 transition-transform"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Video
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoScrollOptions;
