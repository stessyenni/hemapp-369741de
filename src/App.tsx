
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Create a singleton QueryClient with minimized options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // Reduce retry attempts to save memory
      refetchOnWindowFocus: false,
      staleTime: Infinity, // Prevent unnecessary refetches
    },
  },
});

// Use lazy loading for routes to reduce initial load
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const ProfileSettings = lazy(() => import("./components/ProfileSettings"));
const ApiSetupGuide = lazy(() => import("./pages/ApiSetupGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Simplified loading component
const Loading = () => <div className="p-4 text-center">Loading...</div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } 
              />
              <Route path="/api-setup-guide" element={<ApiSetupGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
