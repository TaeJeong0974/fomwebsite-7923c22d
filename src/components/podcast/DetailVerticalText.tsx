import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_TAGLINE = "THE FUTURE OF MARKETING";

// Typewriter animation for each character
const TypewriterText = ({ text }: { text: string }) => {
  const characters = text.split("");
  
  return (
    <span className="text-[10px] font-display font-semibold tracking-[0.25em] text-foreground whitespace-nowrap">
      {characters.map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * 0.04,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const DetailVerticalText = ({ guestName }: { guestName: string }) => {
  const [currentLabel, setCurrentLabel] = useState(guestName.toUpperCase());

  useEffect(() => {
    const handleScroll = () => {
      const relatedSection = document.getElementById("related-episodes");
      if (!relatedSection) {
        setCurrentLabel(guestName.toUpperCase());
        return;
      }

      const rect = relatedSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Switch to "OTHER SPEAKERS" when the related section is in view
      if (rect.top < windowHeight / 2) {
        setCurrentLabel("OTHER SPEAKERS");
      } else {
        setCurrentLabel(guestName.toUpperCase());
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [guestName]);

  return (
    <>
      {/* Left side - Brand tagline (constant) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      >
        <div 
          className="text-[10px] font-display font-semibold tracking-[0.25em] text-foreground whitespace-nowrap"
          style={{ 
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {BRAND_TAGLINE}
        </div>
      </motion.div>

      {/* Right side - Dynamic label with typewriter effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      >
        <div 
          className="relative h-40 flex items-center justify-center overflow-hidden"
          style={{ 
            writingMode: "vertical-rl",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <TypewriterText text={currentLabel} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default DetailVerticalText;
