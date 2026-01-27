import { Play } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";
import episodeMeagenEisenberg from "@/assets/episode-meagen-eisenberg.png";

// Map of hero images by episode slug
const heroImages: Record<string, string> = {
  "meagen-eisenberg": episodeMeagenEisenberg,
};

interface EpisodeVideoPlayerProps {
  guestName: string;
  companyDomain?: string;
  heroImage?: string;
}

const EpisodeVideoPlayer = ({ guestName, companyDomain, heroImage }: EpisodeVideoPlayerProps) => {
  const backgroundImage = heroImage ? (heroImages[heroImage] || guestBg) : guestBg;
  
  return (
    <div 
      className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer hover-scale"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full glass flex items-center justify-center group-hover:scale-110 hover-transition">
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
        </div>
      </div>
      
      {/* Company Logo Badge */}
      {companyDomain && (
        <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${companyDomain}&sz=64`} 
            alt="Company logo"
            className="h-5 w-5 object-contain"
          />
        </div>
      )}
      
    </div>
  );
};

export default EpisodeVideoPlayer;
