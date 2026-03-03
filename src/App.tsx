import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { SubscribeProvider } from "@/contexts/SubscribeContext";
import { EpisodeDataProvider } from "@/contexts/EpisodeDataContext";

import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/animations/PageTransition";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import { lazyRetry } from "@/lib/lazyRetry";

// Lazy-load non-homepage routes with retry for stale chunks
const PodcastDetail = lazy(() => lazyRetry(() => import("./pages/PodcastDetail")));
const Privacy = lazy(() => lazyRetry(() => import("./pages/Privacy")));
const NotFound = lazy(() => lazyRetry(() => import("./pages/NotFound")));

const RouteFallback = () => (
  <div className="min-h-screen" />
);

const NavigateToSlug = () => {
  const { slug } = useParams();
  return <Navigate to={`/podcast/${slug}`} replace />;
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      {/* Fixed background - stays during transitions */}
      <div className="fixed inset-0 -z-10 bg-[#f4f2ef]" />
      
      {/* Navbar */}
      <Navbar />
      
      <PageTransition>
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/podcast/:slug" element={<PodcastDetail />} />
            <Route path="/episode/:slug" element={<NavigateToSlug />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </>
  );
};

const App = () => (
  <EpisodeDataProvider>
    <SubscribeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </SubscribeProvider>
  </EpisodeDataProvider>
);

export default App;
