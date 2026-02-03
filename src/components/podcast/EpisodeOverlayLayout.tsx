import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      {/* Floating Panel Container */}
      <main className="relative z-10 pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12">
        {/* White Content Panel */}
        <div className="container mx-auto container-padding">
          <div className="relative bg-[#f4f2ef] rounded-xl shadow-2xl shadow-black/5 p-6 sm:p-8 lg:p-10">
            {/* Close Button - Top Right */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 rounded-full bg-foreground flex items-center justify-center hover:scale-105 hover-transition z-10"
              aria-label="Close and return to homepage"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
