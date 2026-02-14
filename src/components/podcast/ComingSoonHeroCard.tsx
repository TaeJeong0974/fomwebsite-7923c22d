import { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { LiquidButton } from "@/components/ui/LiquidButton";
import guestBg from "@/assets/guest-bg.png";

interface ComingSoonHeroCardProps {
  guestFirstName: string;
}

const ComingSoonHeroCard = ({ guestFirstName }: ComingSoonHeroCardProps) => {
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();
  const [showForm, setShowForm] = useState(false);
  
  const { email, setEmail, isSubmitted, handleSubmit } = useSubscriptionForm({
    onReset: () => setShowForm(false),
  });

  const handleCardClick = () => {
    if (!showForm && !isSubmitted) {
      if (isMobile) {
        openSubscribe(guestFirstName);
      } else {
        setShowForm(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
      style={{
        backgroundImage: `url(${guestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 hover-transition" />

      {/* Interactive Content */}
      <AnimatePresence mode="wait">
        {!showForm && !isSubmitted ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center p-8 z-10"
          >
            <LiquidButton variant="light" size="lg" className="gap-2">
              <Bell size={18} />
              Get Notified
            </LiquidButton>
          </motion.div>
        ) : !isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end p-8 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.
            </h3>
            
            <form onSubmit={handleSubmit} className="max-w-md space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full px-5 py-3 text-body font-mono bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
              />
              <div className="flex items-center gap-4">
                <LiquidButton
                  type="submit"
                  variant="light"
                  size="lg"
                >
                  Notify Me
                </LiquidButton>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-body text-white hover:text-white/80 hover-transition"
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
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold text-white mb-2">You're on the list!</h3>
            <p className="text-body text-white">
              We'll let you know when {guestFirstName}'s episode is ready.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComingSoonHeroCard;
