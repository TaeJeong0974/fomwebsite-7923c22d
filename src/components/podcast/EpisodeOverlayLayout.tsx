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
    navigate("/#podcast");
  };

  return (
    <div className="min-h-screen relative">
      {/* Content Container */}
      <main className="relative z-10 pt-28 sm:pt-[9.3rem] lg:pt-[10.7rem] pb-6 sm:pb-8 lg:pb-12">
        <div className="container mx-auto container-padding">
          <div className="relative flex gap-4 items-start">
            {/* Main Content */}
            <div className="flex-1">
              {children}
            </div>

            {/* Action Buttons + Close Button row - desktop only */}
            <div className="hidden lg:flex flex-col flex-shrink-0 sticky top-28 gap-3 items-end">
              <div className="flex items-center gap-3 h-14">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
