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
        color: '#1a1a1a',
        x: 0,
      }}
      transition={{ 
        color: isHovered && !isMobile
          ? { duration: 4, ease: 'easeInOut', repeat: Infinity }
          : { duration: 0.15, ease: liquidEase },
        x: { duration: isHovered && !isMobile ? 0.6 : 0.15, ease: liquidEase },
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
  guestName?: string;
  notifyHeadline?: string;
}

const ListenSubscribeCards = ({ showTitle = true, className = "", guestName, notifyHeadline }: ListenSubscribeCardsProps) => {
  const { openSubscribe } = useSubscribe();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const linkItems: LinkItem[] = [
    {
      label: "Subscribe",
      onClick: () => openSubscribe({ guestName, headline: notifyHeadline }),
      href: undefined,
      hoverColors: ["#594881", "#805781", "#9A5B77", "#594881"],
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@FutureofMarketingwithAI",
      hoverColors: ["#805781", "#9A5B77", "#AB5866", "#805781"],
    },
    {
      label: "Apple",
      href: "https://podcasts.apple.com/us/podcast/future-of-marketing/id1876216633",
      hoverColors: ["#9A5B77", "#AB5866", "#B45250", "#9A5B77"],
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/futureofmarketing",
      hoverColors: ["#AB5866", "#B45250", "#B44C38", "#AB5866"],
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/f-o-m/about/",
      hoverColors: ["#B45250", "#B44C38", "#594881", "#B45250"],
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
          className="text-label font-medium text-foreground mb-6 sm:mb-8"
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
