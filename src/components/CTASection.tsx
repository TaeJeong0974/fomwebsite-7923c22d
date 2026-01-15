import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-32 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-background tracking-tight leading-tight">
              Never Miss an Episode or Event
            </h2>
            <p className="mt-4 text-background/60 text-lg">
              Subscribe to our newsletter for weekly updates, exclusive content, 
              and early access to event tickets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-background/80 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 border border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 h-auto">
                Subscribe
              </Button>
              <p className="text-xs text-background/50 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
