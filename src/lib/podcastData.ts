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
  appleUrl?: string;
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
    company: "Graphite Growth",
    companyUrl: "https://www.graphite.io",
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
    bio: "is Founder and CEO of Graphite Growth, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
  },
];

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 0,
    slug: "the-future-of-marketing",
    name: "Introduction to Future of Marketing",
    title: "",
    company: "",
    companyDomain: "",
    overview: "Why Authenticity Beats Automation in Modern Marketing",
    bio: "",
    fullDescription: `Most marketers aren't being replaced by AI — they're being replaced by marketers who actually know how to use it.

In this launch episode of Future of Marketing, hosts Camille Ricketts (Operating Partner, XYZ), Ethan Smith (CEO, Graphite Growth), and Mada Seghete (CEO & Co-Founder, Upside) cut through the AI hype and talk about what they believe is changing inside marketing teams.

They discuss real use cases for AI (both personal and professional) and outline the best ways to tackle early adoption in times riddled with apprehension and uncertainty. Drilling down on why most teams are stuck using AI to make "bad" work faster, they discuss the possibility of using AI as a potential source for unconventional ideas that complement human storytelling.

From the LinkedIn AI content trap to why Reddit might be the most underrated channel for market intelligence, the hosts explore the uncomfortable tradeoffs marketers are already facing: how to (and should you) stay authentic in a landscape that's becoming overpersonalized? Along the way, you'll hear why one of our hosts refuses to let AI write their LinkedIn posts (while another has successfully used it and hit 500K views), how Ethan is using AI to find SEO patterns humans can't see, and why Camille is betting on storytelling talent as the most valuable skill of the next decade.`,
    topics: [
      "Tips to accelerate AI adoption",
      "What the Future of Marketing looks like",
      "AI use cases (both personal and professional) for each of the hosts",
      "Recommendations of when to use and not use AI (i.e., original thought leadership content)",
      "When to use AI to think outside the box",
      "The goal of this podcast: have honest conversations about what is happening inside modern marketing teams, without fluff or vendor pitches",
      "Storytelling and connection vs the risk of over-personalization",
      "Why creative directors, writers, and storytellers are becoming more valuable (not less)",
    ],
    chapters: [
      { time: "0:00", title: "Welcome" },
      { time: "3:00", title: "Meet the hosts" },
      { time: "10:00", title: "Why this podcast?" },
      { time: "18:00", title: "What's coming up" },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=rEd0_UxNxxk",
    spotifyUrl: "https://open.spotify.com/episode/1xPoUDXy3pbb2Qmlh1PNC6?si=xuypOIK6TQW4_IFCUSuysw",
    appleUrl: "https://podcasts.apple.com/us/podcast/why-authenticity-beats-automation-in-modern-marketing/id1876216633?i=1000750164421",
    duration: "25 min",
    publishedDate: "Jan 1, 2026",
    pullQuote: "Whenever there's a new technology, the adoption cycle is actually longer than people often think. If you think about when the Internet was introduced, it took a very long time to actually adopt the Internet and apply it in novel ways. Same with mobile, same with social. And so with AI, I think there's a small number of people who can think 10 steps ahead and most people cannot.",
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
    fullDescription: `Most marketing teams are "using AI." Very few are actually operationalizing it.

In this episode of Future of Marketing, hosts Mada Seghete and Ethan Smith are joined by Meagen Eisenberg, CMO of Samsara, to break down how she rebuilt her marketing org around AI agents and what changed as a result.

Meagen shares exactly how her team deployed 13 live AI marketing agents (with 26 more on the way) to replace expensive SaaS tools, automate 50% of marketing ops tickets, and enable a flat team to drive significant growth in pipeline. The real story isn't the agents themselves - it's the operating model behind them. AI adoption didn't happen organically; it was enforced through training, internal hackathons, performance reviews, and a culture that made daily AI usage non-negotiable.

The conversation tackles the uncomfortable tradeoffs leaders now face: when to build vs. buy, how much technical skill marketers really need, and why AI doesn't eliminate creativity - it removes the production work that held it back. Meagen also explains why she still believes intimate in-person dinners outperform webinars, how Samsara tracks LLM visibility using Lighthouse, an internally built AI tool, and why pipeline per marketer is a key productivity metric.

This episode is a practical blueprint for CMOs and marketing leaders who want AI to move the business, not just the slide deck.`,
    topics: [
      "How Meagen operationalized AI across 95% of her marketing team without waiting for perfect tools",
      "Why Samsara built 13 internal AI marketing agents (and the real cost of build vs. buy decisions)",
      "How to get non-technical marketers using AI confidently with no-code tools",
      "Why pipeline per employee is the metric that can expose whether AI is actually working",
      "How Samsara tracks and competes for visibility inside LLMs in real time",
      "What marketing actually automates away and why creativity becomes more valuable",
      "Why in-person dinners beat webinars in an AI-saturated world",
      "How to interview and hire for AI-era problem solving, not static skills",
    ],
    chapters: [
      { time: "0:00", title: "Introduction" },
      { time: "4:30", title: "Meagen's journey to CMO" },
      { time: "12:15", title: "Marketing in the IoT era" },
      { time: "24:00", title: "Building high-performing teams" },
      { time: "35:45", title: "Data-driven decision making" },
      { time: "45:00", title: "Advice for aspiring CMOs" },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=yx_k3a83J6E",
    spotifyUrl: "https://open.spotify.com/episode/5O39m6pE2VTlZItwWQKmQr?si=tnXuTP1sQdyFEVQLujZNCw",
    appleUrl: "https://podcasts.apple.com/us/podcast/why-the-best-cmos-think-like-operators-not-marketers/id1876216633?i=1000750167406",
    duration: "52 min",
    publishedDate: "Jan 15, 2026",
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/meageneisenberg",
    previewVideoUrl: undefined,
    pullQuote: "I think the key to positioning is understanding the customer. And so you have to do the work for that. You have to be curious. You have to talk with your customers and then you can work with AI to take those insights and build out and understand positioning.",
    hosts: [podcastHosts[2], podcastHosts[0]], // Ethan Smith, Mada Seghete
    
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
    fullDescription: `AI isn't your new employee. It's your new teammate and that changes how marketing, product, and go-to-market teams operate at a fundamental level.

In this episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete talk with Lena Waters, CMO of Notion, about how one of the world's most beloved productivity tools is evolving into an AI-connected workspace and how that shift shows up not just in the product, but across the entire organization.

Lena shares how Notion avoids the common trap of treating AI like a feature add-on. Instead, her team challenges customers to rethink whether existing workflows should exist at all. The conversation explores how Notion collapses discovery time in enterprise deals by bringing prospects directly into the product, why PLG and enterprise are part of the same continuous loop, and how internal teams move from idea to market in hours, not weeks.

They also tackle bigger questions most marketers aren't ready for yet: whether traditional websites and landing pages are becoming legacy artifacts, why storytelling still matters as much as attribution, and how empowering customers and employees to tell your brand story creates more consistency than strict brand governance ever could.

This episode is a blueprint for marketing leaders navigating the shift from AI as automation to AI as transformation.`,
    topics: [
      "How to reframe AI from automating workflows to questioning whether those workflows should exist",
      "Why \"show, don't tell\" collapses enterprise sales cycles by putting prospects directly into the product",
      "How PLG and enterprise motions reinforce each other instead of competing",
      "How Notion moves ideas from concept to market in hours using AI-enabled knowledge sharing",
      "Why traditional websites may be becoming a growth liability in an AI-first discovery world",
      "How to balance storytelling and measurement when proving marketing's value internally",
      "Why letting customers and employees shape your brand creates stronger consistency than rigid control",
      "The \"warmth vs. competency\" framework for moving upmarket without losing what made you loved",
    ],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    appleUrl: undefined,
    duration: "",
    publishedDate: "Feb 26, 2026",
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/lenawaters",
    pullQuote: "This idea now that AI can work alongside you, as we know, it's becoming much more agentic. It's starting to become autonomous. As we become more trusting and open with it, it's going to fill in the gaps that we have. And so, it's now more important than ever that we really understand the value that we bring as humans and that sort of EQ that we need to bring to the table.",
    hosts: [podcastHosts[1], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 3,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    companyDomain: "webflow.com",
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
    slug: "kate-johnson",
    name: "Kate Johnson",
    title: "Chief Marketing Officer",
    company: "Dscout",
    companyDomain: "dscout.com",
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
    id: 6,
    slug: "idan-koren",
    name: "Idan Koren",
    title: "Chief Marketing Officer",
    company: "Verkada",
    companyDomain: "verkada.com",
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
    id: 7,
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
  // Episodes without raw assets
  {
    id: 8,
    slug: "sheila-vashee",
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "Figma",
    companyDomain: "figma.com",
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
    id: 9,
    slug: "ceci-stallsmith",
    name: "Ceci Stallsmith",
    title: "Chief Marketing Officer",
    company: "Lovable",
    companyDomain: "lovable.com",
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
  {
    id: 10,
    slug: "katrina-wong",
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    companyDomain: "newrelic.com",
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
