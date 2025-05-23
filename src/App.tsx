
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Categories from "@/pages/Categories";
import Utilisateurs from "@/pages/Utilisateurs";
import Emplacements from "@/pages/Emplacements";
import Clients from "@/pages/Clients";
import Fournisseurs from "@/pages/Fournisseurs";
import Receptions from "@/pages/Receptions";
import Stock from "@/pages/Stock";
import Expedition from "@/pages/Expedition";
import Societe from "@/pages/Societe";
import Rapport from "@/pages/Rapport";
import Sauvegarde from "@/pages/Sauvegarde";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } />
            <Route path="/utilisateurs" element={
              <ProtectedRoute>
                <Utilisateurs />
              </ProtectedRoute>
            } />
            <Route path="/emplacements" element={
              <ProtectedRoute>
                <Emplacements />
              </ProtectedRoute>
            } />
            <Route path="/clients" element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            } />
            <Route path="/fournisseurs" element={
              <ProtectedRoute>
                <Fournisseurs />
              </ProtectedRoute>
            } />
            <Route path="/receptions" element={
              <ProtectedRoute>
                <Receptions />
              </ProtectedRoute>
            } />
            <Route path="/stock" element={
              <ProtectedRoute>
                <Stock />
              </ProtectedRoute>
            } />
            <Route path="/expedition" element={
              <ProtectedRoute>
                <Expedition />
              </ProtectedRoute>
            } />
            <Route path="/societe" element={
              <ProtectedRoute>
                <Societe />
              </ProtectedRoute>
            } />
            <Route path="/rapport" element={
              <ProtectedRoute>
                <Rapport />
              </ProtectedRoute>
            } />
            <Route path="/sauvegarde" element={
              <ProtectedRoute>
                <Sauvegarde />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
