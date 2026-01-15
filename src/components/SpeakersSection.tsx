import { motion } from "framer-motion";

const speakers = [
  {
    id: 1,
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    bgColor: "bg-[hsl(220,20%,10%)]",
    textLight: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Lindsey Irvine",
    title: "Chief Marketing Officer",
    company: "Square",
    bgColor: "bg-[hsl(200,80%,92%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Ceci Stallsmith",
    title: "Chief Marketing Officer",
    company: "Loveable",
    bgColor: "bg-[hsl(35,100%,95%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    bgColor: "bg-[hsl(280,30%,95%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "Figma",
    bgColor: "bg-[hsl(160,40%,94%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    bgColor: "bg-[hsl(240,10%,96%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    bgColor: "bg-[hsl(10,80%,94%)]",
    textLight: false,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
  },
];

const SpeakersSection = () => {
  // Duplicate speakers for seamless infinite scroll
  const duplicatedSpeakers = [...speakers, ...speakers];

  return (
    <section id="speakers" className="py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight"
        >
          Featured Speakers
        </motion.h2>
      </div>

      <div className="relative group">
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
              <div className="relative overflow-hidden mb-4 aspect-[4/5]">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              
              <div>
                <h3 className="font-display text-lg lg:text-xl font-semibold mb-0.5 text-foreground">
                  {speaker.name}
                </h3>
                <p className="text-sm text-muted-foreground">
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