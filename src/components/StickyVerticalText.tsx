import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionLabel {
  id: string;
  label: string;
}

const SECTION_LABELS: SectionLabel[] = [
  { id: "hero", label: "WELCOME" },
  { id: "hosts", label: "HOSTS" },
  { id: "podcast", label: "FEATURED SPEAKERS" },
  { id: "events", label: "UPCOMING EVENTS" },
  { id: "cta", label: "STAY CONNECTED" },
];

// Get section number (01, 02, etc.)
const getSectionNumber = (id: string): string => {
  const index = SECTION_LABELS.findIndex(s => s.id === id);
  return String(index + 1).padStart(2, '0');
};

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

const StickyVerticalText = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find the current section based on scroll position
      const sections = SECTION_LABELS.map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0 };
        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        };
      }).filter(s => s.top !== 0 || s.bottom !== 0);

      // Determine which section is most visible
      const viewportMiddle = scrollY + windowHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (viewportMiddle >= sections[i].top) {
          setCurrentSection(sections[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLabel = SECTION_LABELS.find(s => s.id === currentSection)?.label || "WELCOME";
  const currentNumber = getSectionNumber(currentSection);

  return (
    <>
      {/* Left side - Brand tagline (constant) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
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

      {/* Right side - Section indicator (changes with typewriter effect) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
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
            className="relative h-40 flex items-center justify-center overflow-hidden"
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

export default StickyVerticalText;
