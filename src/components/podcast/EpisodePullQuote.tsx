import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
}

const EpisodePullQuote = ({ quote, attribution }: EpisodePullQuoteProps) => {
  const ref = useRef<HTMLQuoteElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = quote.split(" ");

  return (
    <blockquote ref={ref} className="space-y-6 max-w-2xl">
      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-snug">
        <span className="inline">"</span>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.35,
              delay: i * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
        <span>"</span>
      </p>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: words.length * 0.03 + 0.2 }}
      >
        <cite className="text-label font-medium text-foreground not-italic">
          — {attribution}
        </cite>
      </motion.footer>
    </blockquote>
  );
};

export default EpisodePullQuote;
