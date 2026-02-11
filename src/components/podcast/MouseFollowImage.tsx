import { motion, AnimatePresence } from "framer-motion";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import guestBg from "@/assets/guest-bg.png";

interface MouseFollowImageProps {
  isHovered: boolean;
  mouseX: number;
  mouseY: number;
  imageSrc?: string;
  name: string;
}

const MouseFollowImage = ({ isHovered, mouseX, mouseY, imageSrc, name }: MouseFollowImageProps) => (
  <AnimatePresence>
    {isHovered && (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.7, ease: liquidEase }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.95,
          transition: { duration: 0 }
        }}
        className="absolute pointer-events-none z-[5]"
        style={{
          left: mouseX - 104,
          top: mouseY - 128,
        }}
      >
        <div className="w-52 h-64 overflow-hidden">
          <img 
            src={imageSrc || guestBg} 
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MouseFollowImage;
