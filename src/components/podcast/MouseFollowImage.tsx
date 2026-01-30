import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import guestBg from "@/assets/guest-bg.png";

interface MouseFollowImageProps {
  isHovered: boolean;
  containerRef: React.RefObject<HTMLElement>;
  imageSrc?: string;
  name: string;
}

const MouseFollowImage = ({ isHovered, containerRef, imageSrc, name }: MouseFollowImageProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovered) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, containerRef]);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x - 80,
            y: mousePosition.y - 100,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            x: { duration: 0.15, ease: "easeOut" },
            y: { duration: 0.15, ease: "easeOut" },
          }}
          className="absolute pointer-events-none z-0"
          style={{
            left: 0,
            top: 0,
          }}
        >
          <div className="w-40 h-48 rounded-xl overflow-hidden shadow-2xl">
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
