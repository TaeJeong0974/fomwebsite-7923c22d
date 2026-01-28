import { motion } from "framer-motion";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: liquidEase }}
        >
          <ListenSubscribeCards />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
