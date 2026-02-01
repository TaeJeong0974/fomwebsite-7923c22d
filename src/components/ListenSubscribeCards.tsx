import { motion } from "framer-motion";
import { useSubscribe } from "@/contexts/SubscribeContext";

interface ListenSubscribeCardsProps {
  showTitle?: boolean;
  className?: string;
}

const ListenSubscribeCards = ({ showTitle = true, className = "" }: ListenSubscribeCardsProps) => {
  const { openSubscribe } = useSubscribe();

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

  return (
    <div className={className}>
      {showTitle && (
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-6 sm:mb-8">
          Stay Connected
        </p>
      )}
      
      {/* Large stacked links */}
      <div className="flex flex-col">
        {linkItems.map((item, index) => (
          item.onClick ? (
            <motion.button
              key={item.label}
              onClick={item.onClick}
              className="group text-left py-3 sm:py-4 border-t border-foreground/10 last:border-b hover-transition"
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
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-display text-[2rem] sm:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-medium leading-[1.1] tracking-tight text-foreground hover-transition group-hover:text-foreground/60">
                {item.label}
              </span>
            </motion.a>
          )
        ))}
      </div>
    </div>
  );
};

export default ListenSubscribeCards;
