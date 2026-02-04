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
  pullQuote?: string;
}

// Shared hosts data
export const podcastHosts: PodcastHost[] = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder",
    company: "Upside",
    linkedInUrl: "https://www.linkedin.com/in/madalina/",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue.",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO",
    company: "Graphite",
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
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
    id: 0,
    slug: "intro-to-fom",
    name: "Intro to FOM",
    title: "",
    company: "",
    companyDomain: "",
    overview: "Why Authenticity Beats Automation in Modern Marketing",
    bio: "",
    fullDescription: `In this launch episode of Future of Marketing, Camille Ricketts, Ethan Smith, and Mada Seghete cut through the AI hype to discuss what's actually changing inside modern marketing teams. Drawing from real operator experience, they explore why marketing lags engineering in AI adoption, where AI creates real leverage (idea generation and pattern discovery), and why human judgment, taste, and storytelling matter more than ever.

From the tradeoffs between authenticity and reach to the risks of messy data and over-personalization, this episode offers a grounded, practical look at how marketers can move faster without losing what makes their work effective.`,
    topics: [
      "Why marketing is 12–18 months behind engineering in AI adoption",
      "Using AI for value creation, not just cost-cutting",
      "AI for ideas, humans for judgment and taste",
      "The danger of AI reasoning over messy GTM data",
      "Optimizing for algorithms vs. protecting your voice",
      "When hyper-personalization stops feeling creepy",
      "Staying current without trying every new tool",
      "Why storytellers are becoming more valuable, not less",
    ],
    chapters: [
      { time: "0:00", title: "Welcome" },
      { time: "3:00", title: "Meet the hosts" },
      { time: "10:00", title: "Why this podcast?" },
      { time: "18:00", title: "What's coming up" },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=wCDIYvFmgW8",
    spotifyUrl: "https://spotify.com",
    duration: "25 min",
    publishedDate: "Jan 1, 2026",
    comingSoon: false,
    previewVideoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    hosts: podcastHosts,
  },
  {
    id: 1,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Samsara",
    companyDomain: "samsara.com",
    overview: "Why the Best CMOs Think Like Operators, Not Marketers",
    bio: "A builder who moves fast, operates tactically, and earns trust through execution. With nearly 25 years scaling high-growth companies as CMO at Samsara, MongoDB, TripActions/Navan, and leadership roles at DocuSign and G2.",
    fullDescription: `In this episode of Future of Marketing, hosts Mada Seghete and Ethan Smith sit down with Meagen Eisenberg, CMO of Samsara, to unpack what it actually takes to build an AI-native marketing team. Meagen shares how she deployed live AI agents across marketing ops, replaced legacy software, and drove 29% YoY growth without growing headcount. The conversation goes beyond tools into culture, accountability, and why creativity and human connection still matter more than ever.`,
    topics: [
      "Operationalizing AI across 95% of the marketing team",
      "Building 13 internal AI agents: build vs. buy",
      "No-code tools for non-technical marketers",
      "Pipeline per employee as the true AI metric",
      "Tracking visibility inside LLMs in real time",
      "Why creativity becomes more valuable, not less",
      "In-person dinners over webinars in an AI world",
      "Hiring for problem solving, not static skills",
    ],
    chapters: [
      { time: "0:00", title: "Introduction" },
      { time: "4:30", title: "Meagen's journey to CMO" },
      { time: "12:15", title: "Marketing in the IoT era" },
      { time: "24:00", title: "Building high-performing teams" },
      { time: "35:45", title: "Data-driven decision making" },
      { time: "45:00", title: "Advice for aspiring CMOs" },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
    spotifyUrl: "https://spotify.com",
    duration: "52 min",
    publishedDate: "Jan 15, 2026",
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/meageneisenberg",
    previewVideoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    pullQuote: "I think the key to positioning is understanding the customer. And so you have to do the work for that. You have to be curious. You have to talk with your customers and then you can work with AI to take those insights and build out and understand positioning.",
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Rethinking Workflows in the Age of AI",
    bio: "A product-minded marketer who turns user communities into growth engines. Previously led marketing at Dropbox and Atlassian, pioneering community-driven strategies that scaled to millions of active users.",
    fullDescription: `In this episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete sit down with Lena Waters, CMO of Notion, to explore how AI is reshaping not just marketing workflows, but how teams work together. They unpack how Notion integrates AI natively into its product and go-to-market, why "show, don't tell" beats traditional enterprise selling, and how to scale brand, PLG, and enterprise motion without losing warmth or clarity.`,
    topics: [
      "Question workflows, don't just automate them",
      "'Show, don't tell' collapses sales cycles",
      "PLG and enterprise motions reinforce each other",
      "Ideas to market in hours with AI",
      "Traditional websites as a growth liability",
      "Balancing storytelling and measurement",
      "Letting customers shape your brand",
      "Warmth vs. competency when moving upmarket",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/lenawaters",
    pullQuote: "As AI becomes more agentic and autonomous, it's now more important than ever that we really understand the value we bring as humans—that EQ we need to bring to the table.",
    hosts: [podcastHosts[2], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 3,
    slug: "lindsey-irvine",
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    bio: "A fintech brand builder who makes complex financial products accessible to everyday entrepreneurs. Previously CMO at Carta and held leadership roles at PayPal, scaling marketing for millions of businesses.",
    fullDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
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
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    bio: "A technical marketing leader who bridges the gap between engineering and brand. Previously CMO at Twilio and held leadership roles at Salesforce, known for scaling marketing during hypergrowth.",
    fullDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.`,
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
