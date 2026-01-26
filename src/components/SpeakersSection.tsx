import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Rows3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SpeakersCarousel from "./SpeakersCarousel";
import SpeakersFeaturedGrid from "./SpeakersFeaturedGrid";

type LayoutType = "carousel" | "grid";

const SpeakersSection = () => {
  const [layout, setLayout] = useState<LayoutType>("carousel");

  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12"
        >
          <div>
            <p className="text-label mb-2">FEATURED</p>
            <h2 className="text-display-lg text-foreground">Speakers</h2>
          </div>
          
          {/* Layout Toggle */}
          <TooltipProvider delayDuration={300}>
            <div className="glass rounded-full p-1.5 flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLayout("carousel")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      layout === "carousel" 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Rows3 className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Carousel view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      layout === "grid" 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </motion.div>
      </div>

      {/* Animated Layout Switch */}
      <AnimatePresence mode="wait">
        {layout === "carousel" ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SpeakersCarouselContent />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SpeakersFeaturedGridContent />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Export content-only versions for the toggle
export { SpeakersCarouselContent, SpeakersFeaturedGridContent };

// Carousel content without header
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
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
    bio: "Building the future of cloud monitoring through data-driven marketing strategies."
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

const SpeakerCard = ({
  speaker,
  index
}: {
  speaker: typeof speakers[0];
  index: number;
}) => {
  const firstName = speaker.name.split(' ')[0];
  const lastName = speaker.name.split(' ').slice(1).join(' ');
  
  return (
    <div className="group h-full">
      <div className="card-base card-image hover-scale h-full">
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

        <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
            alt={speaker.company}
            className="h-5 w-5 object-contain"
          />
        </div>

        <div className="card-content-bottom card-padding">
          <h3 className="font-display leading-[0.95] tracking-tight text-foreground hover-transition group-hover:text-white">
            <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold">{firstName}</span>
            <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold">{lastName}</span>
          </h3>
          
          <div className="max-h-24 mt-3 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-24 md:group-hover:mt-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-body-sm text-white/70">{speaker.title}</p>
            <p className="text-body-sm font-medium text-primary">{speaker.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeakersCarouselContent = () => {
  return (
    <div className="container mx-auto container-padding">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {speakers.map((speaker, index) => (
            <CarouselItem key={speaker.id} className="pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="aspect-[4/5]"
              >
                <SpeakerCard speaker={speaker} index={index} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex items-center justify-center gap-3 mt-8">
          <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 glass h-12 w-12 rounded-full border-0 hover:bg-secondary/80" />
          <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 glass h-12 w-12 rounded-full border-0 hover:bg-secondary/80" />
        </div>
      </Carousel>
    </div>
  );
};

// Featured Grid content without header
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
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

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

        <div className="card-content-bottom p-6 lg:p-8">
          <h3 className="font-display leading-[0.95] tracking-tight text-foreground hover-transition group-hover:text-white">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">{firstName}</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">{lastName}</span>
          </h3>
          
          <div className="max-h-40 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-40 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-base text-white/70">{speaker.title}</p>
            <p className="text-base font-medium text-primary">{speaker.company}</p>
            <p className="text-sm leading-relaxed text-white/60 mt-3 max-w-md">{speaker.bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GridSpeakerCard = ({
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
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

        <div className="absolute top-3 left-3 glass rounded-lg p-2 hover-scale-badge">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
            alt={speaker.company}
            className="h-4 w-4 object-contain"
          />
        </div>

        <div className="card-content-bottom p-4">
          <h3 className="font-display leading-[0.95] tracking-tight text-foreground hover-transition group-hover:text-white">
            <span className="block text-lg sm:text-xl font-semibold">{firstName}</span>
            <span className="block text-lg sm:text-xl font-semibold">{lastName}</span>
          </h3>
          
          <div className="max-h-20 mt-2 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-2 hover-transition md:group-hover:max-h-20 md:group-hover:mt-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-xs text-white/70">{speaker.title}</p>
            <p className="text-xs font-medium text-primary">{speaker.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpeakersFeaturedGridContent = () => {
  const featuredSpeaker = speakers[0];
  const gridSpeakers = speakers.slice(1);

  return (
    <div className="container mx-auto container-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="aspect-[4/5] lg:row-span-2">
          <FeaturedSpeakerCard speaker={featuredSpeaker} index={0} />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
          {gridSpeakers.map((speaker, idx) => (
            <div key={speaker.id} className="aspect-[4/5]">
              <GridSpeakerCard 
                speaker={speaker} 
                index={idx + 1} 
                delay={idx * 0.05}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;
