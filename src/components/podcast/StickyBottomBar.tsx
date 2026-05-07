"use client";

import { useState, useEffect } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { YouTubeIcon, SpotifyIcon, ApplePodcastsIcon, APPLE_PODCASTS_URL } from "@/components/icons/PlatformIcons";

interface StickyBottomBarProps {
  youtubeUrl: string;
  spotifyUrl: string;
  appleUrl?: string;
  thumbnailUrl: string | null;
  episodeName: string;
  episodeTitle: string;
  onPlayClick?: () => void;
}

const StickyBottomBar = ({ youtubeUrl, spotifyUrl, appleUrl, thumbnailUrl, episodeName, episodeTitle, onPlayClick }: StickyBottomBarProps) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  const iconButton = "flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transition-[background,box-shadow] duration-300";
  const iconSpring = { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.8 };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed bottom-6 inset-x-0 mx-auto w-fit z-50"
        >
            <motion.div
              className="group/bar flex items-center gap-3 p-2.5 rounded-2xl bg-background/60 backdrop-blur-2xl border border-white/30 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]"
              initial={{ scale: 1.10 }}
              whileHover={{ scale: 1.22 }}
              whileTap={{ scale: 1.0 }}
              transition={iconSpring}
            >
            {thumbnailUrl && (
              <button onClick={onPlayClick} className="relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 ring-1 ring-foreground/5 hover:ring-foreground/15 transition-all duration-200 hover:scale-105 cursor-pointer">
                <img src={thumbnailUrl} alt={episodeName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            )}

            <div className="flex flex-col mr-0 max-w-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 group-hover/bar:max-w-[220px] group-hover/bar:mr-2 group-hover/bar:opacity-100">
              <span className="text-sm font-medium text-foreground truncate whitespace-nowrap">{episodeName}</span>
              <span className="text-xs text-foreground/50 truncate whitespace-nowrap">{episodeTitle}</span>
            </div>

            <div className="w-px h-8 bg-foreground/10" />

            <div className="flex items-center gap-2">
              <motion.a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={iconButton} whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.8)" }} whileTap={{ scale: 0.9 }} transition={iconSpring}>
                <YouTubeIcon className="w-4 h-4" />
              </motion.a>
              <motion.a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={iconButton} whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.8)" }} whileTap={{ scale: 0.9 }} transition={iconSpring}>
                <SpotifyIcon className="w-4 h-4" />
              </motion.a>
              <motion.a href={appleUrl || APPLE_PODCASTS_URL} target="_blank" rel="noopener noreferrer" className={iconButton} whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.8)" }} whileTap={{ scale: 0.9 }} transition={iconSpring}>
                <ApplePodcastsIcon className="w-4 h-4" />
              </motion.a>
              <motion.button onClick={handleShare} className={iconButton} whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.8)" }} whileTap={{ scale: 0.9 }} transition={iconSpring}>
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
              </motion.button>
            </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;