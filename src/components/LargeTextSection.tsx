import { motion } from "framer-motion";

const LargeTextSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-snug max-w-5xl font-medium"
        >
          Future of Marketing is a podcast and event series bringing together CMOs and growth leaders navigating AI in modern B2B marketing.
        </motion.p>
      </div>
    </section>
  );
};

export default LargeTextSection;
