import { Link } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import guestBg from "@/assets/guest-bg.png";

const ComingSoonEpisode = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">
          {/* Back link */}
          <Link
            to="/#podcast"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground hover-transition mb-8"
          >
            <ArrowLeft size={16} />
            Back to episodes
          </Link>

          {/* Coming Soon Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Hero Card */}
            <div 
              className="relative aspect-video rounded-3xl overflow-hidden mb-8"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              
              {/* Coming Soon Badge */}
              <div className="absolute top-6 left-6">
                <span className="glass-dark text-white px-4 py-2 rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-20 h-20 rounded-full glass mb-6 flex items-center justify-center mx-auto">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    New Episode<br />Coming Soon
                  </h1>
                  <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
                    We're preparing something special. Subscribe to get notified when this episode drops.
                  </p>
                  <button className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 hover-transition hover-lift">
                    <Bell className="w-5 h-5" />
                    Notify Me
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Release Date</h3>
                <p className="text-muted-foreground text-sm">To be announced</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Featured Guest</h3>
                <p className="text-muted-foreground text-sm">Guest to be revealed</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Topic</h3>
                <p className="text-muted-foreground text-sm">Stay tuned</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonEpisode;
