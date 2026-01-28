import { motion } from "framer-motion";

interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
  delay?: number;
}

const EpisodePullQuote = ({ quote, attribution, delay = 0.1 }: EpisodePullQuoteProps) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-6 max-w-2xl"
    >
      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-snug">
        "{quote}"
      </p>
      <footer>
        <cite className="text-label not-italic">
          — {attribution}
        </cite>
      </footer>
    </motion.blockquote>
  );
};

export default EpisodePullQuote;
