import { motion } from "framer-motion";

const lines = [
  "Future of Marketing brings together the CMOs, founders, and brightest minds shaping what comes next—through conversations, events, and shared insights that help modern teams adapt and lead.",
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
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
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
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight mb-4 last:mb-0 font-medium"
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
