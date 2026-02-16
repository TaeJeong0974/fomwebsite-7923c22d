import { useState, useEffect, useRef, useCallback } from "react";
import { Play, X } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  spotifyUrl?: string;
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

const FloatingMiniPlayer = ({ youtubeUrl, spotifyUrl, playTrigger, thumbnailImage }: FloatingMiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPip, setShowPip] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // kept for potential future use
  const playerWrapperRef = useRef<HTMLDivElement>(null);
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
        // Show PiP when main player is not visible
        setShowPip(!entry.isIntersecting);
        // Stop playing when scrolled out of view
        if (!entry.isIntersecting && isPlaying) {
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(playerWrapperRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);
  
  // YouTube thumbnail URL
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setIsPlaying(true);
    setPipDismissed(false);
  };

  const handleDismissPip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPipDismissed(true);
  }, []);

  const handlePipClick = useCallback(() => {
    // Scroll back to main player
    playerWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const isPipVisible = showPip && !pipDismissed;

  const handlePipPlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  }, []);

  return (
    <>
      {/* Main Video Player - Full width on mobile */}
      <div ref={playerWrapperRef} className="-ml-4 -mr-4 w-[calc(100%+2rem)] sm:ml-0 sm:mr-0 sm:w-full">
        <div className="relative aspect-video sm:rounded-xl overflow-hidden bg-neutral-900 sm:ring-1 sm:ring-white/10 sm:shadow-2xl sm:shadow-black/20">
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
            >
              <img
                src={thumbnailImage || thumbnailUrl || guestBg}
                alt="Episode thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              {/* Static Play Button - always visible */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating PiP Mini Player - always shows on scroll, not just when playing */}
      <div
        className={`hidden lg:block fixed bottom-6 right-6 z-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPipVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
      >
      <div className="rounded-xl p-2.5 bg-background/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/30">
          {/* Video */}
          <div
            className="relative w-72 sm:w-80 aspect-video rounded-lg overflow-hidden bg-neutral-900 ring-1 ring-white/10 cursor-pointer group"
            onClick={handlePipClick}
          >
            {isPlaying && videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&playsinline=1`}
                title="Episode Video (Mini)"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
            ) : (
              <img
                src={thumbnailImage || thumbnailUrl || guestBg}
                alt="Episode thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
            {/* Play button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          </div>

          {/* Listen on row below video */}
          <div className="flex items-center justify-between mt-2 px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-foreground font-semibold">Listen on</span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200"
                aria-label="Watch on YouTube"
              >
                <svg className="w-3 h-3 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {spotifyUrl && (
                <a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200"
                  aria-label="Listen on Spotify"
                >
                  <svg className="w-3 h-3 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
              )}
              <a
                href="https://podcasts.apple.com/us/podcast/future-of-marketing/id1876216633"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200"
                aria-label="Listen on Apple Podcasts"
              >
                <svg className="w-3 h-3 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </a>
            </div>
            <button
              onClick={handleDismissPip}
              className="w-7 h-7 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200"
              aria-label="Close mini player"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
