import { motion } from "framer-motion";
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
  const duplicatedSpeakers = [...speakers, ...speakers];

  return (
    <section id="speakers" className="py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-2 font-medium">
            Season 5
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Featured Speakers
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-4 lg:gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedSpeakers.map((speaker, index) => (
            <article
              key={`${speaker.id}-${index}`}
              className="flex-shrink-0 w-64 sm:w-72 lg:w-80"
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img 
                  src={speakerImages[index % speakerImages.length]} 
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="pt-4">
                <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground">
                  {speaker.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {speaker.title}
                </p>
                <p className="text-sm font-medium mt-1 text-primary">
                  {speaker.company}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
