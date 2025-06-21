
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { navItems } from "./nav-items";
import ProtectedRoute from "@/components/ProtectedRoute";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Routes>
            {navItems.map(({ to, page, protected: isProtected }) => (
              <Route 
                key={to} 
                path={to} 
                element={isProtected ? <ProtectedRoute>{page}</ProtectedRoute> : page} 
              />
            ))}
          </Routes>
          <AccessibilityToolbar />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
