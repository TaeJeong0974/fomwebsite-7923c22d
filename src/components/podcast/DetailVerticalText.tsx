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

const SECTION_LABELS = [
  { id: "episode-content", label: "GUEST_NAME" }, // Will be replaced with actual guest name
  { id: "related-episodes", label: "OTHER SPEAKERS" },
  { id: "stay-connected", label: "STAY CONNECTED" },
];

const DetailVerticalText = ({ guestName, isUpcoming = false }: { guestName: string; isUpcoming?: boolean }) => {
  const guestLabel = isUpcoming ? `UPCOMING: ${guestName.toUpperCase()}` : guestName.toUpperCase();
  const [currentLabel, setCurrentLabel] = useState(guestLabel);
  const [currentNumber, setCurrentNumber] = useState("01");

  useEffect(() => {
    const handleScroll = () => {
      const relatedSection = document.getElementById("related-episodes");
      const stayConnectedSection = document.getElementById("stay-connected");
      const windowHeight = window.innerHeight;
      
      // Check stay connected section first (lowest priority position)
      if (stayConnectedSection) {
        const rect = stayConnectedSection.getBoundingClientRect();
        if (rect.top < windowHeight / 2) {
          setCurrentLabel("STAY CONNECTED");
          setCurrentNumber("03");
          return;
        }
      }
      
      // Check related episodes section
      if (relatedSection) {
        const rect = relatedSection.getBoundingClientRect();
        if (rect.top < windowHeight / 2) {
          setCurrentLabel("OTHER SPEAKERS");
          setCurrentNumber("02");
          return;
        }
      }
      
      // Default to guest name (with UPCOMING prefix if applicable)
      setCurrentLabel(guestLabel);
      setCurrentNumber("01");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [guestLabel]);

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
        <div className="flex flex-col items-center gap-4">
          {/* Section number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${currentNumber}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-[10px] font-display font-semibold tracking-[0.25em] text-foreground"
            >
              {currentNumber}
            </motion.span>
          </AnimatePresence>
          
          {/* Divider line */}
          <div className="w-px h-4 bg-foreground/30" />
          
          {/* Section label */}
          <div 
            className="relative h-56 flex items-center justify-center overflow-hidden"
            style={{ writingMode: "vertical-rl" }}
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
        </div>
      </motion.div>
    </>
  );
};

export default DetailVerticalText;
