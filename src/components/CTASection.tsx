import { motion } from "framer-motion";
import SubscribeButton from "@/components/SubscribeButton";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: liquidEase }}
          className="text-center"
        >
          <h2 className="text-display-xl text-foreground max-w-4xl mx-auto">
            Never Miss an Episode
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: liquidEase }}
            className="mt-6 text-lg text-foreground max-w-xl mx-auto"
          >
            Get notified when new episodes drop and stay in the loop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: liquidEase }}
            className="mt-10"
          >
            <SubscribeButton className="btn-base btn-glass btn-lg">
              Subscribe
            </SubscribeButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
