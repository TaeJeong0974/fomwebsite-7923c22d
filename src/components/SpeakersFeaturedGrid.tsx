import { motion } from "framer-motion";
import speaker1 from "@/assets/speaker-1.png";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const speakerImages = [speaker1, speaker2, speaker3, speaker4, speaker1, speaker2, speaker3, speaker4];

const speakers = [
  {
    id: 1,
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    bio: "Building the future of cloud monitoring through data-driven marketing strategies.",
    featured: true
  },
  {
    id: 2,
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    companyDomain: "squareup.com",
    bio: "Empowering small businesses with accessible financial tools and innovative campaigns."
  },
  {
    id: 3,
    name: "Ceci Stallsmith",
    title: "Chief Marketing Officer",
    company: "Loveable",
    companyDomain: "lovable.dev",
    bio: "Pioneering AI-powered product development and redefining how teams build software."
  },
  {
    id: 4,
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    companyDomain: "webflow.com",
    bio: "Championing the no-code movement and democratizing web design for creators."
  },
  {
    id: 5,
    name: "Maya Chen",
    title: "VP of Growth",
    company: "Figma",
    companyDomain: "figma.com",
    bio: "Scaling collaborative design tools to millions of creative professionals worldwide."
  },
  {
    id: 6,
    name: "Alex Rivera",
    title: "Head of Marketing",
    company: "Notion",
    companyDomain: "notion.so",
    bio: "Reimagining how teams organize knowledge and collaborate on projects."
  },
  {
    id: 7,
    name: "Jordan Blake",
    title: "Chief Marketing Officer",
    company: "Linear",
    companyDomain: "linear.app",
    bio: "Building the next generation of project management for modern software teams."
  },
  {
    id: 8,
    name: "Sam Torres",
    title: "VP of Marketing",
    company: "Vercel",
    companyDomain: "vercel.com",
    bio: "Powering the frontend cloud and accelerating web development for everyone."
  }
];

const FeaturedSpeakerCard = ({
  speaker,
  index
}: {
  speaker: typeof speakers[0];
  index: number;
}) => {
  const firstName = speaker.name.split(' ')[0];
  const lastName = speaker.name.split(' ').slice(1).join(' ');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <div className="card-base card-image hover-scale h-full">
        {/* Photo Layer - hidden at rest, revealed on hover */}
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        {/* Light grey background for rest state */}
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

        {/* Featured badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="glass rounded-xl p-2.5 hover-scale-badge">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
              alt={speaker.company}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground group-hover:text-white hover-transition">
            Keynote
          </span>
        </div>

        {/* Content - always visible at bottom */}
        <div className="card-content-bottom p-6 lg:p-8">
          <h3 className="font-display leading-[0.95] tracking-tight text-foreground hover-transition group-hover:text-white">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">
              {firstName}
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">
              {lastName}
            </span>
          </h3>
          
          {/* Reveal content on hover */}
          <div className="max-h-40 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-40 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-base text-white/70">
              {speaker.title}
            </p>
            <p className="text-base font-medium text-primary">
              {speaker.company}
            </p>
            <p className="text-sm leading-relaxed text-white/60 mt-3 max-w-md">
              {speaker.bio}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpeakerCard = ({
  speaker,
  index,
  delay
}: {
  speaker: typeof speakers[0];
  index: number;
  delay: number;
}) => {
  const firstName = speaker.name.split(' ')[0];
  const lastName = speaker.name.split(' ').slice(1).join(' ');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="card-base card-image hover-scale">
        {/* Photo Layer - hidden at rest, revealed on hover */}
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        {/* Light grey background for rest state */}
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

        {/* Company favicon badge */}
        <div className="absolute top-3 left-3 glass rounded-lg p-2 hover-scale-badge">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
            alt={speaker.company}
            className="h-4 w-4 object-contain"
          />
        </div>

        {/* Content - always visible at bottom */}
        <div className="card-content-bottom p-4">
          <h3 className="font-display leading-[0.95] tracking-tight text-foreground hover-transition group-hover:text-white">
            <span className="block text-lg sm:text-xl font-semibold">
              {firstName}
            </span>
            <span className="block text-lg sm:text-xl font-semibold">
              {lastName}
            </span>
          </h3>
          
          {/* Reveal content on hover */}
          <div className="max-h-20 mt-2 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-2 hover-transition md:group-hover:max-h-20 md:group-hover:mt-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-xs text-white/70">
              {speaker.title}
            </p>
            <p className="text-xs font-medium text-primary">
              {speaker.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpeakersFeaturedGrid = () => {
  const featuredSpeaker = speakers[0];
  const gridSpeakers = speakers.slice(1);

  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <p className="text-label mb-2">FEATURED</p>
          <h2 className="text-display-lg text-foreground">Speakers</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Featured speaker - takes left half */}
          <div className="aspect-[4/5] lg:row-span-2">
            <FeaturedSpeakerCard speaker={featuredSpeaker} index={0} />
          </div>
          
          {/* Grid of other speakers - takes right half */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
            {gridSpeakers.map((speaker, idx) => (
              <div key={speaker.id} className="aspect-[4/5]">
                <SpeakerCard 
                  speaker={speaker} 
                  index={idx + 1} 
                  delay={idx * 0.05}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakersFeaturedGrid;
