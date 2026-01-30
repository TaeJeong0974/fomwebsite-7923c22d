import { motion } from "framer-motion";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";

const CTASection = () => {
  return (
    <section className="sticky bottom-0 z-40 bg-foreground py-6 sm:py-8">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: liquidEase }}
        >
          <ListenSubscribeCards variant="dark" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
