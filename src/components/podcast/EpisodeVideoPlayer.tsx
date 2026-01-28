import { Play } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

const EpisodeVideoPlayer = () => {
  return (
    <div 
      className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        backgroundImage: `url(${guestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass flex items-center justify-center group-hover:scale-110 hover-transition">
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
};

export default EpisodeVideoPlayer;
