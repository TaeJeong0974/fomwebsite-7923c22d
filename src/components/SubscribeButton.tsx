import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SubscribeButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const SubscribeButton = ({ className = "", children = "Subscribe", style }: SubscribeButtonProps) => {
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend when Lovable Cloud is enabled
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 2.5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
    }, 2500);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsSubmitted(false);
      setEmail("");
    }
    setIsOpen(open);
  };

  // Mobile: use the global modal
  if (isMobile) {
    return (
      <div onClick={openSubscribe} className={className} style={style}>
        {children}
      </div>
    );
  }

  // Desktop: use popover with inline form
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className={className} style={style}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
        align="end"
        sideOffset={8}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="p-5"
            >
              <p className="text-label text-white/70 mb-1">Stay Updated</p>
              <h3 className="font-display text-lg font-semibold text-white mb-3">
                Never Miss an Episode
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 text-sm font-mono bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
                />
                <button
                  type="submit"
                  className="w-full btn-base btn-glass-light btn-md"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="mt-3 text-xs text-white/40 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-1">You're In!</h3>
              <p className="text-sm text-white/60">
                We'll notify you when new episodes drop.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default SubscribeButton;
