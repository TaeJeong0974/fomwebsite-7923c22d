import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const speakers = [
  {
    id: 1,
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
  },
  {
    id: 2,
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
  },
  {
    id: 3,
    name: "Ceci Stallsmith",
    title: "Chief Marketing Officer",
    company: "Loveable",
  },
  {
    id: 4,
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
  },
  {
    id: 5,
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "Figma",
  },
  {
    id: 6,
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
  },
  {
    id: 7,
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
  },
];

const SpeakersSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section 
      ref={containerRef}
      id="speakers" 
      className="relative h-[200vh]"
    >
      {/* Sticky container that pins while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Featured Speakers
          </h2>
          <p className="mt-2 text-muted-foreground">
            Voices that inspire and challenge
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            style={{ x }}
            className="flex gap-6"
          >
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              className="flex-shrink-0 w-64 sm:w-72 lg:w-80"
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Photo</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {speaker.name}
              </h3>
              <p className="text-sm text-foreground">
                {speaker.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {speaker.company}
              </p>
            </article>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
