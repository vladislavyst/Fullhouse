import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ForestResidence from "./pages/ForestResidence";
import LuckyHouse from "./pages/LuckyHouse";
import Parkfield from "./pages/Parkfield";
=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/services" element={<Services />} />
<<<<<<< HEAD
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/projects/forest-residence" element={<ForestResidence />} />
          <Route path="/projects/lucky-house" element={<LuckyHouse />} />
          <Route path="/projects/parkfield" element={<Parkfield />} />
=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
