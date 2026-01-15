import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -2000]);

  return (
    <section ref={containerRef} id="speakers" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Featured Speakers
          </h2>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div ref={cardsRef} style={{ x }} className="flex gap-4 lg:gap-6">
            {speakers.map((speaker, index) => (
              <motion.article 
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`flex-shrink-0 w-64 sm:w-72 lg:w-80 ${speaker.bgColor} overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
              >
                <div className="aspect-[3/4] flex flex-col">
                  <div className="flex-1 relative overflow-hidden">
                    <div className={`absolute inset-4 ${speaker.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                      <span className={`font-display text-6xl font-bold ${speaker.textLight ? 'text-white/40' : 'text-foreground/20'}`}>
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 lg:p-6">
                    <h3 className={`font-display text-lg lg:text-xl font-semibold mb-0.5 ${speaker.textLight ? 'text-white' : 'text-foreground'}`}>
                      {speaker.name}
                    </h3>
                    <p className={`text-sm ${speaker.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {speaker.title}
                    </p>
                    <p className={`text-sm font-medium mt-1 ${speaker.textLight ? 'text-white/50' : 'text-primary'}`}>
                      {speaker.company}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
            <div className="flex-shrink-0 w-[50vw]" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
