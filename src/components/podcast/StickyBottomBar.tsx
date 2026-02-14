import { useState, useEffect } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBottomBarProps {
  youtubeUrl: string;
  spotifyUrl: string;
  thumbnailUrl: string | null;
  episodeName: string;
  episodeTitle: string;
  onPlayClick?: () => void;
}

const StickyBottomBar = ({ youtubeUrl, spotifyUrl, thumbnailUrl, episodeName, episodeTitle, onPlayClick }: StickyBottomBarProps) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the action buttons area (~300px)
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iconButton = "flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-foreground/5 transition-all duration-200 hover:scale-105";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block fixed bottom-5 right-5 z-50"
        >
          <div className="group/bar flex items-center gap-4 px-3 py-2.5 rounded-2xl bg-background/80 backdrop-blur-xl border border-foreground/[0.06] shadow-lg shadow-black/[0.08]">
            {/* Thumbnail with play icon */}
            {thumbnailUrl && (
              <button onClick={onPlayClick} className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 ring-1 ring-foreground/5 hover:ring-foreground/15 transition-all duration-200 hover:scale-105 cursor-pointer">
                <img
                  src={thumbnailUrl}
                  alt={episodeName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            )}

            {/* Episode info - hidden on hover */}
            <div className="flex flex-col mr-0 max-w-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 group-hover/bar:max-w-[220px] group-hover/bar:mr-2 group-hover/bar:opacity-100">
              <span className="text-sm font-medium text-foreground truncate whitespace-nowrap">{episodeName}</span>
              <span className="text-xs text-foreground/50 truncate whitespace-nowrap">{episodeTitle}</span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-foreground/10" />

            {/* Icons */}
            <div className="flex items-center gap-2">
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <svg className="w-4 h-4 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a href="https://podcasts.apple.com/us/podcast/future-of-marketing/id1876216633" target="_blank" rel="noopener noreferrer" className={iconButton}>
                <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </a>
              <button onClick={handleShare} className={iconButton}>
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="w-4 h-4 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Share2 className="w-4 h-4 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;
