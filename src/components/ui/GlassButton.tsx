import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { liquidSpring } from "@/components/ui/LiquidButton";

export interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 p-1.5",
  md: "w-10 h-10 p-2",
  lg: "w-12 h-12 p-2.5",
  xl: "w-16 h-16 sm:w-20 sm:h-20 p-4",
};

const variantClasses = {
  // For light/neutral backgrounds
  light:
    "bg-white/60 backdrop-blur-2xl border border-white/40 text-foreground shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]",
  // For dark backgrounds / over images
  dark:
    "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]",
};

const hoverBg = {
  light: "rgba(255,255,255,0.8)",
  dark: "rgba(255,255,255,0.2)",
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "light", size = "md", as, children, ...props }, ref) => {
    const Component = (as === "a" ? motion.a : motion.button) as typeof motion.button;

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-[background,box-shadow] duration-300",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        whileHover={{ scale: 1.1, backgroundColor: hoverBg[variant] }}
        whileTap={{ scale: 0.9 }}
        transition={liquidSpring}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton };
