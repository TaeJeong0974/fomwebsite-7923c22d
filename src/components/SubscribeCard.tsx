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
    // TODO: Connect to backend when Lovable Cloud is enabled
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
            <h3 className="text-display-md 2xl:text-display-lg text-foreground">
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
            className="card-content-full card-padding-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-display-md 2xl:text-display-lg text-foreground">
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
                className="w-full px-5 py-3 text-body glass rounded-full text-foreground placeholder:text-foreground/40 focus-ring hover-transition"
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
            className="card-content-full card-padding-lg"
          >
            <h3 className="text-display-md 2xl:text-display-lg text-foreground">
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
