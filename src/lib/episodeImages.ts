/**
 * Shared episode image map — single source of truth.
 * Used by PodcastSection, RelatedEpisodes, and any future component needing episode images.
 */
const guestMeagen = "/images/assets/guest-meagen-eisenberg.jpg";
const guestLena = "/images/assets/guest-lena-waters.jpg";
const guestLindsey = "/images/assets/guest-lindsey-irvine.jpg";
const guestSara = "/images/assets/guest-sara-varni.jpg";
const guestDave = "/images/assets/guest-dave-steer.jpg";
const daveCover = "/images/assets/guest-dave-steer-cover.jpg";
const lenaCover = "/images/assets/guest-lena-waters-cover.jpg";
const guestKate = "/images/assets/guest-kate-johnson.jpg";
const guestCeci = "/images/assets/guest-ceci-stallsmith.jpg";
const guestIdan = "/images/assets/guest-idan-koren.jpg";
const idanCover = "/images/assets/guest-idan-koren-cover.jpg";
const guestKatrina = "/images/assets/guest-katrina-wong.jpg";
const guestWendy = "/images/assets/guest-wendy-werve.jpg";
const guestAnthony = "/images/assets/guest-anthony-kennada.jpg";
const anthonyCover = "/images/assets/guest-anthony-kennada-cover.jpg";
const guestVanessa = "/images/assets/guest-vanessa-thompson.jpg";
const vanessaCover = "/images/assets/guest-vanessa-thompson-cover.jpg";
const guestAlina = "/images/assets/guest-alina-vandenberghe.jpg";
const alinaCover = "/images/assets/guest-alina-vandenberghe-cover.jpg";
const hostMada = "/images/assets/host-mada.jpg";
const hostEthan = "/images/assets/host-ethan.jpg";
const hostCamille = "/images/assets/host-camille.jpg";
const ep0Poster = "/images/assets/ep0-poster.jpg";
const ep1Poster = "/images/assets/ep1-poster.jpg";
const saraCover = "/images/assets/guest-sara-varni-cover.jpg";
const kateCover = "/images/assets/guest-kate-johnson-cover.jpg";
const sheilaCover = "/images/assets/guest-sheila-vashee-cover.jpg";
const sheilaPoster = "/images/assets/guest-sheila-vashee-poster.jpg";
const ceciCover = "/images/assets/guest-ceci-stallsmith-cover.png";
const lindseyCover = "/images/assets/guest-lindsey-irvine-cover.jpg";
const wendyCover = "/images/assets/guest-wendy-werve-cover.jpg";

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
  "wendy-werve": guestWendy,
  "alina-vandenberghe": guestAlina,
  "anthony-kennada": guestAnthony,
  "vanessa-thompson": guestVanessa,
};

export const POSTER_IMAGES: Record<string, string> = {
  "the-future-of-marketing": ep0Poster,
  "meagen-eisenberg": ep1Poster,
  "lena-waters": lenaCover,
  "sara-varni": saraCover,
  "dave-steer": daveCover,
  "kate-johnson": kateCover,
  "sheila-vashee": sheilaPoster,
  "ceci-stallsmith": ceciCover,
  "lindsey-irvine": lindseyCover,
  "idan-koren": idanCover,
  "wendy-werve": wendyCover,
  "alina-vandenberghe": alinaCover,
  "anthony-kennada": anthonyCover,
  "vanessa-thompson": vanessaCover,
};

const OG_VERSION = "v4";

export const OG_IMAGES: Record<string, string> = {
  "the-future-of-marketing": `/images/og-the-future-of-marketing.jpg?${OG_VERSION}`,
  "meagen-eisenberg": `/images/og-meagen-eisenberg.jpg?${OG_VERSION}`,
  "lena-waters": `/images/og-lena-waters.jpg?${OG_VERSION}`,
  "dave-steer": `/images/og-dave-steer.jpg?${OG_VERSION}`,
  "sara-varni": `/images/og-sara-varni.jpg?${OG_VERSION}`,
  "kate-johnson": `/images/og-kate-johnson.jpg?${OG_VERSION}`,
  "idan-koren": `/images/og-idan-koren.jpg?${OG_VERSION}`,
  "lindsey-irvine": `/images/og-lindsey-irvine.jpg?${OG_VERSION}`,
  "sheila-vashee": `/images/og-sheila-vashee.jpg?${OG_VERSION}`,
  "ceci-stallsmith": `/images/og-ceci-stallsmith.jpg?${OG_VERSION}`,
  "katrina-wong": `/images/og-katrina-wong.jpg?${OG_VERSION}`,
  "wendy-werve": `/images/og-wendy-werve.jpg?${OG_VERSION}`,
  "alina-vandenberghe": `/images/og-alina-vandenberghe.jpg?${OG_VERSION}`,
  "anthony-kennada": `/images/og-anthony-kennada.jpg?${OG_VERSION}`,
  "vanessa-thompson": `/images/og-vanessa-thompson.jpg?${OG_VERSION}`,
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
