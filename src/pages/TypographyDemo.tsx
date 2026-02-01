import guestBg from "@/assets/guest-bg.png";

const mockGuest = {
  firstName: "Meagen",
  lastName: "Eisenberg",
  title: "CMO",
  company: "Lattice",
};

const TypographyDemo = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto container-padding">
        <h1 className="text-display-lg text-foreground mb-12">Speaker Card Typography Options</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option 1: Stacked Hierarchy */}
          <div>
            <p className="text-label mb-4">Option 1: Stacked Hierarchy</p>
            <div 
              className="card-image"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="card-overlay-light" />
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal">
                  <span className="block font-medium">{mockGuest.firstName}</span>
                  <span className="block font-normal">{mockGuest.lastName}</span>
                </h3>
                <p className="text-sm text-white/70 mt-2">{mockGuest.title}</p>
                <p className="text-sm font-medium text-white">{mockGuest.company}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Each element on its own line, company emphasized with font-medium
            </p>
          </div>

          {/* Option 2: Condensed Role Line */}
          <div>
            <p className="text-label mb-4">Option 2: Condensed Role Line</p>
            <div 
              className="card-image"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="card-overlay-light" />
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal">
                  <span className="block font-medium">{mockGuest.firstName}</span>
                  <span className="block font-normal">{mockGuest.lastName}</span>
                </h3>
                <p className="text-sm text-white/80 mt-2">
                  {mockGuest.title}, {mockGuest.company}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Title and company combined on one line with comma, compact
            </p>
          </div>

          {/* Option 3: Company First */}
          <div>
            <p className="text-label mb-4">Option 3: Company First</p>
            <div 
              className="card-image"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="card-overlay-light" />
              <div className="card-content-bottom card-padding-lg z-[3]">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal">
                  <span className="block font-medium">{mockGuest.firstName}</span>
                  <span className="block font-normal">{mockGuest.lastName}</span>
                </h3>
                <p className="text-xs uppercase tracking-wide text-white/60 mt-2">{mockGuest.company}</p>
                <p className="text-sm text-white/90">{mockGuest.title}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Company as subtle uppercase label above title
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyDemo;
