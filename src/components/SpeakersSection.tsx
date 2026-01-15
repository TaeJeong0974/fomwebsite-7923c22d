import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const speakers = [
  {
    id: 1,
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    bgColor: "bg-[hsl(220,20%,10%)]",
    textLight: true,
  },
  {
    id: 2,
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    bgColor: "bg-[hsl(200,80%,92%)]",
    textLight: false,
  },
  {
    id: 3,
    name: "Ceci Stallsmith",
    title: "Chief Marketing Officer",
    company: "Loveable",
    bgColor: "bg-[hsl(35,100%,95%)]",
    textLight: false,
  },
  {
    id: 4,
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    bgColor: "bg-[hsl(280,30%,95%)]",
    textLight: false,
  },
  {
    id: 5,
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "Figma",
    bgColor: "bg-[hsl(160,40%,94%)]",
    textLight: false,
  },
  {
    id: 6,
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    bgColor: "bg-[hsl(240,10%,96%)]",
    textLight: false,
  },
  {
    id: 7,
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    bgColor: "bg-[hsl(10,80%,94%)]",
    textLight: false,
  },
];

const SpeakersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section id="speakers" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
          Featured Speakers
        </h2>
        
        {/* Navigation arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex gap-5 overflow-x-auto scrollbar-hide pl-4 sm:pl-6 lg:pl-[max(1rem,calc((100vw-1280px)/2+1rem))] pr-4 sm:pr-6 lg:pr-8 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {speakers.map((speaker, index) => (
          <motion.article 
            key={speaker.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`flex-shrink-0 w-72 sm:w-80 lg:w-96 ${speaker.bgColor} rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
          >
            <div className="aspect-[3/4] flex flex-col">
              {/* Avatar area */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className={`w-28 h-28 rounded-full ${speaker.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                  <span className={`font-display text-4xl font-bold ${speaker.textLight ? 'text-white/80' : 'text-foreground/60'}`}>
                    {speaker.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              {/* Content area */}
              <div className="p-6 pt-0">
                <h3 className={`font-display text-xl font-semibold mb-1 ${speaker.textLight ? 'text-white' : 'text-foreground'}`}>
                  {speaker.name}
                </h3>
                <p className={`text-sm ${speaker.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {speaker.title}
                </p>
                <p className={`text-sm font-medium mt-1 ${speaker.textLight ? 'text-white/60' : 'text-primary'}`}>
                  {speaker.company}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;