import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { PodcastChapter } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface FloatingMiniPlayerProps {
  youtubeUrl?: string;
  spotifyUrl?: string;
  playTrigger?: number;
  chapters?: PodcastChapter[];
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

// Convert "MM:SS" or "H:MM:SS" to seconds
const timeToSeconds = (time: string): number => {
  const parts = time.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
};

const FloatingMiniPlayer = ({ youtubeUrl, spotifyUrl, playTrigger, chapters }: FloatingMiniPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startSeconds, setStartSeconds] = useState(0);
  const iframeKeyRef = useRef(0);
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

  const handleChapterClick = (time: string) => {
    const seconds = timeToSeconds(time);
    setStartSeconds(seconds);
    iframeKeyRef.current += 1;
    setIsPlaying(true);
  };

  const hasChapters = chapters && chapters.length > 0;

  return (
    <>
      {/* Main Video Player - Full width on mobile */}
      <div className="-ml-4 -mr-4 w-[calc(100%+2rem)] sm:ml-0 sm:mr-0 sm:w-full">
        <div className="relative aspect-video sm:rounded-xl overflow-hidden bg-black/90 sm:ring-1 sm:ring-white/10 sm:shadow-2xl sm:shadow-black/20">
          {isPlaying && videoId ? (
            <iframe
              key={iframeKeyRef.current}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&playsinline=1&start=${startSeconds}`}
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-lg shadow-black/20">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chapters */}
      {hasChapters && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Chapters</h4>
          <div className="flex flex-wrap gap-2">
            {chapters.map((chapter, i) => (
              <button
                key={i}
                onClick={() => handleChapterClick(chapter.time)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-background/70 backdrop-blur-sm border border-border hover:bg-accent hover:text-accent-foreground hover-transition"
              >
                <span className="text-muted-foreground tabular-nums text-xs">{chapter.time}</span>
                <span className="text-foreground">{chapter.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingMiniPlayer;
