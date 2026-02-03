import { useLayoutPrototype } from "@/contexts/LayoutPrototypeContext";
import EpisodeActionButtons from "./EpisodeActionButtons";

interface EpisodeIntroBlockProps {
  overview?: string;
  guestName: string;
  episodeNumber?: number;
  isIntro: boolean;
  youtubeUrl: string;
  spotifyUrl: string;
}

const EpisodeIntroBlock = ({ 
  overview, 
  guestName, 
  episodeNumber,
  isIntro,
  youtubeUrl, 
  spotifyUrl 
}: EpisodeIntroBlockProps) => {
  const { variant } = useLayoutPrototype();

  const eyebrowText = isIntro ? "Future of Marketing" : episodeNumber ? `Episode ${episodeNumber}` : "";
  const displayText = isIntro 
    ? "Meet Your Hosts" 
    : overview || guestName;

  // Variant A: Stacked with large H1-style display
  if (variant === "A") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-label text-foreground/60 uppercase tracking-wider">
            {eyebrowText}
          </span>
          <h1 className="text-display-lg font-display font-medium text-foreground leading-[0.95]">
            {displayText}
          </h1>
        </div>
        <EpisodeActionButtons youtubeUrl={youtubeUrl} spotifyUrl={spotifyUrl} />
      </div>
    );
  }

  // Variant B: Inline eyebrow with medium display, side buttons
  if (variant === "B") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-2">
            <span className="text-label text-foreground/60 uppercase tracking-wider">
              {eyebrowText}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-foreground leading-[1.1]">
              {displayText}
            </h1>
          </div>
          <div className="lg:pb-1">
            <EpisodeActionButtons youtubeUrl={youtubeUrl} spotifyUrl={spotifyUrl} />
          </div>
        </div>
      </div>
    );
  }

  // Variant C: Centered hero block
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-3">
        <span className="text-label text-foreground/60 uppercase tracking-wider">
          {eyebrowText}
        </span>
        <h1 className="text-display-lg font-display font-medium text-foreground leading-[0.95] mx-auto">
          {displayText}
        </h1>
      </div>
      <div className="flex justify-center">
        <EpisodeActionButtons youtubeUrl={youtubeUrl} spotifyUrl={spotifyUrl} />
      </div>
    </div>
  );
};

export default EpisodeIntroBlock;
