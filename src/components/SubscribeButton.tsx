import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { LiquidButton } from "@/components/ui/LiquidButton";
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
  
  const { email, setEmail, isSubmitted, handleSubmit, reset } = useSubscriptionForm({
    onReset: () => setIsOpen(false),
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
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
        className="w-80 p-0 !bg-[#3a3a3a]/95 backdrop-blur-2xl !border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_50px_-10px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden"
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
              className="p-6"
            >
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white mb-1">STAY UPDATED</p>
              <h3 className="font-display text-lg font-semibold text-white mb-4">
                Never Miss an Episode
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-3 text-sm font-mono bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-full text-white placeholder:text-white/30 focus-ring hover-transition shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-sm font-medium bg-black/30 backdrop-blur-xl border border-white/[0.08] rounded-full text-white hover:bg-black/40 hover-transition shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="mt-4 text-xs text-white/30 text-center">
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
