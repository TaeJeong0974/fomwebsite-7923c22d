import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface SubscribeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  guestSlug?: string;
  headline?: string;
}

const SubscribeDrawer = ({ isOpen, onClose, guestName, guestSlug, headline }: SubscribeDrawerProps) => {
  const { email, setEmail, isSubmitted, isSubmitting, handleSubmit } = useSubscriptionForm({
    onReset: onClose,
    resetDelay: 2000,
    guestSlug,
  });

  const defaultHeadline = guestName
    ? `Don't miss ${guestName}'s episode — subscribe now.`
    : "Subscribe to stay current on how teams are using AI.";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: liquidEase }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[61] bg-background border-t border-border/30 rounded-t-2xl shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: liquidEase }}
          >
            <div className="container mx-auto container-padding py-8 sm:py-10 lg:py-12 max-w-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-foreground/50 hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: liquidEase }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight pr-8">
                      {headline || defaultHeadline}
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        autoFocus
                        className="w-full px-5 py-3.5 text-body font-mono bg-secondary/50 border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground/50 focus-ring hover-transition"
                      />
                      <div className="flex items-center gap-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-base btn-lg bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Subscribing…" : "Subscribe"}
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-body text-muted-foreground hover:text-foreground hover-transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: liquidEase }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
                      Thank you for subscribing.
                    </h3>
                    <p className="mt-3 text-body text-muted-foreground">
                      We'll notify you when new episodes drop.
                    </p>
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
