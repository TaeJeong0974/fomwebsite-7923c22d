import { useState } from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-dark rounded-3xl p-8 sm:p-12 lg:p-16"
        >
          <div className="max-w-xl">
            <p className="text-label text-white/50 mb-2">
              Newsletter
            </p>
            <h2 className="text-display-md text-white">
              Never Miss an Episode
            </h2>
            <p className="mt-3 text-body text-white/60">
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
                className="flex-1 px-5 py-3 text-body glass rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
              />
              <button 
                type="submit" 
                className="btn-base btn-md bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Subscribe
              </button>
            </motion.form>

            <p className="mt-4 text-body-sm text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
