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
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-dark rounded-3xl p-8 sm:p-12 lg:p-16"
        >
          <div className="max-w-xl">
            <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mb-2 font-medium">
              Newsletter
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Never Miss an Episode
            </h2>
            <p className="mt-3 text-white/60 text-sm sm:text-base">
              Subscribe for weekly updates and exclusive content.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 px-5 py-3 text-sm glass rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full"
              >
                Subscribe
              </Button>
            </motion.form>

            <p className="mt-4 text-[10px] text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
