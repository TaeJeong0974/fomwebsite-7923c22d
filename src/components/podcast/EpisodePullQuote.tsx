import { Clock } from "lucide-react";
import { motion } from "framer-motion";

interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
  metaLabel: string;
  delay?: number;
}

const EpisodePullQuote = ({ quote, attribution, metaLabel, delay = 0.1 }: EpisodePullQuoteProps) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-4"
    >
      <p className="font-display text-2xl md:text-3xl lg:text-2xl font-medium text-foreground/90 leading-relaxed">
        "{quote}"
      </p>
      <footer className="flex items-center justify-between">
        <cite className="text-label not-italic">
          — {attribution}
        </cite>
        <span className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-sm text-foreground">
          <Clock size={14} className="text-foreground" />
          {metaLabel}
        </span>
      </footer>
    </motion.blockquote>
  );
};

export default EpisodePullQuote;
