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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl mr-auto ml-0 lg:ml-[calc((100vw-1280px)/2+2rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-background tracking-tight">
            Never Miss an Episode
          </h2>
          <p className="mt-2 text-background/60 text-sm">
            Subscribe for weekly updates and exclusive content.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 px-4 py-2.5 text-sm border border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors"
          />
          <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
            Subscribe
          </Button>
        </motion.form>

        <p className="mt-4 text-[10px] text-background/40">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
