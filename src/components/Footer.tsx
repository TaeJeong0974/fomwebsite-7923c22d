import FomLogo from "@/assets/FOM_Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 lg:py-10">
      <div className="container mx-auto container-padding">
        <div className="glass-subtle rounded-xl px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={FomLogo} alt="Future of Marketing" className="h-4 opacity-50" />
              <span className="text-body-sm text-muted-foreground">
                Stories, ideas, and live experiences.
              </span>
            </div>
            <p className="text-body-sm text-muted-foreground">
              © {currentYear} Future of Marketing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
