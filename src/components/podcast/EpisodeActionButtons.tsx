import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EpisodeActionButtonsProps {
  youtubeUrl: string;
  spotifyUrl: string;
}

const EpisodeActionButtons = ({ youtubeUrl, spotifyUrl }: EpisodeActionButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  // Base pill button with width animation (hover only on desktop)
  const liquidGlassButton = "group/btn flex items-center justify-center bg-black/5 backdrop-blur-xl border border-black/10 text-foreground h-12 px-3.5 rounded-full text-sm font-medium md:hover:bg-black/10 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] shadow-sm";

  // Text that appears on hover with max-width animation (desktop only)
  const textClasses = "hidden md:inline overflow-hidden whitespace-nowrap max-w-0 group-hover/btn:max-w-24 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ml-0 group-hover/btn:ml-2";

  return (
    <div className="flex gap-2 sm:gap-3">
      {/* YouTube */}
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={liquidGlassButton}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <svg className="w-5 h-5 text-[#FF0000] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <span className={textClasses}>YouTube</span>
      </motion.a>

      {/* Spotify */}
      <motion.a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={liquidGlassButton}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <svg className="w-5 h-5 text-[#1DB954] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className={textClasses}>Spotify</span>
      </motion.a>

      {/* Apple Podcasts */}
      <motion.a
        href="https://podcasts.apple.com/podcast/futureofmarketing"
        target="_blank"
        rel="noopener noreferrer"
        className={liquidGlassButton}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <svg className="w-5 h-5 text-[#D56DFB] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.24 1.2-.828 1.32a1.09 1.09 0 01-1.32-.826c-.25-1.26-.756-2.32-1.663-3.27-1.2-1.254-2.8-1.965-4.51-1.965-3.6 0-6.475 3.24-5.976 6.93.24 1.77 1.08 3.27 2.424 4.38.492.408.564 1.14.156 1.632-.408.492-1.14.564-1.632.156-1.8-1.488-2.94-3.504-3.252-5.832-.672-5.016 3.264-9.504 8.28-9.504zm.12 4.3c.96 0 1.876.36 2.604.98.972.852 1.548 2.172 1.404 3.54-.072.72-.312 1.404-.696 1.992-.492.756-1.092 1.38-1.548 2.064-.348.528-.588 1.176-.588 1.788v.396c0 1.176-.432 2.148-1.416 2.58-.78.348-1.656.276-2.328-.312-.504-.432-.804-1.092-.804-1.8v-.36c0-.756-.264-1.524-.648-2.148-.384-.636-.9-1.152-1.356-1.776-.528-.72-.912-1.572-1.008-2.484-.168-1.608.6-3.18 1.92-4.08a3.937 3.937 0 012.464-.86zm.12 2.4a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
        </svg>
        <span className={textClasses}>Apple</span>
      </motion.a>

      {/* Share */}
      <motion.button
        onClick={handleShare}
        className={liquidGlassButton}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="copied"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="shrink-0"
            >
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="shrink-0"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className={`${textClasses} ${copied ? 'text-green-500' : ''}`}>
          {copied ? "Copied!" : "Share"}
        </span>
      </motion.button>
    </div>
  );
};

export default EpisodeActionButtons;
