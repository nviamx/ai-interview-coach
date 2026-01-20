import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import UploadPage from "./pages/UploadPage";
import StartInterviewPage from "./pages/StartInterviewPage";
import LiveInterviewPage from "./pages/LiveInterviewPage";
import FeedbackReportPage from "./pages/FeedbackReportPage";
import CoachDashboard from "./pages/CoachDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<CandidateDashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/interview/start" element={<StartInterviewPage />} />
            <Route path="/interview/live" element={<LiveInterviewPage />} />
            <Route path="/reports/latest" element={<FeedbackReportPage />} />
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;