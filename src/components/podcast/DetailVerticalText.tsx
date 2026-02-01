import { motion } from "framer-motion";

interface DetailVerticalTextProps {
  guestName: string;
  guestTitle: string;
}

const BRAND_TAGLINE = "THE FUTURE OF MARKETING";

const DetailVerticalText = ({ guestName, guestTitle }: DetailVerticalTextProps) => {
  // Format: "NAME | TITLE" for the right side
  const rightLabel = `${guestName.toUpperCase()} | ${guestTitle.toUpperCase()}`;

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

      {/* Right side - Guest name and title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      >
        <div 
          className="text-[10px] font-display font-semibold tracking-[0.25em] text-foreground whitespace-nowrap max-w-[50vh] overflow-hidden text-ellipsis"
          style={{ 
            writingMode: "vertical-rl",
          }}
        >
          {rightLabel}
        </div>
      </motion.div>
    </>
  );
};

export default DetailVerticalText;
