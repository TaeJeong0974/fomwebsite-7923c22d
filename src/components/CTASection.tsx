import { motion } from "framer-motion";
import SubscribeButton from "@/components/SubscribeButton";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-display-xl text-foreground max-w-4xl mx-auto">
            Never Miss an Episode
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Get notified when new episodes drop and stay in the loop.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10"
          >
            <SubscribeButton className="btn-base btn-lg bg-foreground hover:bg-foreground/90 text-background">
              Subscribe
            </SubscribeButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
