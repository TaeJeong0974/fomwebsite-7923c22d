import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// iOS-style liquid spring animation config
export const liquidSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.04 },
  tap: { scale: 0.92 },
};

interface LiquidButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "light" | "dark" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const sizeClasses = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
  icon: "h-12 w-12",
};

const variantClasses = {
  // Light glass for dark backgrounds
  light: "bg-white/15 backdrop-blur-2xl border border-white/25 text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-white/25 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]",
  // Dark glass for light backgrounds  
  dark: "bg-foreground text-background shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]",
  // Default glass for light backgrounds
  glass: "bg-white/60 backdrop-blur-2xl border border-white/40 text-foreground shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-white/80 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]",
};

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = "glass", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-[background,box-shadow] duration-300 focus-ring",
          size !== "icon" && "[&>*]:translate-y-[2px]",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={liquidSpring}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

export { LiquidButton, buttonVariants, variantClasses, sizeClasses };
export type { LiquidButtonProps };
