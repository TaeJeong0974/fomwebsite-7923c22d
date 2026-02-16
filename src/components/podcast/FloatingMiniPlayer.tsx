import { useState, useEffect, useRef, useCallback } from "react";
import { Play, X } from "lucide-react";
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
  const [showPip, setShowPip] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;

  useEffect(() => {
    if (playTrigger && playTrigger > 0) {
      setIsPlaying(true);
      setPipDismissed(false);
    }
  }, [playTrigger]);

  // Intersection Observer to detect when main player scrolls out of view
  useEffect(() => {
    if (!playerWrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show PiP when main player is not visible and video is playing
        setShowPip(!entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(playerWrapperRef.current);
    return () => observer.disconnect();
  }, []);
  
  // YouTube thumbnail URL
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setIsPlaying(true);
    setPipDismissed(false);
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

  const handleDismissPip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPipDismissed(true);
  }, []);

  const handlePipClick = useCallback(() => {
    // Scroll back to main player
    playerWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const isPipVisible = isPlaying && showPip && !pipDismissed;

  return (
    <>
      {/* Main Video Player - Full width on mobile */}
      <div ref={playerWrapperRef} className="-ml-4 -mr-4 w-[calc(100%+2rem)] sm:ml-0 sm:mr-0 sm:w-full">
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
                  transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease-out',
                }}
              >
                <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating PiP Mini Player */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
          isPipVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="relative w-72 sm:w-80 aspect-video rounded-xl overflow-hidden bg-black shadow-2xl shadow-black/40 ring-1 ring-white/10 cursor-pointer group"
          onClick={handlePipClick}
        >
          {videoId && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&playsinline=1`}
              title="Episode Video (Mini)"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          )}
          {/* Close button */}
          <button
            onClick={handleDismissPip}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Close mini player"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
