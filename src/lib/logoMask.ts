// Shared FOM logo SVG mask — used by Navbar, Footer, and HeroSection
export const fomLogoMask = `url("data:image/svg+xml,%3Csvg width='598' height='186' viewBox='0 0 598 186' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M448.5 0H411.125V186H448.5V0Z' fill='black'/%3E%3Cpath d='M0 -4.57764e-05L0 37.2L149.5 37.2V-4.57764e-05L0 -4.57764e-05Z' fill='black'/%3E%3Cpath d='M0 74.3806L0 111.581L149.5 111.581V74.3806H0Z' fill='black'/%3E%3Cpath d='M0 148.8L0 186H73.6799V148.8H0Z' fill='black'/%3E%3Cpath d='M523.25 0H485.875V186H523.25V0Z' fill='black'/%3E%3Cpath d='M598 0H560.625V186H598V0Z' fill='black'/%3E%3Cpath d='M280.322 37.2C311.238 37.2 336.394 62.2388 336.394 93.0097C336.394 123.781 311.238 148.819 280.322 148.819C249.407 148.819 224.25 123.781 224.25 93.0097C224.25 62.2388 249.407 37.2 280.322 37.2ZM280.322 0C228.705 0 186.875 41.6346 186.875 93.0097C186.875 144.385 228.705 186.019 280.322 186.019C331.939 186.019 373.769 144.385 373.769 93.0097C373.769 41.6346 331.92 0 280.322 0Z' fill='black'/%3E%3C/svg%3E")`;

export const fomMaskStyles: React.CSSProperties = {
  maskImage: fomLogoMask,
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
  maskPosition: "left center",
  WebkitMaskImage: fomLogoMask,
  WebkitMaskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "left center",
};

export const fomMaskContainStyles: React.CSSProperties = {
  maskImage: fomLogoMask,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: fomLogoMask,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
};
