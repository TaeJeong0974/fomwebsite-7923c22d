import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscriptionForm } from "@/hooks/use-subscription-form";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import SidebarCard from "@/components/podcast/SidebarCard";

interface SidebarSubscribeCardProps {
  guestName?: string;
  guestSlug?: string;
}

const SidebarSubscribeCard = ({ guestName, guestSlug }: SidebarSubscribeCardProps) => {
  const [showForm, setShowForm] = useState(false);
  const { email, setEmail, isSubmitted, isSubmitting, handleSubmit } = useSubscriptionForm({
    onReset: () => setShowForm(false),
    guestSlug,
  });

  const headline = guestName
    ? `Don't miss ${guestName}'s episode — subscribe now.`
    : "Subscribe to stay current on how teams are using AI.";

  return (
    <SidebarCard title="SUBSCRIBE">
      <AnimatePresence mode="wait">
        {!showForm && !isSubmitted ? (
          <motion.div
            key="cta"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: liquidEase }}
            className="space-y-4"
          >
            <p className="text-body text-foreground/80 leading-relaxed">
              {headline}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-base btn-md bg-foreground text-background hover:bg-foreground/90 w-full"
            >
              Subscribe
            </button>
          </motion.div>
        ) : !isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: liquidEase }}
            className="space-y-3"
          >
            <p className="text-body text-foreground/80 leading-relaxed">
              {headline}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="w-full px-4 py-2.5 text-body font-mono bg-secondary/50 border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground/50 focus-ring hover-transition"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-base btn-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-muted-foreground hover:text-foreground hover-transition"
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
            transition={{ duration: 0.25, ease: liquidEase }}
            className="space-y-2"
          >
            <p className="text-body font-medium text-foreground">
              Thank you for subscribing.
            </p>
            <p className="text-sm text-muted-foreground">
              We'll notify you when new episodes drop.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarCard>
  );
};

export default SidebarSubscribeCard;
