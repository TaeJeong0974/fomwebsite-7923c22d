import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { liquidSpring, buttonVariants } from "@/components/ui/LiquidButton";

const liquidEasing = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: liquidEasing },
  },
};

const guestHeadlines: Record<string, string> = {
  Meagen: "Get Notified for Meagen's Episode",
  Lena: "Get Notified for Lena's Episode",
  Dave: "Get Notified for Dave's Episode",
  Sara: "Get Notified for Sara's Episode",
  Kate: "Get Notified for Kate's Episode",
  Idan: "Get Notified for Idan's Episode",
  Lindsey: "Get Notified for Lindsey's Episode",
  Sheila: "Get Notified for Sheila's Episode",
  Ceci: "Get Notified for Ceci's Episode",
  Katrina: "Get Notified for Katrina's Episode",
};

interface SubscribeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestName?: string;
}

const SubscribeDrawer = ({ open, onOpenChange, guestName }: SubscribeDrawerProps) => {
  const { email, setEmail, isSubmitted, handleSubmit, reset } = useSubscriptionForm({
    onReset: () => onOpenChange(false),
    resetDelay: 3000,
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#1a1a1a]/60 backdrop-blur-3xl border-l border-white/[0.08] shadow-[-20px_0_50px_-10px_rgba(0,0,0,0.5)]"
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute right-6 top-6 w-10 h-10 rounded-full bg-white/15 backdrop-blur-2xl border border-white/25 flex items-center justify-center text-white/80 hover:text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-white/25 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] transition-[background,box-shadow] duration-300 focus:outline-none focus-ring"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              transition={liquidSpring}
            >
              <X className="h-4 w-4" />
            </motion.button>

            {/* Content */}
            <div className="flex flex-col justify-start pt-20 sm:justify-center sm:pt-0 h-full p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.p variants={fadeUpItem} className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white mb-3">
                      STAY UPDATED
                    </motion.p>
                    <motion.h2 variants={fadeUpItem} className="text-display-lg font-semibold text-white mb-6">
                      {guestName ? (guestHeadlines[guestName] || `${guestName} Is Coming Soon`) : "Never Miss an Episode"}
                    </motion.h2>
                    <motion.p variants={fadeUpItem} className="text-body text-white/60 mb-8 max-w-sm">
                      {guestName ? `Get notified when ${guestName}'s episode drops.` : "Get notified when new episodes drop and receive exclusive content."}
                    </motion.p>

                    <motion.form variants={fadeUpItem} onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        autoFocus
                        className="w-full px-6 py-4 text-body font-mono bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-full text-white placeholder:text-white/30 focus-ring hover-transition shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
                      />
                      <button
                        type="submit"
                        className="w-full px-6 py-4 text-body font-medium bg-black/30 backdrop-blur-xl border border-white/[0.08] rounded-full text-white hover:bg-black/40 hover-transition shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                      >
                        Subscribe
                      </button>
                    </motion.form>

                    <motion.p variants={fadeUpItem} className="mt-6 text-body text-white/30">
                      No spam. Unsubscribe anytime.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center"
                  >
                    <motion.div variants={fadeUpItem} className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <motion.h3 variants={fadeUpItem} className="text-display-md text-white mb-3">You're In!</motion.h3>
                    <motion.p variants={fadeUpItem} className="text-body text-white/60">
                      We'll notify you when new episodes are available.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscribeDrawer;
