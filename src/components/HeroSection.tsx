import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-[75vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-6 font-medium">
            Podcast & Events
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.95] tracking-tight">
            Stories, Ideas &<br />
            Live Experiences
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
