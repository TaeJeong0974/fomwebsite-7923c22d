import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

interface LinkItem {
  label: string;
  onClick?: () => void;
  href?: string;
  hoverColors: string[];
}

interface AnimatedLinkProps {
  item: LinkItem;
  variants: any;
  isMobile: boolean;
}

const AnimatedLink = ({ item, variants, isMobile }: AnimatedLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.span 
      className="font-display text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[1.1] tracking-tight inline-block"
      initial={false}
      animate={isHovered && !isMobile ? {
        color: item.hoverColors,
        x: 8,
      } : {
        color: 'hsl(240, 10%, 10%)',
        x: 0,
      }}
      transition={{ 
        color: isHovered && !isMobile
          ? { duration: 1.5, ease: 'easeInOut', repeat: Infinity }
          : { duration: 0.15, ease: liquidEase },
        x: { duration: isHovered && !isMobile ? 0.4 : 0.15, ease: liquidEase },
      }}
    >
      {item.label}
    </motion.span>
  );

  if (item.onClick) {
    return (
      <motion.button
        onClick={item.onClick}
        className="text-left py-3 sm:py-4 border-t border-foreground/10 last:border-b"
        variants={variants}
        whileTap={{ scale: 0.99 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={item.href}
      target={item.href?.startsWith('mailto') ? undefined : "_blank"}
      rel={item.href?.startsWith('mailto') ? undefined : "noopener noreferrer"}
      className="block py-3 sm:py-4 border-t border-foreground/10 last:border-b"
      variants={variants}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </motion.a>
  );
};

interface ListenSubscribeCardsProps {
  showTitle?: boolean;
  className?: string;
}

const ListenSubscribeCards = ({ showTitle = true, className = "" }: ListenSubscribeCardsProps) => {
  const { openSubscribe } = useSubscribe();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const linkItems: LinkItem[] = [
    {
      label: "Subscribe",
      onClick: openSubscribe,
      href: undefined,
      hoverColors: ["rgb(255,90,50)", "rgb(255,140,0)", "rgb(255,60,80)", "rgb(255,90,50)"], // vivid orange-red
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@futureofmarketing",
      hoverColors: ["rgb(220,50,120)", "rgb(180,40,180)", "rgb(255,80,150)", "rgb(220,50,120)"], // hot pink-magenta
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/futureofmarketing",
      hoverColors: ["rgb(120,40,200)", "rgb(80,60,220)", "rgb(160,50,180)", "rgb(120,40,200)"], // electric purple
    },
    {
      label: "Email Us",
      href: "mailto:hello@futureofmarketing.com",
      hoverColors: ["rgb(0,120,255)", "rgb(50,80,220)", "rgb(0,180,255)", "rgb(0,120,255)"], // vibrant blue
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: liquidEase,
      },
    },
  };

  return (
    <div ref={sectionRef} className={className}>
      {showTitle && (
        <motion.p 
          className="text-label mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: liquidEase }}
        >
          STAY CONNECTED
        </motion.p>
      )}
      
      {/* Large stacked links */}
      <motion.div 
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {linkItems.map((item) => (
          <AnimatedLink key={item.label} item={item} variants={itemVariants} isMobile={isMobile} />
        ))}
      </motion.div>
    </div>
  );
};

export default ListenSubscribeCards;
