import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-spacing">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-label mb-2">ABOUT</p>
              <h2 className="text-display-lg text-foreground">
                The Future<br className="hidden sm:block" /> of Marketing
              </h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pt-2"
          >
            <p className="text-body-lg font-display text-foreground leading-relaxed mb-5">
              We believe the future of marketing is being written right now—by the leaders willing to experiment, adapt, and share what they learn.
            </p>
            <p className="text-body text-muted-foreground leading-relaxed mb-4">
              Future of Marketing brings together CMOs, founders, and the brightest minds shaping what comes next. Through intimate conversations and curated events, we explore the strategies, tools, and mindsets driving modern B2B growth.
            </p>
            <p className="text-body text-muted-foreground leading-relaxed">
              Whether you're navigating AI, rethinking your go-to-market, or building a team for the next era—this is your community.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
