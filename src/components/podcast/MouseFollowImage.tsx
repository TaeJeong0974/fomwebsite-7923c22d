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
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const hasInitialized = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setMousePosition(newPos);
        
        // Capture initial position when hover starts
        if (isHovered && !hasInitialized.current) {
          setInitialPosition(newPos);
          hasInitialized.current = true;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, containerRef]);

  // Reset initialization flag when hover ends
  useEffect(() => {
    if (!isHovered) {
      hasInitialized.current = false;
    }
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ 
            opacity: 0,
            x: initialPosition.x - 100,
            y: initialPosition.y - 120,
          }}
          animate={{ 
            opacity: 1, 
            x: mousePosition.x - 100,
            y: mousePosition.y - 120,
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 0.3, ease: "easeOut" },
            x: { duration: 0.1, ease: "easeOut" },
            y: { duration: 0.1, ease: "easeOut" },
          }}
          className="absolute pointer-events-none z-0"
          style={{
            left: 0,
            top: 0,
          }}
        >
          <div className="w-52 h-64 rounded-2xl overflow-hidden shadow-2xl">
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
