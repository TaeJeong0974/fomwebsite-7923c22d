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
  bio?: string;
  topics: string[];
  chapters: PodcastChapter[];
  youtubeUrl: string;
  spotifyUrl: string;
  duration: string;
  publishedDate: string;
  comingSoon: boolean;
  linkedInUrl?: string;
  previewVideoUrl?: string;
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
    bio: "Meagen Eisenberg is the Chief Marketing Officer at Samsara, the pioneer of the Connected Operations Cloud. With over two decades of experience in B2B marketing, she has held CMO roles at MongoDB and TripActions, and VP-level positions at DocuSign and ArcSight. Meagen is known for her expertise in demand generation, account-based marketing, and building world-class marketing teams that drive hypergrowth.",
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
    linkedInUrl: "https://linkedin.com/in/meageneisenberg",
    previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-a-laptop-in-an-office-4835-large.mp4",
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    bio: "Lena Waters is the Chief Marketing Officer at Notion, where she leads the marketing strategy for one of the fastest-growing productivity platforms in the world. Before Notion, Lena held senior marketing roles at Dropbox and Atlassian, where she pioneered community-driven growth strategies. She's a recognized thought leader on building authentic brand communities and product-led marketing.",
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
    linkedInUrl: "https://linkedin.com/in/lenawaters",
    previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-laptop-at-home-4841-large.mp4",
  },
  {
    id: 3,
    slug: "lindsey-irvine",
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    overview: "Building a payments brand that resonates with businesses of all sizes.",
    bio: "Lindsey Irvine is the Chief Marketing Officer at Square, where she oversees brand, communications, and marketing for the financial services company serving millions of businesses. With a background in fintech and consumer marketing, Lindsey previously led marketing at Carta and held leadership roles at PayPal. She's passionate about democratizing financial services and making complex products accessible to everyday entrepreneurs.",
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
    linkedInUrl: "https://linkedin.com/in/lindseyirvine",
    previewVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-typing-on-a-laptop-4770-large.mp4",
  },
  // Coming Soon Episodes
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    overview: "How observability is transforming the way engineering teams build and ship software.",
    bio: "Sara Varni is the Chief Marketing Officer at Datadog, where she leads global marketing strategy for the cloud monitoring platform trusted by thousands of enterprises. Previously, she served as CMO at Twilio and held leadership roles at Salesforce. Sara is known for her expertise in scaling marketing organizations during hypergrowth and building brands that resonate with technical audiences.",
    fullDescription: "",
    topics: [
      "Marketing to developers and engineers",
      "Building trust with technical audiences",
      "Scaling marketing at hypergrowth companies",
      "The rise of observability platforms",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
    linkedInUrl: "https://linkedin.com/in/saravarni",
  },
  {
    id: 5,
    slug: "kate-johnson",
    name: "Kate Johnson",
    title: "Chief Marketing Officer",
    company: "Mada",
    companyDomain: "mada.com",
    overview: "Redefining digital payments and the future of fintech in emerging markets.",
    bio: "Kate Johnson is the Chief Marketing Officer at Mada, where she's pioneering marketing strategies for next-generation payment solutions. With a background spanning global fintech leaders, Kate brings unique insights on building consumer trust in digital payments and navigating complex regulatory environments. She's passionate about financial inclusion and making payments seamless for everyone.",
    fullDescription: "",
    topics: [
      "Fintech marketing in emerging markets",
      "Building consumer trust in digital payments",
      "The future of cashless societies",
      "Brand building in regulated industries",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
    linkedInUrl: "https://linkedin.com/in/katejohnson",
  },
];

export const getEpisodeBySlug = (slug: string): PodcastEpisode | undefined => {
  return podcastEpisodes.find((ep) => ep.slug === slug);
};

export const getPublishedEpisodes = (): PodcastEpisode[] => {
  return podcastEpisodes.filter((ep) => !ep.comingSoon);
};

export const getComingSoonEpisodes = (): PodcastEpisode[] => {
  return podcastEpisodes.filter((ep) => ep.comingSoon);
};
