import { motion } from "framer-motion";

const LargeTextSection = () => {
  return (
    <section className="h-[70vh] flex items-center bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl lg:max-w-5xl xl:max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground leading-relaxed">
            Future of Marketing brings together the CMOs, founders, and some of the brightest minds shaping what comes next. Through conversations, events, and shared insights, we surface the ideas and tactics that help modern teams adapt and lead.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LargeTextSection;
