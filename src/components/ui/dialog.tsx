import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { liquidSpring, buttonVariants } from "@/components/ui/LiquidButton";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

function DialogOverlay({ 
  className, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

function DialogContent({ 
  className, 
  children, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <motion.button 
            className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-2xl border border-white/25 flex items-center justify-center text-white/80 hover:text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-white/25 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] transition-[background,box-shadow] duration-300 focus:outline-none focus-ring"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            transition={liquidSpring}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </motion.button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

function DialogTitle({ 
  className, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}
DialogTitle.displayName = DialogPrimitive.Title.displayName;

function DialogDescription({ 
  className, 
  ...props 
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description 
      className={cn("text-sm text-muted-foreground", className)} 
      {...props} 
    />
  );
}
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
