import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/');
    requestAnimationFrame(() => {
      setTimeout(() => {
        const podcastSection = document.getElementById('podcast');
        if (podcastSection) {
          podcastSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <div className="min-h-screen relative">
      {/* Floating Panel Container */}
      <main className="relative z-10 pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12">
        {/* White Content Panel */}
        <div className="container mx-auto container-padding">
          <div className="bg-[#f4f2ef] rounded-xl shadow-2xl shadow-black/5 p-6 sm:p-8 lg:p-10 relative">
            {/* Close Button - absolute within panel, sticky while scrolling */}
            <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-20 lg:w-24 pointer-events-none">
              <button
                onClick={handleClose}
                className="sticky top-20 sm:top-24 lg:top-28 ml-auto mr-4 sm:mr-6 lg:mr-8 mt-4 sm:mt-6 lg:mt-8 pointer-events-auto flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background hover:bg-foreground/80 hover:scale-105 hover-transition shadow-lg"
                aria-label="Close and return to episodes"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Content wrapper - with right padding for button */}
            <div className="pr-12 sm:pr-14 lg:pr-16">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
