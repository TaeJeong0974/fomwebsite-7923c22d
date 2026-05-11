"use client";

import { LiquidButton } from "@/components/ui/LiquidButton";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
const guestBg = "/images/assets/guest-bg.jpg";

interface ComingSoonHeroCardProps {
  guestFirstName: string;
}

const ComingSoonHeroCard = ({ guestFirstName }: ComingSoonHeroCardProps) => {
  const { openSubscribe } = useSubscribe();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
      style={{
        backgroundImage: `url(${guestBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => openSubscribe({ guestName: guestFirstName })}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 hover-transition" />

      <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
        <LiquidButton variant="light" size="lg" className="gap-2">
          <Bell size={18} />
          Get Notified
        </LiquidButton>
      </div>
    </motion.div>
  );
};

export default ComingSoonHeroCard;
