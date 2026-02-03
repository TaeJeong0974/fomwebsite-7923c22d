import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
  actionButtons?: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children, actionButtons }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      {/* Content Container */}
      <main className="relative z-10 pt-0 sm:pt-4 lg:pt-8 pb-6 sm:pb-8 lg:pb-12">
        <div className="container mx-auto container-padding">
          {/* Top Row - Action Buttons + Close Button (Desktop only) */}
          <div className="hidden lg:flex justify-end items-center gap-4 mb-6">
            {actionButtons}
            <LiquidButton
              onClick={handleClose}
              variant="dark"
              size="icon"
              aria-label="Close and return to homepage"
            >
              <X className="h-5 w-5" />
            </LiquidButton>
          </div>

          {/* Main Content */}
          <div className="relative">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
