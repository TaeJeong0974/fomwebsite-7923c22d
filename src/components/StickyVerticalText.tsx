import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionLabel {
  id: string;
  label: string;
}

const SECTION_LABELS: SectionLabel[] = [
  { id: "hero", label: "WELCOME" },
  { id: "hosts", label: "HOSTS" },
  { id: "podcast", label: "FEATURED GUESTS" },
  { id: "events", label: "UPCOMING EVENTS" },
  { id: "cta", label: "STAY CONNECTED" },
];

// Get section number (01, 02, etc.)
const getSectionNumber = (id: string): string => {
  const index = SECTION_LABELS.findIndex(s => s.id === id);
  return String(index + 1).padStart(2, '0');
};

const BRAND_TAGLINE = "THE FUTURE OF MARKETING";

// Shared typography class for vertical labels
const VERTICAL_TEXT_CLASS = "text-[10px] font-display font-semibold tracking-[0.2em] text-foreground whitespace-nowrap uppercase";

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
        className="fixed top-1/2 z-40 hidden xl:block xl:left-[15px]"
        style={{ transform: "translateY(-50%)" }}
      >
        <div 
          className={VERTICAL_TEXT_CLASS}
          style={{ 
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {BRAND_TAGLINE}
        </div>
      </motion.div>

      {/* Right side - Section indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-1/2 z-40 hidden xl:block xl:right-[15px]"
        style={{ transform: "translateY(-50%)" }}
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
              className={VERTICAL_TEXT_CLASS}
            >
              {currentNumber}
            </motion.span>
          </AnimatePresence>
          
          {/* Divider line */}
          <div className="w-px h-4 bg-foreground/30" />
          
          {/* Section label - consistent height for all labels */}
          <div 
            className="flex items-center justify-center"
            style={{ writingMode: "vertical-rl", height: "160px" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                className={VERTICAL_TEXT_CLASS}
              >
                {currentLabel}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default StickyVerticalText;
