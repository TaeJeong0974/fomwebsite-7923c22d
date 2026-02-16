/**
 * Shared episode image map — single source of truth.
 * Used by PodcastSection, RelatedEpisodes, and any future component needing episode images.
 */
import guestMeagen from "@/assets/guest-meagen-eisenberg.jpg";
import guestLena from "@/assets/guest-lena-waters.jpg";
import guestLindsey from "@/assets/guest-lindsey-irvine.jpg";
import guestSara from "@/assets/guest-sara-varni.jpg";
import guestDave from "@/assets/guest-dave-steer.jpg";
import guestKate from "@/assets/guest-kate-johnson.jpg";
import guestSheila from "@/assets/guest-sheila-vashee.jpg";
import guestCeci from "@/assets/guest-ceci-stallsmith.jpg";
import guestIdan from "@/assets/guest-idan-koren.jpg";
import guestKatrina from "@/assets/guest-katrina-wong.jpg";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";

export const EPISODE_IMAGES: Record<string, string> = {
  "meagen-eisenberg": guestMeagen,
  "lena-waters": guestLena,
  "lindsey-irvine": guestLindsey,
  "sara-varni": guestSara,
  "dave-steer": guestDave,
  "kate-johnson": guestKate,
  "sheila-vashee": guestSheila,
  "ceci-stallsmith": guestCeci,
  "idan-koren": guestIdan,
  "katrina-wong": guestKatrina,
};

export const HOST_IMAGES = [hostMada, hostEthan, hostCamille];

export const getEpisodeImage = (slug: string, index: number): string => {
  return EPISODE_IMAGES[slug] || HOST_IMAGES[index % HOST_IMAGES.length];
};
