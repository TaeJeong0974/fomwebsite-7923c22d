import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);
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
    if (!containerRef.current || !playBtnRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    playBtnRef.current.style.transform = `translate(${x - 28}px, ${y - 28}px) scale(1)`;
  };

  const handleMouseEnter = () => {
    if (playBtnRef.current) playBtnRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (playBtnRef.current) {
      playBtnRef.current.style.opacity = '0';
      playBtnRef.current.style.transform = playBtnRef.current.style.transform.replace('scale(1)', 'scale(0.8)');
    }
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${thumbnailImage || thumbnailUrl || guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Play Button - centered on mobile */}
              <div className="absolute inset-0 flex items-center justify-center sm:hidden">
                <div className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-2xl border border-white/40 flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                </div>
              </div>
              {/* Play Button - cursor follow on desktop */}
              <div
                ref={playBtnRef}
                className="hidden sm:flex absolute left-0 top-0 z-10 pointer-events-none items-center justify-center w-14 h-14 rounded-full bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]"
                style={{
                  opacity: 0,
                  transform: 'translate(0px, 0px) scale(0.8)',
                  willChange: 'transform, opacity',
                  transition: 'opacity 150ms ease-out',
                }}
              >
                <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
