import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSubscribe } from "@/contexts/SubscribeContext";
import subscribeBg from "@/assets/subscribe-bg.png";

const SubscribeCard = () => {
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCardClick = () => {
    if (isMobile) {
      openSubscribe();
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 2.5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div 
      className="card-image group cursor-pointer hover-scale"
      style={{
        backgroundImage: `url(${subscribeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCardClick}
            className="card-content-full card-padding-lg"
          >
            <h3 className="text-display-md text-foreground">
              Subscribe to stay current on how teams are using AI.
            </h3>
            <span className="btn-base btn-primary btn-lg self-start">Subscribe</span>
          </motion.div>
        ) : !isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="card-content-full card-padding-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-md">
              <p className="text-label text-foreground/50 mb-1">Stay Updated</p>
              <h3 className="text-display-sm text-foreground mb-4">
                Never Miss an Episode
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  className="w-full px-5 py-3 text-body glass rounded-full text-foreground placeholder:text-foreground/40 focus-ring hover-transition"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                  >
                    Subscribe
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-base btn-lg btn-glass"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <p className="mt-3 text-body-sm text-foreground/40">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="card-content-full card-padding-lg items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-display-sm text-foreground mb-2">You're In!</h3>
            <p className="text-body text-foreground/60">
              We'll notify you when new episodes drop.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscribeCard;
