import { motion } from "framer-motion";
import { useState } from "react";
import speaker1 from "@/assets/speaker-1.png";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const speakerImages = [speaker1, speaker2, speaker3, speaker4];

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
];

const SpeakerCard = ({ speaker, index }: { speaker: typeof speakers[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const firstName = speaker.name.split(' ')[0];
  const lastName = speaker.name.split(' ').slice(1).join(' ');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative aspect-[4/5] bg-foreground overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background Layer - Default state with grain texture */}
      <div className="absolute inset-0">
        {/* Warm coral to cool gray gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                135deg,
                hsl(210, 20%, 75%) 0%,
                hsl(20, 40%, 80%) 25%,
                hsl(10, 60%, 75%) 50%,
                hsl(5, 55%, 70%) 75%,
                hsl(0, 50%, 65%) 100%
              )
            `
          }}
        />
        {/* Grain/noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Photo Layer - Reveals on hover */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img 
          src={speakerImages[index]} 
          alt={speaker.name}
          className="w-full h-full object-cover"
          initial={false}
          animate={{
            scale: isHovered ? 1 : 1.1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      {/* Typography Layer - Visible by default */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6"
        initial={false}
        animate={{ 
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Top: Company */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/70 font-medium">
            {speaker.company}
          </span>
        </div>

        {/* Center: Large Name */}
        <div className="flex-1 flex flex-col justify-center -mt-4">
          <h3 className="font-display text-foreground leading-[0.85] tracking-tight">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">
              {firstName}
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">
              {lastName}
            </span>
          </h3>
        </div>

        {/* Bottom: Title */}
        <div>
          <p className="text-xs lg:text-sm text-foreground/60 font-medium">
            {speaker.title}
          </p>
        </div>
      </motion.div>

      {/* Hover State: Name at bottom */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-4 lg:p-6"
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: isHovered ? 0.1 : 0 }}
      >
        <h3 className="font-display text-lg lg:text-xl font-semibold text-white">
          {speaker.name}
        </h3>
        <p className="text-sm text-white/70 mt-0.5">
          {speaker.title}
        </p>
        <p className="text-sm font-medium mt-1 text-primary">
          {speaker.company}
        </p>
      </motion.div>

      {/* Corner Accent */}
      <motion.div
        className="absolute top-4 right-4 lg:top-6 lg:right-6 w-2 h-2 bg-foreground"
        initial={false}
        animate={{ 
          scale: isHovered ? 0 : 1,
          rotate: isHovered ? 45 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

const SpeakersRevealSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-2 font-medium">
            Upcoming
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Guest Lineup
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersRevealSection;
