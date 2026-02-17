import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/#podcast");
  };

  return (
    <div className="min-h-screen relative">
      {/* Content Container */}
      <main className="relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-8 lg:pb-12">
        <div className="container mx-auto container-padding">
          <div className="relative flex gap-4 items-start">
            {/* Main Content */}
            <div className="flex-1">
              {children}
            </div>
            
            {/* Close Button - Sticky on desktop */}
            <div className="hidden lg:flex w-12 flex-shrink-0 sticky top-28 mt-6">
              <LiquidButton
                onClick={handleClose}
                variant="dark"
                size="icon"
                aria-label="Close and return to homepage"
              >
                <X className="h-5 w-5" />
              </LiquidButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
