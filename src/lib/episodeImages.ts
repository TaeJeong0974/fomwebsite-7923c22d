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
import sheilaCover from "@/assets/guest-sheila-vashee-cover.png?format=webp";
import sheilaPoster from "@/assets/guest-sheila-vashee-poster.png?format=webp";

export const EPISODE_IMAGES: Record<string, string> = {
  "the-future-of-marketing": hostMada,
  "meagen-eisenberg": guestMeagen,
  "lena-waters": guestLena,
  "lindsey-irvine": guestLindsey,
  "sara-varni": guestSara,
  "dave-steer": guestDave,
  "kate-johnson": guestKate,
  "sheila-vashee": sheilaCover,
  "ceci-stallsmith": guestCeci,
  "idan-koren": guestIdan,
  "katrina-wong": guestKatrina,
};

export const POSTER_IMAGES: Record<string, string> = {
  "the-future-of-marketing": ep0Poster,
  "meagen-eisenberg": ep1Poster,
  "sara-varni": saraCover,
  "kate-johnson": kateCover,
  "sheila-vashee": sheilaPoster,
};

const SITE_URL = "https://fom.xyz";
const OG_VERSION = "v3";

export const OG_IMAGES: Record<string, string> = {
  "the-future-of-marketing": `${SITE_URL}/images/og-the-future-of-marketing.png?${OG_VERSION}`,
  "meagen-eisenberg": `${SITE_URL}/images/og-meagen-eisenberg.png?${OG_VERSION}`,
  "lena-waters": `${SITE_URL}/images/og-lena-waters.png?${OG_VERSION}`,
  "dave-steer": `${SITE_URL}/images/og-dave-steer.png?${OG_VERSION}`,
  "sara-varni": `${SITE_URL}/images/og-sara-varni.png?${OG_VERSION}`,
  "kate-johnson": `${SITE_URL}/images/og-kate-johnson.png?${OG_VERSION}`,
  "idan-koren": `${SITE_URL}/images/og-idan-koren.jpg?${OG_VERSION}`,
  "lindsey-irvine": `${SITE_URL}/images/og-lindsey-irvine.jpg?${OG_VERSION}`,
  "sheila-vashee": `${SITE_URL}/images/og-sheila-vashee.png?${OG_VERSION}`,
  "ceci-stallsmith": `${SITE_URL}/images/og-ceci-stallsmith.png?${OG_VERSION}`,
  "katrina-wong": `${SITE_URL}/images/og-katrina-wong.jpg?${OG_VERSION}`,
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
