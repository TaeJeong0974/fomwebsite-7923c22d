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

  const liquidGlassButton = "group/btn flex items-center justify-center bg-black/5 backdrop-blur-xl border border-black/10 text-foreground p-3 rounded-xl text-sm font-medium hover:bg-black/10 hover-transition shadow-sm";

  // Grid-based width animation for text reveal
  const textWrapperClasses = "grid grid-cols-[0fr] group-hover/btn:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]";
  const textContentClasses = "min-w-0 overflow-hidden opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 delay-100 ease-[cubic-bezier(0.33,1,0.68,1)]";

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
        <div className={textWrapperClasses}>
          <span className={`${textContentClasses} pl-2 whitespace-nowrap`}>YouTube</span>
        </div>
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
        <div className={textWrapperClasses}>
          <span className={`${textContentClasses} pl-2 whitespace-nowrap`}>Spotify</span>
        </div>
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
              className="flex items-center"
            >
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <div className={textWrapperClasses}>
                <span className={`${textContentClasses} pl-2 whitespace-nowrap text-green-500`}>Copied!</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              <Share2 className="w-5 h-5 text-foreground shrink-0" />
              <div className={textWrapperClasses}>
                <span className={`${textContentClasses} pl-2 whitespace-nowrap`}>Share</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default EpisodeActionButtons;
