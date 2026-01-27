import { motion } from "framer-motion";
import SubscribeButton from "@/components/SubscribeButton";
import ctaGraphic from "@/assets/cta-graphic.svg";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16"
        >
          {/* Graphic */}
          <motion.img
            src={ctaGraphic}
            alt=""
            className="w-48 sm:w-56 lg:w-64 h-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-display-xl text-foreground">
              Never Miss an Episode
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              Get notified when new episodes drop and stay in the loop.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <SubscribeButton className="btn-base btn-lg bg-foreground hover:bg-foreground/90 text-background">
                Subscribe
              </SubscribeButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
