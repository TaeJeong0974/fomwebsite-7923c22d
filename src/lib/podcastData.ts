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
  themes?: string[];
  detailTags?: string[];
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
    spotifyUrl:
      "https://open.spotify.com/episode/1xPoUDXy3pbb2Qmlh1PNC6?si=xuypOIK6TQW4_IFCUSuysw",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/why-authenticity-beats-automation-in-modern-marketing/id1876216633?i=1000750164421",
    duration: "25 min",
    publishedDate: "Jan 1, 2026",
    pullQuote:
      "Whenever there's a new technology, the adoption cycle is actually longer than people often think. If you think about when the Internet was introduced, it took a very long time to actually adopt the Internet and apply it in novel ways. Same with mobile, same with social. And so with AI, I think there's a small number of people who can think 10 steps ahead and most people cannot.",
    themes: ["AI"],
    detailTags: ["AI Strategy", "Storytelling", "Authenticity", "Culture"],
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
    spotifyUrl:
      "https://open.spotify.com/episode/5O39m6pE2VTlZItwWQKmQr?si=tnXuTP1sQdyFEVQLujZNCw",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/why-the-best-cmos-think-like-operators-not-marketers/id1876216633?i=1000750167406",
    duration: "52 min",
    publishedDate: "Jan 15, 2026",
    themes: ["AI", "Work / Culture"],
    detailTags: ["AI Strategy", "Automation", "Leadership", "AEO", "Culture"],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/meageneisenberg",
    previewVideoUrl: undefined,
    pullQuote:
      "I think the key to positioning is understanding the customer. And so you have to do the work for that. You have to be curious. You have to talk with your customers and then you can work with AI to take those insights and build out and understand positioning.",
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
      'Why "show, don\'t tell" collapses enterprise sales cycles by putting prospects directly into the product',
      "How PLG and enterprise motions reinforce each other instead of competing",
      "How Notion moves ideas from concept to market in hours using AI-enabled knowledge sharing",
      "Why traditional websites may be becoming a growth liability in an AI-first discovery world",
      "How to balance storytelling and measurement when proving marketing's value internally",
      "Why letting customers and employees shape your brand creates stronger consistency than rigid control",
      'The "warmth vs. competency" framework for moving upmarket without losing what made you loved',
    ],
    chapters: [],
    youtubeUrl: "https://www.youtube.com/watch?v=IkdI15f6M58",
    spotifyUrl:
      "https://open.spotify.com/episode/4ptwfmKxVRcgTcZ40nfneK?si=19ec729943344e47&nd=1&dlsi=0fe7c0d94637454f",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/rethinking-workflows-in-the-age-of-ai-with-lena-waters/id1876216633?i=1000750505883",
    duration: "51 min",
    publishedDate: "Feb 19, 2026",
    themes: ["Brand", "GTM"],
    detailTags: [
      "Future of Work",
      "GTM Strategy",
      "Brand",
      "Community",
      "Storytelling",
      "Visibility",
      "ROI",
    ],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/lenawaters",
    pullQuote:
      "This idea now that AI can work alongside you, as we know, it's becoming much more agentic. It's starting to become autonomous. As we become more trusting and open with it, it's going to fill in the gaps that we have. And so, it's now more important than ever that we really understand the value that we bring as humans and that sort of EQ that we need to bring to the table.",
    hosts: [podcastHosts[1], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 3,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    companyDomain: "webflow.com",
    overview: "Trust Is The Ultimate Differentiator In The Age Of AI",
    bio: "is the Chief Marketing Officer at Webflow and an experienced marketing leader with cross-category expertise spanning B2C, B2B, and developer marketing. He has held senior leadership roles at some of the world's most iconic technology companies, including Facebook, Twitter, eBay, PayPal, and Cloudflare, where he helped scale the company through its IPO.\n\nDave specializes in product and solutions marketing, brand strategy, and go-to-market execution, leading large global teams through periods of hyper-growth and market transformation.\n\nLearn more about how Webflow helps marketing teams create, manage, and optimize personalized web experiences that drive real results.",
    fullDescription:
      "AI is accelerating everything. But acceleration without trust just amplifies risk.\n\nIn this episode of Future of Marketing, hosts Ethan Smith and Mada Seghete talk with Dave Steer, CMO of Webflow, to explore why trust is becoming the defining advantage for companies navigating the AI era.\n\nDrawing from two decades of experience across platforms like eBay, PayPal, Facebook, Twitter, and Cloudflare including helping lead Cloudflare through its IPO, Dave introduces a simple but powerful framework: (Reliability + Credibility + Approachability) ÷ Self-Interest. In a world where AI can generate anything, trust determines what customers actually believe.\n\nThe conversation digs into why the average CMO tenure is just 18 months, and how attribution theater, not incremental ROI, is quietly eroding marketing's credibility inside companies. Dave argues that marketing teams must tie their work to real, dollar-based impact measured against a single north star metric, or risk being seen as cost centers rather than growth drivers.\n\nThis episode is a candid blueprint for marketing leaders who want to prove value to the CFO, build durable trust with customers, and evolve their teams before the market forces them to.",
    topics: [
      "The Trust Equation: (Reliability + Credibility + Approachability) ÷ Self-Interest and why it determines whether customers buy",
      "Why most CMOs struggle to prove value and how to shift from attribution theater to incremental ROI",
      "How to evaluate a CMO role using the Three-Part Fit Test: people, bones (TAM), and personal narrative",
      "Why positioning requires choosing a lane you can own even when the market shifts weekly",
      "The three phases of AI adoption: assistant, agentic workflows, and the future go-to-market engineer",
      "How creativity becomes a competitive moat in an AI-saturated, attention-fragmented world",
      "Why authentic customer stories outperform polished testimonials",
      "Practical ways to protect deep work and strategic thinking in an always-on environment",
    ],
    chapters: [],
    youtubeUrl: "https://www.youtube.com/watch?v=wbPjgzN9B3s",
    spotifyUrl: "https://open.spotify.com/episode/11wp5t22MdBePMEHfwe89S",
    duration: "55 min",
    publishedDate: "Feb 26, 2026",
    themes: ["Brand", "AI", "Measurement"],
    detailTags: [
      "Brand Trust",
      "AI Adoption",
      "GTM Strategy",
      "Visibility",
      "ROI",
      "Leadership",
    ],
    comingSoon: false,
    hosts: [podcastHosts[2], podcastHosts[0]], // Ethan Smith, Mada Seghete
  },
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    overview:
      "From Community To Revenue: Building An AI-First Marketing Engine",
    bio: "is the Chief Marketing Officer at Datadog, where she leads global marketing for the cloud monitoring and security platform. Previously served as CMO at Twilio and held leadership roles at Salesforce, known for bridging the gap between engineering and brand while scaling marketing during hypergrowth.",
    fullDescription:
      "Marketing isn't disappearing. But the org chart you're used to might.\n\nIn this episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete talk with Sara Varni, CMO of Datadog, to discuss what marketing teams must unlearn as AI reshapes workflows, attribution, and buyer behavior.\n\nWith over a decade at Salesforce and CMO roles at Twilio, Attentive, and now Datadog, Sara has seen multiple platform shifts. Her take is pragmatic: AI should automate the soul-crushing tasks — resizing ads, writing redundant copy variations, summarizing notes — not the strategic thinking and creative judgment that differentiate great teams.\n\nThe conversation dives into the developer-buyer paradox: how do you market to hands-on technical users without alienating the economic decision-makers? Sara shares concrete plays, including Twilio's enterprise hackathons that aligned developers and executives in a single day, collapsing sales cycles and creating internal champions.\n\nThis episode is a blueprint for marketing leaders navigating bottom-up adoption, enterprise expansion, and AI-driven workflow shifts without losing credibility, creativity, or customer trust.",
    topics: [
      'How to market to developers without "marketing" to them — why relevance beats messaging',
      "Why PLG and enterprise should be treated as one unified funnel, not competing ladders",
      "The enterprise hackathon playbook for aligning developers and executives in a single motion",
      "How to measure event ROI with real pipeline-to-spend ratios (and build trust with sales)",
      "Which marketing tasks AI should automate and which must remain human",
      "How to prevent sales from overharvesting bottom-up adoption and damaging trust",
      "Why land-and-expand models demand different content strategies for new vs. existing customers",
      "How community-driven growth becomes a moat in an AI-saturated world",
      'Why rebuilding your org "from a clean sheet" may be the only way to survive the AI shift',
    ],
    chapters: [],
    youtubeUrl: "https://youtu.be/SjqP0Heq4wM",
    spotifyUrl: "https://open.spotify.com/episode/3ArZEIpkamKgHh2HblUgsX",
    appleUrl: "https://apple.co/4l7QPM6",
    duration: "54 min",
    publishedDate: "Mar 5, 2026",
    themes: ["AI", "GTM", "Measurement"],
    detailTags: [
      "Developer-First",
      "AI Adoption",
      "GTM Strategy",
      "Attribution & Measurement",
      "Authenticity",
    ],
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/saravarnibright/",
    pullQuote: undefined,
    hosts: [podcastHosts[1], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 5,
    slug: "kate-johnson",
    name: "Kate Johnson",
    title: "Chief Marketing Officer",
    company: "Dscout",
    companyDomain: "dscout.com",
    overview: "AI, Alignment, And The Death Of Single-Touch Marketing",
    bio: "is the Chief Marketing Officer at Dscout, where she leads demand generation, digital, content, field, partner, account-based marketing, and BDR teams. A growth marketer and team builder, she has helped multiple companies scale from ~$30M to $80M in revenue by building disciplined, efficient demand engines.\n\nKate is known for resourcefulness, operational clarity, and coaching-driven leadership. She structures teams to punch above their weight — hiring adaptable generalists, breaking down silos, and fostering cross-functional fluency.",
    fullDescription:
      "What if attribution isn't clarifying your strategy but quietly breaking it?\n\nIn this episode of Future of Marketing, hosts Ethan Smith and Mada Seghete sit down with Kate Johnson, CMO of Dscout, to challenge the obsession with single-source attribution and the internal damage it can cause.\n\nInstead of arguing over which channel \"sourced\" a deal, Kate explains how her team focuses on deal stories — understanding the full narrative of influence across touchpoints. Powered in part by tools like Upside, this approach shifts the conversation from credit-taking to clarity: what combination of efforts actually moved the buyer forward?\n\nKate also unpacks how she's structured her marketing team to operate like project-based pods — lean, cross-functional, and built around ownership. The result: less SLA theater, more accountability, and tighter alignment with sales. She shares why moving SDRs under marketing can transform feedback loops, how shared revenue metrics outperform isolated KPIs, and why high-touch collaboration with sales still wins.\n\nFrom the power of in-the-moment user research to the strategic value of no-meeting Wednesdays, this episode is a blueprint for building a marketing function that thinks clearly, moves efficiently, and earns executive trust.",
    topics: [
      "Why single-source attribution undermines team morale and what to use instead",
      "How to use deal storytelling to show real influence across the funnel",
      'The "project pod" org structure that helps small teams outperform bigger budgets',
      "Why moving SDRs under marketing creates tighter GTM alignment",
      "How shared revenue metrics (win rate, velocity) replace siloed KPIs",
      "Why in-person moments often outperform high-production paid tactics",
      "How to build customer-led content that actually resonates",
      "What AI is great at (pattern recognition, drafting, data parsing) and where it fails (discovery, taste, judgment)",
      "Why leadership requires protected thinking time and how to operationalize it",
    ],
    chapters: [],
    youtubeUrl: "https://www.youtube.com/watch?v=esWCvWhKgNY",
    spotifyUrl: "https://open.spotify.com/episode/6hGjkK6bxEQ0uG7kDobCBA",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/ai-alignment-and-the-death-of-single-touch/id1876216633?i=1000754858206",
    duration: "50 min",
    publishedDate: "Mar 12, 2026",
    themes: ["Brand", "AI", "Community"],
    detailTags: [
      "Attribution & Measurement",
      "Storytelling",
      "Sales & Marketing Alignment",
      "Leadership",
      "AI Strategy",
      "Community",
      "Events",
    ],
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/katejohnson/",
    pullQuote: undefined,
    hosts: [podcastHosts[2], podcastHosts[0]], // Ethan Smith, Mada Seghete
  },
  {
    id: 6,
    slug: "sheila-vashee",
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "Figma",
    companyDomain: "figma.com",
    overview:
      "Community Is the Moat: How Figma Turns Product Passion into Revenue",
    bio: "is the Chief Marketing Officer at Figma, where she oversees marketing, communications, growth, and customer support. She previously served as CMO and Consumer GM at Ethos, VP of Marketing and Growth at Opendoor, and was the second marketing hire at Dropbox, helping scale the company to over $1 billion in revenue.\n\nSheila is also a Venture Partner at Basis Set Ventures, advising early-stage companies on growth and operations. She began her career as an investment banker at Morgan Stanley and holds a BA in Economics from Stanford University and an MBA from UC Berkeley.",
    fullDescription: `In this episode of Future of Marketing, hosts Ethan Smith and Camille Ricketts talk with Sheila Vashee, Chief Marketing Officer at Figma, about scaling one of the most beloved creative tools in the world from product-led growth roots to enterprise expansion and AI-native workflows.

Sheila's career spans Dropbox, Opendoor, Ethos, and now Figma—companies that didn't just grow, but became movements. At Figma, she's helped steward a brand built on community, co-creation, and craft. With over 200 "Friends of Figma" chapters globally and an annual Config conference dubbed the "Coachella for designers," Figma has turned user enthusiasm into durable distribution.

The conversation explores what companies get wrong about PLG (optimizing before earning user love), how 70% of Figma's enterprise deals begin with individual users, and why expansion works best when it feels like a natural evolution—not a forced upsell.`,
    topics: [
      "Why extreme user love, not funnel optimization, is the foundation of product-led growth",
      "How to transition from PLG to enterprise without alienating your core community",
      "The role of sharing and collaboration in creating natural distribution loops",
      "Why 70% of enterprise deals can start with individual users—and how to nurture that motion",
      "How Config became a cultural moment (and why community-driven content beats sales-heavy agendas)",
      'What "show, don\'t tell" means in AI-era marketing',
      "How Figma thinks about partnering with multiple AI model providers",
      "Why vibe coding is an entry point—not a replacement for craft",
      "How marketing creates coherence in a world of accelerating product velocity",
      "Why human judgment and taste remain the ultimate differentiator in design",
    ],
    chapters: [],
    youtubeUrl: "https://youtu.be/h8K72wYLNZE",
    spotifyUrl: "https://open.spotify.com/episode/1Xm3dsQsGX5KSYckjQxkeo",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/community-is-the-moat-how-figma-turns-product-passion/id1876216633?i=1000756337876",
    duration: "38:59",
    publishedDate: "Mar 19, 2026",
    themes: ["GTM", "AI", "Brand"],
    detailTags: [
      "PLG",
      "Brand Experience",
      "AI Marketing",
      "GTM",
      "AI Strategy",
      "Human Factor",
    ],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/sheilavashee",
    pullQuote:
      "Your craft as a designer, as a human, your craft, your taste, what you bring to the table is actually what sets your product apart, and that can't be automated. No matter how many tools you have at your disposal, your judgment, your craft is what makes your product special.",
    hosts: [podcastHosts[2], podcastHosts[1]], // Ethan Smith, Camille Ricketts
  },
  {
    id: 7,
    slug: "lindsey-irvine",
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    overview: "Why Customer Obsession and AI Make the Strongest Marketing Team",
    bio: "is the Chief Marketing Officer at Square, where she leads global marketing across brand, demand, product, field, and operations to drive growth for more than 4.5 million sellers worldwide. Known for building high-performing, fast-moving teams, Lindsey focuses on connecting product innovation to real customer value, turning field insights into strategy, and creating brands that businesses choose first. Prior to Square, she served as CMO at Benchling and spent nearly a decade at Salesforce, including leadership roles as Global COO and CMO of MuleSoft.",
    fullDescription: `What happens when cutting-edge marketing meets the everyday realities of small business owners?

In this episode of Future of Marketing, hosts Mada Seghete and Camille Ricketts talk with Lindsey Irvine, Chief Marketing Officer at Square, about how marketing is fundamentally shifting in an AI-driven world, especially when your audience isn't made up of tech insiders, but real-world business operators.

Lindsey brings a unique perspective shaped by her experience across Salesforce, MuleSoft, Benchling, and now Square. At the core of her approach is a relentless focus on customer obsession—meeting business owners where they are, understanding their real-world challenges, and building marketing strategies that prioritize simplicity, trust, and time savings over technical complexity.

A central theme throughout the conversation is the emergence of marketing's new "dual mandate." It's no longer enough to create content that resonates with human buyers—you also need to create content that AI agents can discover, interpret, and recommend. As search behavior shifts toward LLMs and AI-powered overviews, traditional SEO strategies are breaking down. Lindsey shares how her team is adapting by prioritizing earned media, community-driven platforms like Reddit and YouTube, and structured, data-backed content that signals credibility to both humans and machines.

The episode also dives into the operational side of AI in marketing. Lindsey emphasizes that AI is not a shortcut for strategy—it's a multiplier. The real opportunity lies in identifying high-impact workflows that can be automated end-to-end, such as ad bidding, lead scoring, and campaign optimization, rather than simply layering AI on top of existing processes. At the same time, she highlights the importance of maintaining a strong core message that anchors the entire organization, preventing fragmentation across channels, segments, and geographies.

Looking ahead, Lindsey believes the future marketing organization will be defined by AI-first thinking, fewer but more empowered teams, and leaders who act as cross-functional "quarterbacks," orchestrating both human and AI resources to scale impact. The mindset is shifting from hiring more people to building systems and even AI agents that can 10x output without increasing headcount.`,
    topics: [
      "Why marketing now requires a dual mandate: optimizing for both human audiences and AI agents",
      "How to build and scale a single core message across segments, channels, and geographies",
      "The key differences between marketing to technologists vs. SMB business owners",
      "Why traditional B2B playbooks break when selling to real-world operators",
      "How AI-driven search (LLMs, AIO) is reshaping discovery, traffic, and visibility",
      "A practical framework for ranking in AI search: focus, measure visibility, and prioritize earned content",
      "Why earned media, community platforms, and user-generated content drive AI authority",
      "Why 'AI + human' is the new operating model and how to apply it effectively",
      "The shift from hiring teams to building AI agents that scale output",
      "Why the best marketers are becoming builders who prototype, not just storytellers who pitch",
      "How to design marketing organizations around speed, adaptability, and cross-functional leadership",
      "Why future marketing leaders must act as quarterbacks, orchestrating people, systems, and AI together",
    ],
    chapters: [
      { time: "00:00:00", title: "Intro" },
      {
        time: "00:01:37",
        title: "Customer Obsession As The Through Line Across Every Market",
      },
      {
        time: "00:04:59",
        title:
          "Reaching SMB Buyers Through Digital, Field, And Community Channels",
      },
      {
        time: "00:10:02",
        title: "Building Market-Specific Strategies For Global Growth",
      },
      {
        time: "00:13:06",
        title: "Creating One Core Message For Many Audiences",
      },
      {
        time: "00:20:16",
        title:
          "Equipping Teams With AI Tools And Automating High-Impact Workflows",
      },
      {
        time: "00:31:02",
        title: "Marketing For Both Humans And Agents In The New Search Era",
      },
      {
        time: "00:45:07",
        title: "Redefining The Future Of Marketing Teams In An AI-First World",
      },
    ],
    youtubeUrl: "https://youtu.be/EeM08OuM06M",
    spotifyUrl: "https://bit.ly/48DFFtr",
    appleUrl: "https://bit.ly/4vAEGEh",
    duration: "37:09",
    publishedDate: "Apr 16, 2026",
    themes: ["AI", "SMB", "GTM"],
    detailTags: [
      "Customer Obsession",
      "SMB Marketing",
      "AI Agents",
      "Global Growth",
      "Search",
      "Automation",
    ],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/lindseyirvine",
    pullQuote:
      "80+ percent of citations come from earned, not owned. LLMs are smart—they search for authentic authority content, not your owned content that says you're great.",
    hosts: [podcastHosts[0], podcastHosts[1]], // Mada Seghete, Camille Ricketts
  },
  {
    id: 8,
    slug: "idan-koren",
    name: "Idan Koren",
    title: "Chief Marketing Officer",
    company: "Verkada",
    companyDomain: "verkada.com",
    overview: "Marketing AI That Protects People, Places, and Businesses",
    bio: "is the Chief Marketing Officer at Verkada, where he has built marketing from the ground up into a highly technical organization as the company scaled from startup to Series F. Idan approaches marketing with the mindset of a scientist—treating data as the foundation for experimentation and AI as a tool to stress-test decisions—investing in the operational systems that quietly drive performance: attribution frameworks, lead routing infrastructure, deliverability management, and databases of first-party interaction data.",
    fullDescription: `What if the real impact of AI in marketing isn't replacing people but making each person dramatically more effective?

In this episode of Future of Marketing, hosts Ethan Smith and Camille Ricketts talk with Idan Koren, Chief Marketing Officer at Verkada, about how he's built marketing from the ground up into a highly technical organization as the company scaled from startup to Series F.

Idan approaches marketing with the mindset of a scientist - treating data as the foundation for experimentation and AI as a tool to stress-test decisions. Instead of focusing on flashy automation, his team invests in the operational systems that quietly drive performance: attribution frameworks, lead routing infrastructure, deliverability management, and databases of first-party interaction data.

One key theme throughout the conversation is that the most powerful AI applications rely on proprietary signals. Verkada's team captures every interaction with prospects, from emails and call recordings to CRM notes and uses that data to power highly contextual outreach that references real past conversations. The result is personalization that actually works at scale.

Idan also challenges several common assumptions about AI in marketing. For example, he argues that the biggest barrier to scaling outbound email isn't copy quality, it's deliverability and inbox reputation. And while many companies are focused on AI-driven "next best action" systems, he believes the underlying infrastructure needed to support those systems is still largely unsolved.

Ultimately, Idan's perspective is pragmatic: AI can accelerate execution and analysis, but marketing still requires human judgment, creative thinking, and disciplined operational systems to drive real growth.`,
    topics: [
      "How to structure a Marketing Development Rep (MDR) function that significantly increases pipeline productivity",
      "Why first-party interaction data is the most valuable signal for AI-driven personalization",
      "The hidden challenge of email deliverability and why it often matters more than messaging",
      "How building internal marketing infrastructure—lead routing, attribution, decision tools—creates long-term advantages",
      "Why many companies underestimate the importance of data quality and operational systems in AI adoption",
      'How to identify and eliminate "lukewarm wins" that quietly slow down company growth',
      "Why technical marketers and engineering-minded teams will define the next generation of marketing orgs",
      "What AI can automate and why creative strategy and conceptual thinking remain deeply human skills",
    ],
    chapters: [],
    youtubeUrl: "https://youtu.be/h2aLRyiM-5o",
    spotifyUrl: "https://bit.ly/41WB2XT",
    appleUrl: "https://bit.ly/4t1AcEe",
    duration: "53:34",
    publishedDate: "Apr 28, 2026",
    themes: ["AI", "GTM", "Data"],
    detailTags: [
      "Proprietary Data",
      "Outbound",
      "Deliverability",
      "Attribution",
      "AI Marketing",
      "Operational Systems",
    ],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/idankoren",
    pullQuote:
      "The biggest barrier to scaling outbound email isn't copy quality—it's deliverability and inbox reputation.",
    hosts: [podcastHosts[2], podcastHosts[1]], // Ethan Smith, Camille Ricketts
  },
  {
    id: 11,
    slug: "wendy-werve",
    name: "Wendy Werve",
    title: "Chief Market Officer",
    company: "Comply",
    companyDomain: "comply.com",
    overview: "The Death of the Funnel and the Rise of Signal Driven Marketing",
    bio: "is the Chief Market Officer at Comply, where she leads go-to-market strategy, demand generation, brand, and customer engagement for a fast-growing compliance platform. With a proven track record of building high-performing teams, Wendy has driven revenue growth, accelerated bookings, and increased customer retention across B2B, B2C, and B2B2C organizations.\n\nHer expertise spans account-based marketing, demand generation, product marketing, communications, and integrated GTM strategy. She has deep experience in SaaS and enterprise software, with a strong focus on data-driven marketing, modern tooling, and aligning marketing closely with business outcomes.\n\nWendy has worked across venture-backed, private equity-backed, and public companies, including involvement in M&A and IPO environments. Known for her pragmatic and forward-thinking approach, she brings a unique perspective on how marketing leaders can evolve beyond traditional frameworks and operate as strategic drivers of growth in an AI-first world.",
    fullDescription: `What if the marketing funnel isn't just outdated but actively holding you back?

In this episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete sit down with Wendy Werve, Chief Market Officer at Comply, to unpack a fundamentally different way to think about go-to-market in an AI-driven world.

Wendy challenges the traditional funnel model, arguing that buyer journeys are no longer linear or predictable. Instead, she introduces the concept of "pinball marketing" — a dynamic, signal-driven approach where teams respond to real-time buyer intent rather than forcing prospects through predefined stages. In this world, success depends less on controlling the journey and more on recognizing and reacting to high-intent moments as they happen.

A central theme in the conversation is the shift from volume-based marketing to precision and speed. Wendy explains how AI enables teams to detect signals, personalize outreach, and respond faster than ever before, making speed-to-lead and relevance far more important than sheer output. This shift also requires rethinking measurement: moving away from MQLs and vanity metrics toward pipeline, conversion rates, and true revenue impact.

The discussion also dives into the importance of defining the right ICP. Wendy emphasizes that ICP and persona are often confused, and that the most effective teams use data, not intuition, to identify which customers actually drive long-term value. By aligning marketing, sales, and product around these insights, companies can dramatically improve efficiency and outcomes.

Finally, the episode explores what it takes to build and sustain high-performing teams. From breaking down silos across go-to-market functions to modeling personal sustainability as a leader, Wendy underscores that long-term success comes from both operational excellence and a culture that prioritizes endurance over burnout.`,
    topics: [
      "Why the traditional marketing funnel is broken and what to use instead",
      "How 'pinball marketing' enables real-time, signal-driven engagement",
      "The difference between ICP and persona and why it matters",
      "How to use data to identify high-value customer segments",
      "Why speed-to-lead and personalization outperform volume",
      "How to measure marketing success using pipeline and conversion, not MQLs",
      "The importance of aligning marketing, sales, and product into one GTM team",
      "How adopting a VC mindset can give you an edge in martech decisions",
      "Why trust and credibility are critical in high-stakes markets",
      "How AI is reshaping execution, responsiveness, and decision-making in marketing",
      "The role of leadership in building sustainable, high-performing teams",
    ],
    chapters: [],
    youtubeUrl: "https://youtu.be/QGq0vob3AOU",
    spotifyUrl: "https://bit.ly/4utPQcr",
    appleUrl: "https://apple.co/4donDOx",
    duration: "55:19",
    publishedDate: "May 5, 2026",
    themes: ["AI", "GTM"],
    detailTags: [
      "Pinball Marketing",
      "Signal-Based GTM",
      "ICP",
      "Pipeline Metrics",
      "AI Marketing",
      "Team Building",
    ],
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/wendy-werve/",
    pullQuote:
      "AI today can do the doing of marketing. So get in and be the chief market officer, understand the market, understand the signals in your market, be the first to respond to those signals. And it's a rethink of your whole go to market, really, with a different way of operating. It's a different operating model entirely.",
    hosts: [podcastHosts[1], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 9,
    slug: "ceci-stallsmith",
    name: "Ceci Stallsmith",
    title: "CMO",
    company: "Lovable",
    companyDomain: "lovable.dev",
    overview:
      "What It Takes to Market a Product When the Category Doesn't Fully Exist Yet",
    bio: "is the CMO at Lovable, where she leads marketing for a company redefining how software gets built. Her career spans scaling developer ecosystems, advising founders, and building brands at the intersection of product and community. At Lovable, Ceci navigates the unique challenge of marketing a product that serves multiple audiences—developers, non-technical founders, and enterprise buyers—while the category itself is still being defined.",
    fullDescription: `What does it take to market a product when the category itself doesn't fully exist yet?

In this episode of Future of Marketing, hosts Ethan Smith and Camille Ricketts sit down with Cecilia Stallsmith, CMO at Lovable, to unpack the realities of building and scaling marketing in one of the fastest-moving spaces in tech.

Ceci brings a rare perspective shaped by her experience scaling developer ecosystems, advising founders, and now leading marketing at a company redefining how software gets built. At Lovable, the challenge isn't just go-to-market execution, it's defining the narrative for a product that serves multiple audiences at once: developers, non-technical founders, and enterprise buyers.

A central theme in the conversation is the misconception that developers are "immune" to marketing. In reality, Ceci argues they are deeply influenced by brand, identity, and culture—just in less obvious ways. Choosing a tool isn't just a functional decision; it's a signal of taste and belonging. That insight fundamentally changes how teams should approach messaging, design, and community-building.

The episode also explores the complexity of category creation in the age of AI. With terms like "vibe coding" and "agentic software" emerging rapidly, Ceci explains why locking into buzzwords too early can backfire. Instead, her approach is to run multiple messaging experiments simultaneously and let the market determine what sticks, rather than forcing a single narrative prematurely.

AI's role in marketing is another major focus—but not in the way most teams think. Ceci emphasizes that the real advantage isn't AI-generated content, but the ability to dramatically compress feedback loops. Faster testing, quicker iteration, and real-time insights allow smaller teams to run more campaigns, take more risks, and learn faster than ever before.

Finally, Ceci addresses the rise of AI-driven "consensus" and how it impacts brand perception. As AI systems synthesize years of content from across the internet, companies must actively shape their narrative by flooding the ecosystem with fresh, credible signals, rather than trying to erase outdated positioning.

The takeaway is clear: in a market defined by rapid change, the winners will be the ones willing to experiment faster, adapt constantly, and build brands people want to belong to.`,
    topics: [
      "Why category creation requires experimentation, not fixed positioning",
      "How to market to developers by understanding identity, taste, and culture",
      "The right way to approach emerging AI category language (and when to avoid it)",
      "How to scale marketing across multiple audiences with a single core narrative",
      "Why product-market fit does more heavy lifting than perfect messaging",
      "How AI compresses feedback loops and enables faster experimentation",
      "The shift from hiring teams to leveraging AI agents for scale",
      "Why developer loyalty is fragile and how brand influences it",
      "How to use influencers, UGC, and community to drive behavior change",
      "Why breaking brand guidelines can sometimes create more impact than enforcing them",
      "How AI-driven 'consensus' shapes your brand—and how to influence it",
      "Why the future of marketing teams favors speed, experimentation, and adaptability",
    ],
    chapters: [],
    youtubeUrl: "https://www.youtube.com/watch?v=WEE_w_c8SMs",
    spotifyUrl: "https://tinyurl.com/yw5xr4xv",
    appleUrl: "https://tinyurl.com/ysb222xx",
    duration: "67:57",
    publishedDate: "Apr 9, 2026",
    themes: ["AI", "Brand", "GTM"],
    detailTags: [
      "Category Creation",
      "Developer Marketing",
      "AI Strategy",
      "Brand Building",
      "Messaging",
      "Community",
    ],
    comingSoon: false,
    linkedInUrl: "https://linkedin.com/in/ceciliastallsmith",
    pullQuote:
      "Choosing a tool isn't just a functional decision; it's a signal of taste and belonging. That insight fundamentally changes how teams should approach messaging, design, and community-building.",
    hosts: [podcastHosts[2], podcastHosts[1]], // Ethan Smith, Camille Ricketts
  },
  {
    id: 10,
    slug: "katrina-wong",
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    companyDomain: "newrelic.com",
    overview: "",
    bio: "",
    fullDescription: "",
    topics: [],
    chapters: [],
    youtubeUrl: "",
    spotifyUrl: "",
    duration: "",
    publishedDate: "Coming Soon",
    comingSoon: true,
  },
  {
    id: 12,
    slug: "alina-vandenberghe",
    name: "Alina Vandenberghe",
    title: "Co-Founder and Co-CEO",
    company: "Chili Piper",
    companyDomain: "chilipiper.com",
    overview:
      "From 22 Marketers to 2: Automating 80% of Marketing at Chili Piper",
    bio: `Alina Vandenberghe is the co-founder and Co-CEO of Chili Piper, a demand conversion platform used by companies like Spotify, Airbnb, Shopify, and Snapchat to double inbound conversion rates. With a background in computer science, she has built mobile products used by millions at companies like Thomson Reuters, Bloomberg, and Pearson, some of which were featured by Steve Jobs on stage.

An entrepreneur from an early age, Alina started her first business before high school and has since grown Chili Piper to a near-billion-dollar valuation. Known for her technical approach to go-to-market, she combines engineering rigor with bold experimentation to rethink how modern marketing teams operate.

Through her writing and leadership, she also shares lessons on entrepreneurship, career growth, and navigating the journey as a woman and mother in tech, encouraging others to push beyond conventional limits and build on their own terms.`,
    fullDescription: `What if the future of marketing isn't about scaling teams but shrinking them?

In this episode of Future of Marketing, hosts Ethan Smith and Mada Seghete sit down with Alina Vandenberghe, Co-Founder and Co-CEO of Chili Piper, to unpack her unconventional approach to marketing: reducing her team from 22 marketers to just 2, while increasing performance and driving over 1,400 qualified booked meetings annually.

Alina brings a deeply technical and entrepreneurial perspective to marketing. With a background in computer science and experience building products used by millions, she approached marketing like an engineering problem, auditing every task, measuring impact versus effort, and systematically automating what didn't require human creativity.

A core theme throughout the conversation is that most marketing teams are overloaded with low-impact, repetitive work. By identifying and automating up to 80% of these tasks, Alina was able to free up time and resources to focus on what actually drives growth: strategy, creativity, and bold thinking.

The discussion also challenges traditional metrics. Alina explains why booked meetings alone can be misleading and emphasizes the importance of tracking the full customer journey, from pipeline to retention, to understand true business impact. She also highlights how small, often invisible improvements, like filtering out fake leads, can have outsized effects on team productivity and morale.

Another key focus is the evolving role of AI. While AI excels at handling repetitive and data-heavy tasks, Alina argues that it naturally trends toward average outcomes. The real competitive advantage comes from human marketers who can take contrarian positions, demonstrate taste, and create emotionally resonant work that stands out.

Ultimately, this conversation reframes the role of marketing teams: not as executors of campaigns, but as strategic operators who leverage AI to move faster, think bigger, and focus on the work that truly differentiates.`,
    topics: [
      "How to audit and prioritize marketing tasks for automation using impact vs. effort",
      "Why most B2B marketing teams are overstaffed and what to do instead",
      "How automating repetitive work can increase, not decrease, performance",
      "Why booked meetings aren't enough and how to measure true revenue impact",
      "The importance of mapping the full customer journey from pipeline to retention",
      "How small operational fixes (like filtering bad leads) can drive massive ROI",
      "Practical ways to unify and leverage data without complex infrastructure",
      "Why AI tends toward average outcomes and where humans still win",
      "The role of contrarian thinking and creative risk-taking in modern marketing",
      "What a high-performing, lean marketing team actually looks like",
      "How to balance automation with authenticity in channels like LinkedIn",
      "What skills will matter most for marketers in an AI-first world",
    ],
    themes: ["AI"],
    chapters: [],
    youtubeUrl: "https://youtu.be/yK0DRWzOt1I",
    spotifyUrl: "https://bit.ly/4dChZHK",
    appleUrl: "https://bit.ly/3PT2285",
    duration: "46 min",
    publishedDate: "May 19, 2026",
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/alinav/",
    pullQuote:
      "Every CMO that I speak with, they are under a lot of pressure. They feel like the goals that they have are unachievable — what the founders or the CEO is asking of them in terms of reducing headcount and results are unattainable. Yet I believe that that tension that's being felt in the air right now — it's only a tension that comes from the fact that we're going through a lot of change.",
    hosts: [podcastHosts[2], podcastHosts[0]], // Ethan Smith, Mada Seghete
  },
  {
    id: 13,
    slug: "anthony-kennada",
    name: "Anthony Kennada",
    title: "Founder and CEO",
    company: "Goldenhour",
    companyDomain: "goldenhour.ai",
    overview: "How to Build a Brand That Stands Out in the Age of AI",
    bio: "is the Founder and CEO of Goldenhour. Previously CMO at Hopin and Front, and the first head of marketing at Gainsight, where he helped scale the company from zero to $100M+ ARR and pioneered the Customer Success category. He is also the author of Category Creation (Wiley, 2019).",
    fullDescription: `In this episode of Future of Marketing, hosts Camille Ricketts and Mada Seghete sit down with Anthony Kennada, Founder and CEO of Goldenhour to examine what happens when AI automates the mechanics of marketing. Anthony argues that the old B2B playbook, gated content, nurture sequences, demo requests, and attribution fights, is breaking down because buyers have learned to avoid it. He shares why distribution is now the central challenge for AI-era companies, how Gainsight built the Customer Success category around audience pain instead of product features, and why the "human last mile" of brand strategy still depends on taste, judgment, and wisdom.`,
    topics: [
      "Why the marketing automation era trained teams to optimize for traffic, forms, nurture, and attribution instead of buyer experience",
      "How AI exposes existing weaknesses in B2B marketing rather than creating them from scratch",
      "Why distribution becomes the harder problem when products are easier to build with AI",
      "How brands can stand out through authenticity, emotion, founder presence, community, events, and belonging",
      "Why Anthony believes people will still shape enterprise buying decisions, even as agents influence shortlists and recommendations",
      "How CMOs should rethink paid distribution and consider more direct, experiential, event-led motions",
      "How the 95-5 rule changes audience strategy by forcing marketers to serve people who are watching but not ready to buy",
      "Why over-engineering measurement can reduce the creative impact of brand campaigns",
      "How GTM engineering requires both technical orchestration and real understanding of revenue, sales, and pipeline",
      "Why owned media is powerful but difficult for small B2B teams without strong content, distribution, conversion, and audience-building capability",
      "How Goldenhour uses AI-enabled brand systems and activation agents while keeping human operators at the center",
      "Why the final 10% of brand work still requires human judgment: asking better questions, knowing what to cut, and reading the room",
    ],
    themes: ["AI"],
    chapters: [],
    youtubeUrl: "https://youtu.be/rFWiDgNd5GU",
    spotifyUrl: "https://bit.ly/4ufBign",
    appleUrl: "https://apple.co/4dW63AG",
    duration: "56 min",
    publishedDate: "May 20, 2026",
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/akennada/",
    hosts: [podcastHosts[1], podcastHosts[0]], // Camille Ricketts, Mada Seghete
  },
  {
    id: 14,
    slug: "vanessa-thompson",
    name: "Vanessa Thompson",
    title: "VP, Revenue & Growth Marketing",
    company: "Twilio",
    companyDomain: "twilio.com",
    overview: "Building Radical Empathy at Scale",
    bio: "is VP of Revenue & Growth Marketing at Twilio, where she leads demand, lifecycle, and growth marketing. She helped scale Twilio from a developer tool into a $5B revenue company, leading teams through category creation, AI-powered GTM transformation, and large-scale events like SIGNAL.",
    fullDescription: "In this episode of Future of Marketing, hosts Mada Seghete and Ethan Smith sit down with Vanessa Thompson, a senior marketing leader who helped scale Twilio from a developer tool into a $5B revenue company, to unpack how AI changes the operating model for marketing. Vanessa argues that the future of marketing is radical empathy at scale: using data, AI agents, and customer signals to help buyers succeed in the moments where they are actually stuck. She shares how Twilio runs PLG and sales-assisted motions in parallel, why brand has to serve developers, solopreneurs, and enterprise CEOs at once, and how experimentation, usage data, LLM visibility, Reddit, video, and AI-powered workflows are reshaping modern GTM.",
    topics: [
      'Why Vanessa believes the future of marketing is "radical empathy at scale"',
      "How AI can remove the repetitive work that makes marketers less human and create more room for creativity, taste, discernment, and customer understanding",
      "Why the old model of forms, nurtures, lifecycle emails, and one-size-fits-all journeys is giving way to more personalized buyer support",
      "How marketers can use customer signals, usage data, product errors, search behavior, and drop-off points to improve the experience",
      "Why Twilio runs PLG and sales-assisted motions in parallel with one marketing team",
      "How brand has to do more work when the same company serves enterprise CEOs, solopreneurs, developers, and API-driven teams",
      "How Twilio built a test-and-learn culture where teams own budgets, run two-week experiments, and reallocate spend based on what works",
      "How Twilio uses AI agents across 100% of signups and inbound sales requests to help prospects get started, qualify intent, and route the right people to sales",
      "Why gated thought leadership is no longer the high-performing lead engine it used to be",
      "How Twilio approaches LLM visibility through structured developer documentation, video, Reddit, AMAs, and community participation",
      "How internal hackathons, team-built tools, and experimentation OKRs help create the cultural conditions for AI adoption",
    ],
    themes: ["AI"],
    chapters: [],
    youtubeUrl: "https://youtu.be/hpTx10wfCNw",
    spotifyUrl: "https://bit.ly/4fBv46H",
    appleUrl: "https://bit.ly/4ogT6pP",
    duration: "57 min",
    publishedDate: "Jun 9, 2026",
    comingSoon: false,
    linkedInUrl: "https://www.linkedin.com/in/vanessathomps/",
    pullQuote:
      "If we can automate away all of the tasks that make us less human and really bring to the fore all of the things that make us more human, that enables us to scale our empathy.",
    hosts: [podcastHosts[0], podcastHosts[2]], // Mada Seghete, Ethan Smith
  },
];
