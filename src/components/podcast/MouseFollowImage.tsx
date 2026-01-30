import { motion, AnimatePresence } from "framer-motion";
import guestBg from "@/assets/guest-bg.png";

interface MouseFollowImageProps {
  isHovered: boolean;
  mouseX: number;
  mouseY: number;
  imageSrc?: string;
  name: string;
}

const MouseFollowImage = ({ isHovered, mouseX, mouseY, imageSrc, name }: MouseFollowImageProps) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute pointer-events-none z-0"
          style={{
            left: mouseX - 80,
            top: mouseY - 104,
          }}
        >
          <div className="w-40 h-52 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imageSrc || guestBg} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MouseFollowImage;
