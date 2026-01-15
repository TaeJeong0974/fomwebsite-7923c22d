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
    <section className="py-16 lg:py-20 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-background tracking-tight leading-tight">
              Never Miss an Episode or Event
            </h2>
            <p className="mt-3 text-background/60 text-sm lg:text-base">
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
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-background/70 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors"
                />
              </div>
              <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
              <p className="text-[10px] text-background/50 text-center">
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
