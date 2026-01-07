import { motion } from "framer-motion";

const lines = [
  "Future of Marketing brings together the CMOs, founders, and some of the brightest minds shaping what comes next.",
  "Through conversations, events, and shared insights, we surface the ideas and tactics that help modern teams adapt and lead.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

const LargeTextSection = () => {
  return (
    <section className="h-[70vh] flex items-center bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl lg:max-w-5xl xl:max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {lines.map((line, index) => (
            <motion.p
              key={index}
              variants={lineVariants}
              className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground leading-relaxed mb-4 last:mb-0"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LargeTextSection;
