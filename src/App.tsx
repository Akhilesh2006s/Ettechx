import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Exhibitor from "./pages/Exhibitor";
import Awards from "./pages/Awards";
import Conference from "./pages/Conference";
import Workshops from "./pages/Workshops";
import Expo from "./pages/Expo";
import Speakers from "./pages/Speakers";
import SpringSummit from "./pages/SpringSummit";
import AutumnConference from "./pages/AutumnConference";
import NotFound from "./pages/NotFound";
import AIChatbot from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exhibitor" element={<Exhibitor />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/expo" element={<Expo />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/spring-summit" element={<SpringSummit />} />
          <Route path="/autumn-conference" element={<AutumnConference />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AIChatbot />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
