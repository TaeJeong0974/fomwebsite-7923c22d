import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
}

const EpisodePullQuote = ({ quote, attribution }: EpisodePullQuoteProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLQuoteElement>(null);

  // Start typing when element enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing effect
  useEffect(() => {
    if (!hasStarted) return;
    let i = 0;
    const speed = 30; // ms per character
    const interval = setInterval(() => {
      i++;
      setDisplayedText(quote.slice(0, i));
      if (i >= quote.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [hasStarted, quote]);

  return (
    <blockquote ref={ref} className="space-y-6 max-w-2xl">
      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-snug">
        "{displayedText}
        {!isComplete && hasStarted && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-[2px] h-[1em] bg-foreground align-middle ml-0.5"
          />
        )}
        {isComplete && "\u201D"}
      </p>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <cite className="text-label font-medium text-foreground not-italic">
          — {attribution}
        </cite>
      </motion.footer>
    </blockquote>
  );
};

export default EpisodePullQuote;
