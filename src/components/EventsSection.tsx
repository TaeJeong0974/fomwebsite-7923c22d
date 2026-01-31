import { Play } from "lucide-react";

const EventsSection = () => {
  return (
    <section id="events" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Full-width Video */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group cursor-pointer rounded-xl">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
          </video>

          {/* Overlay Gradient */}
          <div className="card-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
            <div className="max-w-2xl">
              <span className="badge-interactive glass-dark text-white mb-4">
                Past Event
              </span>
              <h3 className="text-display-lg text-white mb-3">
                FOM 2025
              </h3>
              <div className="flex items-center gap-2 text-body-sm text-white mb-4">
                <span>San Francisco, CA</span>
              </div>
              <p className="text-body text-white max-w-lg mb-6 hidden sm:block">
                An evening of insights, networking, and conversations about the future of AI in marketing.
              </p>
              <div className="flex items-center gap-4">
                <button className="btn-base btn-glass-light btn-sm gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Recap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
