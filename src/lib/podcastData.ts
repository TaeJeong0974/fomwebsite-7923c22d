export interface PodcastChapter {
  time: string;
  title: string;
}

export interface PodcastHost {
  name: string;
  title: string;
  company: string;
  companyUrl?: string;
  linkedInUrl?: string;
  bio?: string;
}

export interface NewsletterMention {
  name: string;
  url?: string;
  description?: string;
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
  newslettersMentioned?: NewsletterMention[];
}

// Shared hosts data
export const podcastHosts: PodcastHost[] = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder",
    company: "Upside",
    companyUrl: "https://www.upside.tech/",
    linkedInUrl: "https://www.linkedin.com/in/madalina/",
    bio: "is the CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders and organizes yearly retreats for 100+ women founders.",
  },
  {
    name: "Camille Ricketts",
    title: "Partner",
    company: "XYZ Venture Capital",
    companyUrl: "https://www.xyz.vc",
    linkedInUrl: "https://linkedin.com/in/camillericketts",
    bio: "is a Partner at XYZ Venture Capital, where she leads investments in product-led growth and go-to-market software startups. Prior, she was the first marketing leader at Notion, building out the brand, community, and more. She also founded First Round Review for First Round Capital, managed communications at Tesla, and reported for the Wall Street Journal.",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO",
    company: "Graphite",
    companyUrl: "https://www.graphite.io",
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
    bio: "is Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
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
    previewVideoUrl: undefined,
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
    bio: "is the Chief Marketing Officer at Samsara, where she leads brand, demand, product marketing, and go-to-market strategy for one of the fastest-growing industrial technology companies. A proven operator and builder, Meagen has helped scale companies across every stage contributing to over 23 successful exits, including IPOs and acquisitions and is known for pairing execution discipline with forward-looking strategy.",
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
    previewVideoUrl: undefined,
    pullQuote: "I think the key to positioning is understanding the customer. And so you have to do the work for that. You have to be curious. You have to talk with your customers and then you can work with AI to take those insights and build out and understand positioning.",
    newslettersMentioned: [
      { name: "The Rundown AI", url: "https://www.therundown.ai/" },
      { name: "Neuron", url: "https://www.neuron.ai/" },
      { name: "AI Fire", url: "https://www.aifire.co/" },
      { name: "Saster", url: "https://www.saastr.com/" },
    ],
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Rethinking Workflows in the Age of AI",
    bio: "is the Chief Marketing Officer at Notion, where she leads global go-to-market strategy as the company evolves from a beloved productivity tool into a leading AI-connected workspace. With over 20 years of experience at companies like Grammarly, Docusign, Responsys, and Lookout, Lena has built and led global teams across growth, demand, and brand, helping organizations scale through major platform shifts while maintaining strong brand affinity.",
    fullDescription: `In this upcoming episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete sit down with Lena Waters, CMO of Notion, to explore how AI is reshaping not just marketing workflows, but how teams work together. They unpack how Notion integrates AI natively into its product and go-to-market, why "show, don't tell" beats traditional enterprise selling, and how to scale brand, PLG, and enterprise motion without losing warmth or clarity.`,
    topics: [
      "Question workflows, don't just automate them",
      "'Show, don't tell' collapses sales cycles",
      "PLG and enterprise motions reinforce each other",
      "Traditional websites as a growth liability",
      "Warmth vs. competency when moving upmarket",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
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
    bio: "is the Chief Marketing Officer at Square, where she leads brand, communications, and marketing strategy for the financial services and digital payments company. Previously served as CMO at Carta and held leadership roles at PayPal, known for making complex financial products accessible to everyday entrepreneurs.",
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
    pullQuote: "The best marketing doesn't feel like marketing—it feels like a service you're providing to your customers.",
  },
  // Coming Soon Episodes
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.",
    bio: "is the Chief Marketing Officer at Datadog, where she leads global marketing for the cloud monitoring and security platform. Previously served as CMO at Twilio and held leadership roles at Salesforce, known for bridging the gap between engineering and brand while scaling marketing during hypergrowth.",
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
    linkedInUrl: "https://www.linkedin.com/in/saravarnibright/",
    pullQuote: "When you're marketing to developers, authenticity isn't just nice to have—it's the only thing that works.",
  },
  {
    id: 5,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "VP of Marketing",
    company: "TBD",
    companyDomain: "",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    bio: "",
    fullDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 6,
    slug: "kate-johnson",
    name: "Kate Johnson",
    title: "Head of Growth",
    company: "TBD",
    companyDomain: "",
    overview: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    bio: "",
    fullDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 7,
    slug: "sheila-vashee",
    name: "Sheila Vashee",
    title: "CMO",
    company: "TBD",
    companyDomain: "",
    overview: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    bio: "",
    fullDescription: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 8,
    slug: "idan-koren",
    name: "Idan Koren",
    title: "SVP Marketing",
    company: "TBD",
    companyDomain: "",
    overview: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    bio: "",
    fullDescription: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 9,
    slug: "katrina-wong",
    name: "Katrina Wong",
    title: "CMO",
    company: "TBD",
    companyDomain: "",
    overview: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    bio: "",
    fullDescription: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 10,
    slug: "ceci-stallsmith",
    name: "Ceci Stallsmith",
    title: "Chief Brand Officer",
    company: "TBD",
    companyDomain: "",
    overview: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    bio: "",
    fullDescription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
    topics: ["Topic one", "Topic two", "Topic three"],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
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
