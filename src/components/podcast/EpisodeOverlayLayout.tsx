interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Floating Panel Container */}
      <main className="relative z-10 pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-12">
        {/* White Content Panel */}
        <div className="container mx-auto container-padding">
          <div className="bg-[#f4f2ef] rounded-xl shadow-2xl shadow-black/5 p-6 sm:p-8 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;
