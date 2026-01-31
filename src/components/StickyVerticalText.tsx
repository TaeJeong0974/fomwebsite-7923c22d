import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionLabel {
  id: string;
  label: string;
}

const SECTION_LABELS: SectionLabel[] = [
  { id: "hero", label: "WELCOME" },
  { id: "podcast", label: "FEATURED SPEAKERS" },
  { id: "events", label: "UPCOMING EVENTS" },
  { id: "cta", label: "STAY CONNECTED" },
];

const BRAND_TAGLINE = "THE FUTURE OF MARKETING";

const liquidTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const StickyVerticalText = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling past initial viewport
      setIsVisible(scrollY > windowHeight * 0.3);

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

  return (
    <>
      {/* Left side - Brand tagline (constant) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={liquidTransition}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
          >
            <div 
              className="text-[11px] font-display font-semibold tracking-[0.2em] text-foreground/60 whitespace-nowrap"
              style={{ 
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {BRAND_TAGLINE}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side - Section indicator (changes) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={liquidTransition}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
          >
            <div 
              className="relative h-40 flex items-center justify-center overflow-hidden"
              style={{ 
                writingMode: "vertical-rl",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentLabel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="text-[11px] font-display font-semibold tracking-[0.2em] text-foreground/60 whitespace-nowrap"
                >
                  {currentLabel}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyVerticalText;
