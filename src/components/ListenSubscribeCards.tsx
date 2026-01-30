import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useSubscribe } from "@/contexts/SubscribeContext";

interface ListenSubscribeCardsProps {
  showTitle?: boolean;
  className?: string;
  variant?: "light" | "dark";
}

const ListenSubscribeCards = ({ showTitle = true, className = "", variant = "light" }: ListenSubscribeCardsProps) => {
  const { openSubscribe } = useSubscribe();

  const isDark = variant === "dark";
  
  const cardBase = isDark
    ? "flex flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/15 hover-transition shadow-sm cursor-pointer"
    : "flex flex-col items-center justify-center gap-4 bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-black/10 hover-transition shadow-sm cursor-pointer";

  const textColor = isDark ? "text-white" : "text-foreground";
  const textMuted = isDark ? "text-white/70" : "text-foreground/70";
  const iconBg = isDark ? "bg-white/10" : "bg-foreground/10";

  return (
    <div className={className}>
      {showTitle && (
        <h3 className={`font-display text-xl sm:text-2xl font-semibold ${textColor} mb-6 sm:mb-8`}>
          Listen & Subscribe
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Subscribe Card */}
        <motion.button
          onClick={openSubscribe}
          className={cardBase}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <Bell className={`w-6 h-6 ${textColor}`} />
          </div>
          <div>
            <h4 className={`font-display text-lg font-semibold ${textColor}`}>Subscribe</h4>
            <p className={`text-sm ${textMuted} mt-1`}>Get notified of new episodes</p>
          </div>
        </motion.button>

        {/* YouTube Card */}
        <motion.a
          href="https://youtube.com/@futureofmarketing"
          target="_blank"
          rel="noopener noreferrer"
          className={cardBase}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div>
            <h4 className={`font-display text-lg font-semibold ${textColor}`}>YouTube</h4>
            <p className={`text-sm ${textMuted} mt-1`}>Watch full episodes</p>
          </div>
        </motion.a>

        {/* Spotify Card */}
        <motion.a
          href="https://open.spotify.com/show/futureofmarketing"
          target="_blank"
          rel="noopener noreferrer"
          className={cardBase}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <div>
            <h4 className={`font-display text-lg font-semibold ${textColor}`}>Spotify</h4>
            <p className={`text-sm ${textMuted} mt-1`}>Listen on the go</p>
          </div>
        </motion.a>
      </div>
    </div>
  );
};

export default ListenSubscribeCards;