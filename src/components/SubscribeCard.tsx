import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import subscribeBg from "@/assets/subscribe-bg.png";

const SubscribeCard = () => {
  const [showForm, setShowForm] = useState(false);
  
  const { email, setEmail, isSubmitted, handleSubmit } = useSubscriptionForm({
    onReset: () => setShowForm(false),
  });

  const handleCardClick = () => {
    setShowForm(true);
  };

  return (
    <div className="card-image group cursor-pointer hover-scale overflow-hidden">
      {/* Static background image - lazy loaded */}
      <img
        src={subscribeBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Animated color overlay */}
      <motion.div
        className="absolute inset-0 z-[1] mix-blend-soft-light opacity-80"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
            'linear-gradient(135deg, rgba(255, 140, 120, 0.8) 0%, rgba(120, 100, 200, 0.9) 50%, rgba(255, 100, 130, 0.8) 100%)',
            'linear-gradient(135deg, rgba(160, 140, 220, 0.9) 0%, rgba(255, 130, 100, 0.8) 50%, rgba(100, 140, 200, 0.9) 100%)',
            'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
          ],
        }}
        transition={{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="cta"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCardClick}
            className="card-content-full card-padding-lg z-10"
          >
            <h3 className="text-display-md font-semibold text-foreground">
              Subscribe to stay current on how teams are using AI.
            </h3>
            <span className="btn-base btn-lg bg-foreground text-background hover:bg-foreground/90 self-start">Subscribe</span>
          </motion.div>
        ) : !isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="card-content-full card-padding-lg z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-display-md font-semibold text-foreground">
              Subscribe to stay current on how teams are using AI.
            </h3>
            
            <form onSubmit={handleSubmit} className="max-w-md space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full px-5 py-3 text-body font-mono bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
              />
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="btn-base btn-lg bg-foreground text-background hover:bg-foreground/90"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-body text-foreground/60 hover:text-foreground hover-transition"
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
            transition={{ duration: 0.2 }}
            className="card-content-full card-padding-lg z-10"
          >
            <h3 className="text-display-md font-semibold text-foreground">
              Thank you for subscribing.
            </h3>
            <p className="text-body text-foreground/70">
              We'll notify you when new episodes drop.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscribeCard;
