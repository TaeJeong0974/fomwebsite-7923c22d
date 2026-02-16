import { useState, useEffect, useRef, useCallback } from "react";
import { Play, X } from "lucide-react";
import { YouTubeIcon, SpotifyIcon, ApplePodcastsIcon, APPLE_PODCASTS_URL } from "@/components/icons/PlatformIcons";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  spotifyUrl?: string;
  playTrigger?: number;
  thumbnailImage?: string;
}

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
  const [hideAtBottom, setHideAtBottom] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);
  const [pipRight, setPipRight] = useState(96);
  const [pipWidth, setPipWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;

  useEffect(() => {
    const updatePosition = () => {
      const sidebar = document.querySelector('[data-pip-anchor]');
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        setPipRight(window.innerWidth - rect.right);
        setPipWidth(rect.width);
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useEffect(() => {
    if (playTrigger && playTrigger > 0) {
      setIsPlaying(true);
      setPipDismissed(false);
    }
  }, [playTrigger]);

  useEffect(() => {
    if (!playerWrapperRef.current) return;
    const playerEl = playerWrapperRef.current;
    const bottomTargets: Element[] = [];

    const timer = setTimeout(() => {
      const related = document.getElementById('related-episodes');
      const connected = document.getElementById('stay-connected');
      const footer = document.getElementById('site-footer');
      if (related) bottomTargets.push(related);
      if (connected) bottomTargets.push(connected);
      if (footer) bottomTargets.push(footer);

      const playerVisible = { current: true };
      const bottomVisible = new Set<Element>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.target === playerEl) {
              playerVisible.current = entry.isIntersecting;
            } else {
              if (entry.isIntersecting) bottomVisible.add(entry.target);
              else bottomVisible.delete(entry.target);
            }
          });
          setShowPip(!playerVisible.current);
          setHideAtBottom(bottomVisible.size > 0);
        },
        { threshold: 0, rootMargin: '100px' }
      );

      observer.observe(playerEl);
      bottomTargets.forEach(el => observer.observe(el));
      cleanupRef.current = () => observer.disconnect();
    }, 500);

    return () => {
      clearTimeout(timer);
      cleanupRef.current?.();
    };
  }, []);
  
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
    setTimeout(() => setPipDismissed(false), 30000);
  }, []);

  const handlePipClick = useCallback(() => {
    playerWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const isPipVisible = showPip && !pipDismissed && !hideAtBottom;

  const listenIconButton = "w-8 h-8 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors duration-200";

  return (
    <>
      {/* Main Video Player */}
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating PiP Mini Player */}
      <div
        className={`hidden lg:block fixed bottom-6 z-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPipVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ right: `${pipRight}px`, ...(pipWidth ? { width: `${pipWidth}px` } : {}) }}
      >
      <div className="rounded-2xl p-4 bg-background/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom-right hover:scale-[1.12] hover:-translate-x-2 hover:-translate-y-2">
          <div
            className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-900 ring-1 ring-white/10 cursor-pointer group/pip"
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/pip:opacity-100 transition-opacity duration-200">
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 px-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground font-semibold">Listen on</span>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={listenIconButton} aria-label="Watch on YouTube">
                <YouTubeIcon className="w-3.5 h-3.5" />
              </a>
              {spotifyUrl && (
                <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={listenIconButton} aria-label="Listen on Spotify">
                  <SpotifyIcon className="w-3.5 h-3.5" />
                </a>
              )}
              <a href={APPLE_PODCASTS_URL} target="_blank" rel="noopener noreferrer" className={listenIconButton} aria-label="Listen on Apple Podcasts">
                <ApplePodcastsIcon className="w-3.5 h-3.5" />
              </a>
            </div>
            <button
              onClick={handleDismissPip}
              className={listenIconButton}
              aria-label="Close mini player"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
