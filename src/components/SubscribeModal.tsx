import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { LiquidButton } from "@/components/ui/LiquidButton";

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribeModal = ({ open, onOpenChange }: SubscribeModalProps) => {
  const { email, setEmail, isSubmitted, handleSubmit, reset } = useSubscriptionForm({
    onReset: () => onOpenChange(false),
    resetDelay: 3000,
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) reset();
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-[#3a3a3a]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_50px_-10px_rgba(0,0,0,0.5)] sm:max-w-md p-0 overflow-hidden top-4 translate-y-0 rounded-2xl sm:top-[50%] sm:translate-y-[-50%]">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 sm:p-10"
            >
              <DialogHeader className="text-left mb-8">
                <p className="text-label text-white/50 mb-2">STAY UPDATED</p>
                <DialogTitle className="text-display-md text-white">
                  Never Miss an Episode
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-6 py-4 text-body font-mono bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-full text-white placeholder:text-white/30 focus-ring hover-transition shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-4 text-body font-medium bg-black/30 backdrop-blur-xl border border-white/[0.08] rounded-full text-white hover:bg-black/40 hover-transition shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-6 text-body text-white/30 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-display-md text-white mb-2">You're In!</h3>
              <p className="text-body text-white/60">
                We'll notify you when new episodes are available.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
