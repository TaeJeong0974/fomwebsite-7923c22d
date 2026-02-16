import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  playTrigger?: number;
  thumbnailImage?: string;
}

// Extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

const FloatingMiniPlayer = ({ youtubeUrl, playTrigger, thumbnailImage }: FloatingMiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const springX = useSpring(useMotionValue(0), springConfig);
  const springY = useSpring(useMotionValue(0), springConfig);
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;

  useEffect(() => {
    if (playTrigger && playTrigger > 0) {
      setIsPlaying(true);
    }
  }, [playTrigger]);
  
  // YouTube thumbnail URL
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 28;
    const y = e.clientY - rect.top - 28;
    springX.set(x);
    springY.set(y);
    setMousePos({ x, y });
  };

  return (
    <>
      {/* Main Video Player - Full width on mobile */}
      <div className="-ml-4 -mr-4 w-[calc(100%+2rem)] sm:ml-0 sm:mr-0 sm:w-full">
        <div className="relative aspect-video sm:rounded-xl overflow-hidden bg-black/90 sm:ring-1 sm:ring-white/10 sm:shadow-2xl sm:shadow-black/20">
          {isPlaying && videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
              title="Episode Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div 
              ref={containerRef}
              className="absolute inset-0 group cursor-pointer"
              onClick={handlePlay}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                backgroundImage: `url(${thumbnailImage || thumbnailUrl || guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              
              {/* Play Button - cursor follow on desktop, centered on mobile */}
              <div
                className="absolute inset-0 flex items-center justify-center sm:hidden"
              >
                <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-2xl border border-white/50 flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25),0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                </div>
              </div>
              <motion.div
                className="hidden sm:flex absolute z-10 pointer-events-none items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25),0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.7)]"
                style={{
                  left: springX,
                  top: springY,
                }}
                animate={{
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1 : 0.8,
                }}
                transition={{ opacity: { duration: 0.2, delay: 0.002 }, scale: { duration: 0.2, delay: 0.002 } }}
              >
                <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
