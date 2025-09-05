import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Projects = lazy(() => import("./pages/Projects"));
const Realized = lazy(() => import("./pages/Realized"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Licenses = lazy(() => import("./pages/Licenses"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Construction = lazy(() => import("./pages/Construction"));
const Reconstruction = lazy(() => import("./pages/Reconstruction"));
const Design = lazy(() => import("./pages/Design"));
const Privacy = lazy(() => import("./pages/Privacy"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/realized" element={<Realized />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/reconstruction" element={<Reconstruction />} />
            <Route path="/design" element={<Design />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/licenses" element={<Licenses />} />
            <Route path="/certificates" element={<Certificates />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
