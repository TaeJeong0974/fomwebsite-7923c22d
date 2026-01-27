export interface PodcastGuest {
  name: string;
  title: string;
  company: string;
  companyDomain: string;
}

export interface PodcastChapter {
  time: string;
  title: string;
}

export interface PodcastEpisode {
  id: number;
  slug: string;
  name: string;
  title: string;
  company: string;
  companyDomain: string;
  overview: string;
  fullDescription: string;
  topics: string[];
  chapters: PodcastChapter[];
  youtubeUrl: string;
  spotifyUrl: string;
  duration: string;
  publishedDate: string;
  comingSoon: boolean;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Samsara",
    companyDomain: "samsara.com",
    overview: "Exploring how remote work is reshaping company culture and marketing strategies.",
    fullDescription: `In this episode, we sit down with Meagen Eisenberg, CMO of Samsara, to explore how the landscape of marketing leadership is evolving in the age of connected operations.

Meagen shares her insights on building high-performing marketing teams, leveraging data to drive decisions, and the critical role of storytelling in B2B marketing.

We dive deep into how Samsara's approach to physical operations data is transforming industries, and what marketers can learn from their success.`,
    topics: [
      "Building marketing teams at scale",
      "Data-driven marketing strategies",
      "B2B storytelling that converts",
      "The future of connected operations",
      "Leadership lessons from the C-suite",
    ],
    chapters: [
      { time: "0:00", title: "Introduction" },
      { time: "4:30", title: "Meagen's journey to CMO" },
      { time: "12:15", title: "Marketing in the IoT era" },
      { time: "24:00", title: "Building high-performing teams" },
      { time: "35:45", title: "Data-driven decision making" },
      { time: "45:00", title: "Advice for aspiring CMOs" },
    ],
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    duration: "52 min",
    publishedDate: "Jan 15, 2026",
    comingSoon: false,
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    fullDescription: `Join us as we explore the art of community-led growth with Lena Waters, CMO of Notion—the workspace that's redefined how teams collaborate.

Lena reveals the secrets behind Notion's organic growth, the power of user-generated content, and why community is the ultimate competitive advantage.

This conversation covers everything from product marketing to brand building in a crowded market.`,
    topics: [
      "Community-led growth strategies",
      "User-generated content at scale",
      "Building a beloved brand",
      "Product-market fit evolution",
      "The future of collaboration tools",
    ],
    chapters: [
      { time: "0:00", title: "Welcome & introduction" },
      { time: "5:00", title: "The Notion story" },
      { time: "15:30", title: "Community as a growth engine" },
      { time: "28:00", title: "Brand building in tech" },
      { time: "40:15", title: "Future of work collaboration" },
      { time: "48:00", title: "Final thoughts" },
    ],
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    duration: "48 min",
    publishedDate: "Jan 8, 2026",
    comingSoon: false,
  },
  {
    id: 3,
    slug: "lindsey-irvine",
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    overview: "Building a payments brand that resonates with businesses of all sizes.",
    fullDescription: `In this episode, Lindsey Irvine, CMO of Square, discusses the art of marketing financial services to small and medium businesses.

Lindsey shares her insights on building trust through brand, the evolution of fintech marketing, and how Square has become synonymous with modern commerce.

We explore the challenges of marketing in a highly regulated industry while maintaining creativity and customer connection.`,
    topics: [
      "Fintech brand building",
      "Marketing to SMBs",
      "Trust and transparency in financial services",
      "The future of commerce",
      "Scaling marketing operations",
    ],
    chapters: [
      { time: "0:00", title: "Episode intro" },
      { time: "4:00", title: "Lindsey's journey to CMO" },
      { time: "15:00", title: "Building the Square brand" },
      { time: "27:00", title: "Marketing in fintech" },
      { time: "38:00", title: "SMB customer insights" },
      { time: "46:00", title: "Future of payments" },
    ],
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    duration: "50 min",
    publishedDate: "Jan 8, 2026",
    comingSoon: false,
  },
];

export const getEpisodeBySlug = (slug: string): PodcastEpisode | undefined => {
  return podcastEpisodes.find((ep) => ep.slug === slug);
};

export const getPublishedEpisodes = (): PodcastEpisode[] => {
  return podcastEpisodes.filter((ep) => !ep.comingSoon);
};
