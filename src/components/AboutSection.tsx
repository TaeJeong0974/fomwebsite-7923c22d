import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-3 font-medium">
              Our Mission
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
              About
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pt-4"
          >
            <p className="text-xl sm:text-2xl font-display text-foreground leading-relaxed mb-6">
              We believe the future of marketing is being written right now—by the leaders willing to experiment, adapt, and share what they learn.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Future of Marketing brings together CMOs, founders, and the brightest minds shaping what comes next. Through intimate conversations and curated events, we explore the strategies, tools, and mindsets driving modern B2B growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're navigating AI, rethinking your go-to-market, or building a team for the next era—this is your community.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
