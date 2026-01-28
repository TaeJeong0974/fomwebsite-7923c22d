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
      className="space-y-3 py-6 border-y border-border/30"
    >
      <p className="font-display text-xl sm:text-2xl font-medium text-foreground leading-snug tracking-tight">
        "{quote}"
      </p>
      <footer className="flex items-center justify-between pt-1">
        <cite className="text-xs font-medium uppercase tracking-widest text-muted-foreground not-italic">
          — {attribution}
        </cite>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          {metaLabel}
        </span>
      </footer>
    </motion.blockquote>
  );
};

export default EpisodePullQuote;
