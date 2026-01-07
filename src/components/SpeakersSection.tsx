import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const speakers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Chief Technology Officer",
    company: "FutureTech Labs",
    bio: "Pioneer in AI ethics and sustainable technology solutions for the next generation.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Creative Director",
    company: "Studio Collective",
    bio: "Award-winning designer reshaping how brands connect with modern audiences.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Head of Sustainability",
    company: "GreenPath Global",
    bio: "Leading the charge on corporate environmental responsibility worldwide.",
  },
  {
    id: 4,
    name: "David Park",
    title: "Founder & CEO",
    company: "Innovate Ventures",
    bio: "Serial entrepreneur with three successful exits in the tech space.",
  },
  {
    id: 5,
    name: "Amara Williams",
    title: "Bestselling Author",
    company: "Independent",
    bio: "Her books on mindful leadership have sold over 2 million copies globally.",
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

        <motion.div 
          style={{ x }}
          className="flex gap-6 pl-4 sm:pl-6 lg:pl-8"
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
              <p className="text-sm text-muted-foreground mt-2">
                {speaker.bio}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
