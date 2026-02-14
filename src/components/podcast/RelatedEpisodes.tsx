import { PodcastEpisode } from "@/lib/podcastData";
import PodcastCard from "@/components/podcast/PodcastCard";

import guestMeagen from "@/assets/guest-meagen-eisenberg.jpg";
import guestLena from "@/assets/guest-lena-waters.jpg";
import guestLindsey from "@/assets/guest-lindsey-irvine.jpg";
import guestSara from "@/assets/guest-sara-varni.jpg";
import guestDave from "@/assets/guest-dave-steer.jpg";
import guestKate from "@/assets/guest-kate-johnson.jpg";
import guestSheila from "@/assets/guest-sheila-vashee.jpg";
import guestCeci from "@/assets/guest-ceci-stallsmith.jpg";
import guestIdan from "@/assets/guest-idan-koren.jpg";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";

const EPISODE_IMAGES: Record<string, string> = {
  'meagen-eisenberg': guestMeagen,
  'lena-waters': guestLena,
  'lindsey-irvine': guestLindsey,
  'sara-varni': guestSara,
  'dave-steer': guestDave,
  'kate-johnson': guestKate,
  'sheila-vashee': guestSheila,
  'ceci-stallsmith': guestCeci,
  'idan-koren': guestIdan,
};
const HOST_IMAGES = [hostMada, hostEthan, hostCamille];

interface RelatedEpisodesProps {
  episodes: PodcastEpisode[];
  title?: string;
}

const RelatedEpisodes = ({ episodes, title = "Other Speakers" }: RelatedEpisodesProps) => {
  if (episodes.length === 0) return null;

  return (
    <div id="related-episodes" className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12 border-t border-border">
      <h2 className="text-display-xl font-medium text-foreground mb-6 sm:mb-8">
        {title.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {episodes.map((ep, i) => (
          <PodcastCard
            key={ep.id}
            episode={ep}
            isUpcoming={ep.comingSoon}
            image={EPISODE_IMAGES[ep.slug] || HOST_IMAGES[i % HOST_IMAGES.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedEpisodes;
