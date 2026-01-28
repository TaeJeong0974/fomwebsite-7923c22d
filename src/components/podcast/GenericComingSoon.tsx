import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSubscribe } from "@/contexts/SubscribeContext";

const GenericComingSoon = () => {
  const { openSubscribe } = useSubscribe();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full glass-dark mb-6 flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              New Episode<br />Coming Soon
            </h1>
            <p className="text-foreground text-lg max-w-md mx-auto mb-8">
              We're preparing something special. Subscribe to get notified when this episode drops.
            </p>
            <button 
              onClick={openSubscribe}
              className="btn-base btn-glass btn-lg inline-flex items-center gap-2.5"
            >
              <Bell className="w-5 h-5" />
              Notify Me
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GenericComingSoon;
