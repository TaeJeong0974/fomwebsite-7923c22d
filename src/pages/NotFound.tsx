import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center container-padding">
        <h1 className="text-display-xl text-foreground mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="btn-base btn-glass btn-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
