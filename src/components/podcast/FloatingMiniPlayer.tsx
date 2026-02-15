import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  spotifyUrl?: string;
  playTrigger?: number;
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

const FloatingMiniPlayer = ({ youtubeUrl, spotifyUrl, playTrigger }: FloatingMiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
              className="absolute inset-0 group cursor-pointer"
              onClick={handlePlay}
              style={{
                backgroundImage: `url(${thumbnailUrl || guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Subtle overlay for better play button visibility */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/60 backdrop-blur-2xl border border-white/40 flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] group-hover:scale-110 group-hover:bg-white/80 group-hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-foreground fill-foreground ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingMiniPlayer;
