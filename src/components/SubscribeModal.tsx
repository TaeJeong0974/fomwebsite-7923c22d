import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribeModal = ({ open, onOpenChange }: SubscribeModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend when Lovable Cloud is enabled
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onOpenChange(false);
    }, 3000);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsSubmitted(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-black/80 backdrop-blur-xl border border-white/10 sm:max-w-md p-0 overflow-hidden top-[10%] translate-y-0 sm:top-[50%] sm:translate-y-[-50%]">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8"
            >
              <DialogHeader className="text-left mb-6">
                <p className="text-label text-white mb-2">STAY UPDATED</p>
                <DialogTitle className="text-display-md text-white">
                  Never Miss an Episode
                </DialogTitle>
                <p className="mt-2 text-body text-white/60">
                  Get notified when new episodes drop and receive exclusive content.
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-3 text-body font-mono bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
                />
                <button
                  type="submit"
                  className="w-full btn-base btn-glass-light btn-lg"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-4 text-body-sm text-white/40 text-center">
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
