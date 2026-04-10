import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./views/Index";
import Register from "./views/Register";
import Exhibitor from "./views/Exhibitor";
import Awards from "./views/Awards";
import Conference from "./views/Conference";
import Workshops from "./views/Workshops";
import Expo from "./views/Expo";
import Speakers from "./views/Speakers";
import SpringSummit from "./views/SpringSummit";
import AutumnConference from "./views/AutumnConference";
import Gallery from "./views/Gallery";
import Partners from "./views/Partners";
import PartnerContractFormRedirect from "./views/PartnerContractFormRedirect";
import ShortlineRedirect from "./views/ShortlineRedirect";
import Nominations2026Redirect from "./views/Nominations2026Redirect";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";
import RefundPolicy from "./views/RefundPolicy";
import AdminLogin from "./views/AdminLogin";
import AdminDashboard from "./views/AdminDashboard";
import GalleryManager from "./views/GalleryManager";
import SpeakersManager from "./views/SpeakersManager";
import SponsorsManager from "./views/SponsorsManager";
import NewsletterManager from "./views/NewsletterManager";
import Newsletter from "./views/Newsletter";
import NotFound from "./views/NotFound";
import AIChatbot from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partnercontractform" element={<PartnerContractFormRedirect />} />
            <Route path="/shortline/:team" element={<ShortlineRedirect />} />
            <Route path="/nominations2026" element={<Nominations2026Redirect />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/gallery" element={<GalleryManager />} />
            <Route path="/admin/speakers" element={<SpeakersManager />} />
            <Route path="/admin/sponsors" element={<SponsorsManager />} />
            <Route path="/admin/newsletter" element={<NewsletterManager />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AIChatbot />
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
