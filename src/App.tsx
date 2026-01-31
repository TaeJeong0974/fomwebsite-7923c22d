import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscribeProvider } from "@/contexts/SubscribeContext";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import PodcastDetail from "./pages/PodcastDetail";
import AnimationDemo from "./pages/AnimationDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SubscribeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/episode/:slug" element={<PodcastDetail />} />
            <Route path="/animation-demo" element={<AnimationDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
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
