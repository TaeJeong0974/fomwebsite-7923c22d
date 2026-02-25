import { ReactNode } from "react";
import teaserBg from "@/assets/teaser-bg.png";

interface SidebarCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const SidebarCard = ({ title, children, className = "" }: SidebarCardProps) => {

  return (
    <div className={`glass rounded-xl overflow-hidden relative ${className}`}>
      {/* Background image */}
      <img
        src={teaserBg}
        alt=""
        className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0 pointer-events-none"
        loading="lazy"
      />
      {/* Gradient mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_50%,hsl(var(--background)/0.8)_70%,hsl(var(--background)/0.3)_85%,transparent_100%)]" />

      {/* Content */}
      <div className="relative z-10 p-5 lg:p-6">
        <p className="text-label mb-3 lg:mb-4">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default SidebarCard;
