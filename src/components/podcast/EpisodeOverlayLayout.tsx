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
      <main className="relative z-10 pt-2 sm:pt-4 lg:pt-8 pb-6 sm:pb-8 lg:pb-12">
        {/* White Content Panel */}
        <div className="container mx-auto px-0 sm:container-padding">
          <div className="relative flex gap-4">
            {/* Main Panel */}
            <div className="flex-1 bg-[#f4f2ef] rounded-none sm:rounded-xl shadow-2xl shadow-black/5 px-4 py-6 sm:p-8 lg:p-10">
              {children}
            </div>
            
            {/* Close Button */}
            <div className="hidden lg:block w-12 flex-shrink-0">
              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center hover:scale-105 hover-transition"
                aria-label="Close and return to homepage"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
