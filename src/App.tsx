import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { SubscribeProvider } from "@/contexts/SubscribeContext";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/animations/PageTransition";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";

// Lazy-load non-homepage routes — these are code-split into separate chunks
const PodcastDetail = lazy(() => import("./pages/PodcastDetail"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

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
      
      {/* Navbar stays fixed, outside of page transitions */}
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubscribeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
          }}
        />
      </SubscribeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
