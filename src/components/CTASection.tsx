import { motion } from "framer-motion";
import { useSubscribe } from "@/contexts/SubscribeContext";

const CTASection = () => {
  const { openSubscribe } = useSubscribe();

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <button 
                onClick={openSubscribe}
                className="btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Subscribe
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
