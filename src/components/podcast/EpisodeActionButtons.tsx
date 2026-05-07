"use client";

import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { liquidSpring, buttonVariants, variantClasses } from "@/components/ui/LiquidButton";
import { YouTubeIcon, SpotifyIcon, ApplePodcastsIcon, APPLE_PODCASTS_URL } from "@/components/icons/PlatformIcons";

interface EpisodeActionButtonsProps {
  youtubeUrl: string;
  spotifyUrl: string;
  appleUrl?: string;
}

const EpisodeActionButtons = ({ youtubeUrl, spotifyUrl, appleUrl }: EpisodeActionButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Append a cache-busting query param so social platforms (Slack, LinkedIn, etc.)
    // re-scrape OG tags instead of serving a stale empty preview from a prior share.
    const url = new URL(window.location.href);
    url.searchParams.set("s", Date.now().toString(36).slice(-4));
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const liquidGlassButton = `group/btn flex items-center justify-center h-14 px-4 rounded-full text-sm font-medium transition-[background,box-shadow] duration-300 ${variantClasses.glass}`;
  const textClasses = "hidden md:inline overflow-hidden whitespace-nowrap max-w-0 group-hover/btn:max-w-24 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ml-0 group-hover/btn:ml-2";

  return (
    <div className="flex gap-2 sm:gap-3">
      <motion.a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={liquidGlassButton} variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap" transition={liquidSpring}>
        <YouTubeIcon className="w-6 h-6 shrink-0" />
        <span className={textClasses}>YouTube</span>
      </motion.a>

      <motion.a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={liquidGlassButton} variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap" transition={liquidSpring}>
        <SpotifyIcon className="w-6 h-6 shrink-0" />
        <span className={textClasses}>Spotify</span>
      </motion.a>

      <motion.a href={appleUrl || APPLE_PODCASTS_URL} target="_blank" rel="noopener noreferrer" className={liquidGlassButton} variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap" transition={liquidSpring}>
        <ApplePodcastsIcon className="w-6 h-6 shrink-0" />
        <span className={textClasses}>Apple</span>
      </motion.a>


      <motion.button onClick={handleShare} className={liquidGlassButton} variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap" transition={liquidSpring}>
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div key="copied" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring" as const, stiffness: 500, damping: 30 }} className="shrink-0">
              <Check className="w-6 h-6 text-emerald-500" />
            </motion.div>
          ) : (
            <motion.div key="share" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring" as const, stiffness: 500, damping: 30 }} className="shrink-0">
              <Share2 className="w-6 h-6 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={`${textClasses} ${copied ? 'text-emerald-500' : ''}`}>
          {copied ? "Copied!" : "Share"}
        </span>
      </motion.button>
    </div>
  );
};

export default EpisodeActionButtons;