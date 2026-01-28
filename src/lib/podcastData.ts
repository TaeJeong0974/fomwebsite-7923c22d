export interface PodcastChapter {
  time: string;
  title: string;
}

export interface PodcastHost {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
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
  hosts?: PodcastHost[];
}

// Shared hosts data
export const podcastHosts: PodcastHost[] = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder",
    company: "Upside",
    linkedInUrl: "https://linkedin.com/in/madaseghete",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue.",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO",
    company: "Graphite",
    linkedInUrl: "https://linkedin.com/in/ethansmith",
    bio: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, and MasterClass drive sustainable revenue growth.",
  },
  {
    name: "Camille Ricketts",
    title: "Partner",
    company: "XYZ Venture Capital",
    linkedInUrl: "https://linkedin.com/in/camillericketts",
    bio: "Partner at XYZ Venture Capital, where she leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion.",
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    slug: "intro-to-fom",
    name: "Intro to FOM",
    title: "",
    company: "",
    companyDomain: "",
    overview: "Meet the hosts and discover what Future of Marketing is all about.",
    bio: "",
    fullDescription: `Welcome to Future of Marketing! In this introductory episode, meet your hosts and discover what this podcast is all about.

We explore the big questions facing modern B2B marketers and preview the incredible guests and conversations to come.`,
    topics: [
      "Meet your hosts",
      "What is Future of Marketing?",
      "The big questions in B2B marketing",
      "What to expect from the show",
    ],
    chapters: [
      { time: "0:00", title: "Welcome" },
      { time: "3:00", title: "Meet the hosts" },
      { time: "10:00", title: "Why this podcast?" },
      { time: "18:00", title: "What's coming up" },
    ],
    youtubeUrl: "https://youtube.com",
    spotifyUrl: "https://spotify.com",
    duration: "25 min",
    publishedDate: "Jan 1, 2026",
    comingSoon: false,
  },
  {
    id: 2,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Samsara",
    companyDomain: "samsara.com",
    overview: "Exploring how remote work is reshaping company culture and marketing strategies.",
    bio: "A builder who moves fast, operates tactically, and earns trust through execution. With nearly 25 years scaling high-growth companies as CMO at Samsara, MongoDB, TripActions/Navan, and leadership roles at DocuSign and G2.",
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
    previewVideoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 3,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    bio: "Lena Waters is the Chief Marketing Officer at Notion, where she leads the marketing strategy for one of the fastest-growing productivity platforms in the world. Before Notion, Lena held senior marketing roles at Dropbox and Atlassian, where she pioneered community-driven growth strategies. She's a recognized thought leader on building authentic brand communities and product-led marketing.",
    fullDescription: "",
    topics: [
      "Community-led growth strategies",
      "User-generated content at scale",
      "Building a beloved brand",
      "Product-market fit evolution",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
    linkedInUrl: "https://linkedin.com/in/lenawaters",
  },
  {
    id: 4,
    slug: "lindsey-irvine",
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    overview: "Building a payments brand that resonates with businesses of all sizes.",
    bio: "Lindsey Irvine is the Chief Marketing Officer at Square, where she oversees brand, communications, and marketing for the financial services company serving millions of businesses. With a background in fintech and consumer marketing, Lindsey previously led marketing at Carta and held leadership roles at PayPal. She's passionate about democratizing financial services and making complex products accessible to everyday entrepreneurs.",
    fullDescription: "",
    topics: [
      "Fintech brand building",
      "Marketing to SMBs",
      "Trust and transparency in financial services",
      "The future of commerce",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
    linkedInUrl: "https://linkedin.com/in/lindseyirvine",
  },
  // Coming Soon Episodes
  {
    id: 5,
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
