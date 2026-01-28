import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EpisodeActionButtonsProps {
  youtubeUrl: string;
  spotifyUrl: string;
}

const EpisodeActionButtons = ({ youtubeUrl, spotifyUrl }: EpisodeActionButtonsProps) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      // User cancelled share
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const iconButtonClass = "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 hover-transition shadow-lg shadow-black/10";
  
  const fullButtonClass = "flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-sm font-medium hover-transition";

  const YouTubeIcon = () => (
    <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const SpotifyIcon = () => (
    <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* Option 1: Horizontal Row */}
        <div className="space-y-2">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Option 1: Horizontal Row</p>
          <div className="flex items-center gap-2">
            <motion.a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${fullButtonClass} flex-1`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <YouTubeIcon />
              YouTube
            </motion.a>
            <motion.a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${fullButtonClass} flex-1`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <SpotifyIcon />
              Spotify
            </motion.a>
            <motion.button 
              onClick={handleShare}
              className={`${fullButtonClass} flex-1`}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </div>
        </div>

        {/* Option 2: Stacked Buttons */}
        <div className="space-y-2">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Option 2: Stacked Buttons</p>
          <div className="flex flex-col gap-2">
            <motion.a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={fullButtonClass}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <YouTubeIcon />
              Watch on YouTube
            </motion.a>
            <motion.a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={fullButtonClass}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <SpotifyIcon />
              Listen on Spotify
            </motion.a>
            <motion.button 
              onClick={handleShare}
              className={fullButtonClass}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Share2 className="w-5 h-5" />
              Share Episode
            </motion.button>
          </div>
        </div>

        {/* Option 3: Compact Icons */}
        <div className="space-y-2">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Option 3: Compact Icons</p>
          <div className="flex items-center justify-start gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconButtonClass}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <YouTubeIcon />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-foreground text-background font-medium">
                Watch on YouTube
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href={spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconButtonClass}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <SpotifyIcon />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-foreground text-background font-medium">
                Listen on Spotify
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button 
                  onClick={handleShare}
                  className={iconButtonClass}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-foreground text-background font-medium">
                Share Episode
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Option 4: Split Layout */}
        <div className="space-y-2">
          <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Option 4: Split Layout</p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={fullButtonClass}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <YouTubeIcon />
                YouTube
              </motion.a>
              <motion.a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={fullButtonClass}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <SpotifyIcon />
                Spotify
              </motion.a>
            </div>
            <motion.button 
              onClick={handleShare}
              className={iconButtonClass}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Share2 className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EpisodeActionButtons;
