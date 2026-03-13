/**
 * Shared episode image map — single source of truth.
 * Used by PodcastSection, RelatedEpisodes, and any future component needing episode images.
 */
import guestMeagen from "@/assets/guest-meagen-eisenberg.jpg?format=webp";
import guestLena from "@/assets/guest-lena-waters.jpg?format=webp";
import guestLindsey from "@/assets/guest-lindsey-irvine.jpg?format=webp";
import guestSara from "@/assets/guest-sara-varni.jpg?format=webp";
import guestDave from "@/assets/guest-dave-steer.jpg?format=webp";
import guestKate from "@/assets/guest-kate-johnson.jpg?format=webp";
import guestSheila from "@/assets/guest-sheila-vashee.jpg?format=webp";
import guestCeci from "@/assets/guest-ceci-stallsmith.jpg?format=webp";
import guestIdan from "@/assets/guest-idan-koren.jpg?format=webp";
import guestKatrina from "@/assets/guest-katrina-wong.jpg?format=webp";
import hostMada from "@/assets/host-mada.png?format=webp";
import hostEthan from "@/assets/host-ethan.png?format=webp";
import hostCamille from "@/assets/host-camille.png?format=webp";
import ep0Poster from "@/assets/ep0-poster.png?format=webp";
import ep1Poster from "@/assets/ep1-poster.png?format=webp";
import saraCover from "@/assets/guest-sara-varni-cover.png?format=webp";
import kateCover from "@/assets/guest-kate-johnson-cover.png?format=webp";

export const EPISODE_IMAGES: Record<string, string> = {
  "the-future-of-marketing": hostMada,
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

export const POSTER_IMAGES: Record<string, string> = {
  "the-future-of-marketing": ep0Poster,
  "meagen-eisenberg": ep1Poster,
  "sara-varni": saraCover,
};

export const OG_IMAGES: Record<string, string> = {
  "the-future-of-marketing": "/images/ep0-og.png",
  "meagen-eisenberg": "/images/ep1-og.png",
  "lena-waters": "/images/og-lena-waters.jpg",
  "dave-steer": "/images/og-dave-steer.jpg",
  "sara-varni": "/images/og-sara-varni.jpg",
  "kate-johnson": "/images/og-kate-johnson.jpg",
  "idan-koren": "/images/og-idan-koren.jpg",
  "lindsey-irvine": "/images/og-lindsey-irvine.jpg",
  "sheila-vashee": "/images/og-sheila-vashee.jpg",
  "ceci-stallsmith": "/images/og-ceci-stallsmith.jpg",
  "katrina-wong": "/images/og-katrina-wong.jpg",
};

export const HOST_IMAGES = [hostMada, hostEthan, hostCamille];

export const HOST_IMAGES_BY_NAME: Record<string, string> = {
  "mada-seghete": hostMada,
  "ethan-smith": hostEthan,
  "camille-ricketts": hostCamille,
};

export const getEpisodeImage = (slug: string, index: number): string => {
  return EPISODE_IMAGES[slug] || HOST_IMAGES[index % HOST_IMAGES.length];
};
