import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface LinkItem {
  label: string;
  onClick?: () => void;
  href?: string;
  hoverColors: string[];
}

interface AnimatedLinkProps {
  item: LinkItem;
  variants: any;
}

const AnimatedLink = ({ item, variants }: AnimatedLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.span 
      className="font-display text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[1.1] tracking-tight inline-block"
      animate={{
        color: isHovered ? item.hoverColors : 'hsl(240, 10%, 10%)',
        x: isHovered ? 8 : 0,
      }}
      transition={{ 
        color: { duration: 2, ease: 'easeInOut', repeat: isHovered ? Infinity : 0 },
        x: { duration: 0.4, ease: liquidEase },
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const linkItems: LinkItem[] = [
    {
      label: "Subscribe",
      onClick: openSubscribe,
      href: undefined,
      hoverColors: ["rgb(235,150,90)", "rgb(245,170,110)", "rgb(225,130,70)", "rgb(235,150,90)"], // warm coral shades
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@futureofmarketing",
      hoverColors: ["rgb(190,130,160)", "rgb(210,150,180)", "rgb(170,110,140)", "rgb(190,130,160)"], // dusty rose shades
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/futureofmarketing",
      hoverColors: ["rgb(90,130,180)", "rgb(110,150,200)", "rgb(70,110,160)", "rgb(90,130,180)"], // slate blue shades
    },
    {
      label: "Email Us",
      href: "mailto:hello@futureofmarketing.com",
      hoverColors: ["rgb(150,130,180)", "rgb(170,150,200)", "rgb(130,110,160)", "rgb(150,130,180)"], // lavender shades
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
          <AnimatedLink key={item.label} item={item} variants={itemVariants} />
        ))}
      </motion.div>
    </div>
  );
};

export default ListenSubscribeCards;
