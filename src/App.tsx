
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
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Clients</h1>
                  <p className="text-gray-600 mt-2">Gestion de la clientèle Djabaro</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/fournisseurs" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Fournisseurs</h1>
                  <p className="text-gray-600 mt-2">Gestion des partenaires fournisseurs d'articles électroniques</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/receptions" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Réceptions</h1>
                  <p className="text-gray-600 mt-2">Saisie des nouvelles livraisons reçues (Samsung, Apple, JBL, etc.)</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/stock" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">État de Stock</h1>
                  <p className="text-gray-600 mt-2">Consultation en temps réel des quantités disponibles</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/expedition" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Expédition</h1>
                  <p className="text-gray-600 mt-2">Suivi des produits sortants et livraisons clients</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/societe" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Société</h1>
                  <p className="text-gray-600 mt-2">Paramètres globaux de l'entreprise Djabaro</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/rapport" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Rapports</h1>
                  <p className="text-gray-600 mt-2">Génération automatique de rapports périodiques</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/sauvegarde" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Sauvegarde BD</h1>
                  <p className="text-gray-600 mt-2">Sauvegarde et restauration de la base de données</p>
                </div>
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
