import { motion } from "framer-motion";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  [key: string]: unknown;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FadeInSection = ({ children, className, delay = 0, id, ...rest }: FadeInSectionProps) => (
  <motion.div
    id={id}
    className={className}
    variants={fadeInVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.05, margin: "100px 0px 0px 0px" }}
    transition={{ duration: 1.0, delay, ease: liquidEase }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default FadeInSection;
