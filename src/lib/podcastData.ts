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
  pullQuote?: string;
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
    id: 1,
    slug: "intro-to-fom",
    name: "Intro to FOM",
    title: "",
    company: "",
    companyDomain: "",
    overview: "Meet Your Hosts: Why We're Building the Future of Marketing",
    bio: "",
    fullDescription: `In this debut episode, meet the three hosts behind Future of Marketing: Mada Seghete, Ethan Smith, and Camille Ricketts. Each brings a unique perspective from the front lines of B2B growth—from scaling startups to $100M+ in revenue, to leading marketing at iconic companies like Notion and Branch.

Together, they discuss why they created this podcast, the burning questions keeping CMOs up at night, and what listeners can expect from upcoming episodes. Whether you're a seasoned marketing leader or an aspiring one, this conversation sets the stage for the tactical, unfiltered insights that define Future of Marketing.`,
    pullQuote: "The best marketing leaders aren't just creative—they're operators who understand that execution earns trust.",
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
    previewVideoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    hosts: podcastHosts,
  },
  {
    id: 2,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Samsara",
    companyDomain: "samsara.com",
    overview: "Scaling to IPO: The Tactical Playbook",
    bio: "A builder who moves fast, operates tactically, and earns trust through execution. With nearly 25 years scaling high-growth companies as CMO at Samsara, MongoDB, TripActions/Navan, and leadership roles at DocuSign and G2.",
    fullDescription: `Meagen Eisenberg has been the CMO behind some of tech's most successful IPOs—Samsara, MongoDB, and TripActions among them. In this episode, she shares the tactical playbook she's refined over 25 years of scaling B2B companies from early stage to public market.

From building demand generation engines that actually convert, to hiring and developing world-class marketing teams, Meagen breaks down what it really takes to be a CMO who delivers results. She discusses the importance of earning trust through execution, why speed matters more than perfection, and how to maintain marketing effectiveness while preparing for an IPO.`,
    pullQuote: "Speed wins. You can always course-correct, but you can't get back the time you spent overthinking.",
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
    overview: "Community as a Growth Engine: How Notion Built a Movement",
    bio: "A product-minded marketer who turns user communities into growth engines. Previously led marketing at Dropbox and Atlassian, pioneering community-driven strategies that scaled to millions of active users.",
    fullDescription: `Lena Waters transformed Notion from a beloved tool into a global movement. In this episode, she reveals the strategies behind building one of tech's most passionate user communities—and how that community became Notion's most powerful growth engine.

Learn how to cultivate authentic user advocacy, scale user-generated content without losing quality, and create the conditions for organic word-of-mouth that no paid campaign can match. Lena shares hard-won lessons from her time at Dropbox and Atlassian, and explains why community-led growth is the future of B2B marketing.`,
    pullQuote: "Your users don't just want to use your product—they want to belong to something. Give them that belonging.",
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
    overview: "Making Fintech Human: Brand Building at Scale with Square",
    bio: "A fintech brand builder who makes complex financial products accessible to everyday entrepreneurs. Previously CMO at Carta and held leadership roles at PayPal, scaling marketing for millions of businesses.",
    fullDescription: `Financial services marketing is notoriously difficult—but Lindsey Irvine has cracked the code. As CMO of Square, she's made complex fintech products feel approachable, trustworthy, and even delightful for millions of small business owners.

In this conversation, Lindsey shares how to build brand trust in an industry where trust is everything, why clarity beats cleverness in financial messaging, and how Square maintains its scrappy startup energy while serving millions of businesses worldwide.`,
    pullQuote: "In fintech, trust isn't given—it's earned with every interaction. Your brand is your promise kept.",
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
    overview: "Marketing to Engineers: Winning Technical Audiences at Datadog",
    bio: "A technical marketing leader who bridges the gap between engineering and brand. Previously CMO at Twilio and held leadership roles at Salesforce, known for scaling marketing during hypergrowth.",
    fullDescription: `Engineers are the hardest audience to market to—and Sara Varni has mastered it. As CMO of Datadog, she's built a marketing organization that speaks the language of developers without dumbing down the message or resorting to gimmicks.

Sara shares the principles behind marketing to technical audiences: leading with value, respecting their intelligence, and building credibility through substance. She discusses how Datadog scaled from startup to public company while maintaining the authenticity that technical buyers demand.`,
    pullQuote: "Developers can smell marketing BS from a mile away. Lead with value, not hype.",
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
