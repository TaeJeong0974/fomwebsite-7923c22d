import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SubscribeProvider, useSubscribe } from "@/contexts/SubscribeContext";
import { LayoutPrototypeProvider } from "@/contexts/LayoutPrototypeContext";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/animations/PageTransition";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import PodcastDetail from "./pages/PodcastDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const { isOpen } = useSubscribe();
  
  return (
    <>
      {/* Fixed background - stays during transitions */}
      <div className="fixed inset-0 -z-10 bg-[#f4f2ef]" />
      
      {/* Main content wrapper */}
      <div>
        {/* Navbar stays fixed, outside of page transitions */}
        <Navbar />
        
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/episode/:slug" element={<PodcastDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubscribeProvider>
        <LayoutPrototypeProvider>
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
        </LayoutPrototypeProvider>
      </SubscribeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
