import { Bell } from "lucide-react";
import { useSubscribe } from "@/contexts/SubscribeContext";

const NotifyCTACard = () => {
  const { openSubscribe } = useSubscribe();

  return (
    <div className="glass-dark rounded-2xl p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
        <Bell className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-2">
        Get Notified
      </h3>
      <p className="text-white/60 text-sm mb-6">
        Be the first to know when this episode drops.
      </p>
      <button
        onClick={openSubscribe}
        className="w-full btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Notify Me
      </button>
    </div>
  );
};

export default NotifyCTACard;
