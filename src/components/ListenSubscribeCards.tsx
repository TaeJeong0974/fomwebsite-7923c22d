import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface ListenSubscribeCardsProps {
  showTitle?: boolean;
  className?: string;
}

const ListenSubscribeCards = ({ showTitle = true, className = "" }: ListenSubscribeCardsProps) => {
  const { openSubscribe } = useSubscribe();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const linkItems = [
    {
      label: "Subscribe",
      onClick: openSubscribe,
      href: undefined,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@futureofmarketing",
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/futureofmarketing",
    },
    {
      label: "Email Us",
      href: "mailto:hello@futureofmarketing.com",
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
          item.onClick ? (
            <motion.button
              key={item.label}
              onClick={item.onClick}
              className="group text-left py-3 sm:py-4 border-t border-foreground/10 last:border-b hover-transition"
              variants={itemVariants}
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-display text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[1.1] tracking-tight text-foreground hover-transition group-hover:text-foreground/60">
                {item.label}
              </span>
            </motion.button>
          ) : (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href?.startsWith('mailto') ? undefined : "_blank"}
              rel={item.href?.startsWith('mailto') ? undefined : "noopener noreferrer"}
              className="group py-3 sm:py-4 border-t border-foreground/10 last:border-b hover-transition"
              variants={itemVariants}
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-display text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[1.1] tracking-tight text-foreground hover-transition group-hover:text-foreground/60">
                {item.label}
              </span>
            </motion.a>
          )
        ))}
      </motion.div>
    </div>
  );
};

export default ListenSubscribeCards;
