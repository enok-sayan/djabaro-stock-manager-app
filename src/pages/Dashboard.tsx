
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Truck,
  BarChart3,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const stats = {
    totalProducts: 1247,
    lowStock: 23,
    totalUsers: 45,
    pendingOrders: 12,
    monthlyRevenue: 156700,
    activeSuppliers: 8
  };

  const recentActivities = [
    { id: 1, action: 'Nouvelle réception', item: 'iPhone 15 Pro', quantity: 50, time: '2h' },
    { id: 2, action: 'Stock faible', item: 'AirPods Pro', quantity: 5, time: '4h' },
    { id: 3, action: 'Expédition', item: 'Samsung Galaxy S24', quantity: 15, time: '6h' },
    { id: 4, action: 'Nouveau client', item: 'Client Premium', quantity: 1, time: '8h' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getRoleBasedContent = () => {
    switch (user?.role) {
      case 'Admin':
        return {
          title: 'Vue d\'ensemble administrative',
          description: 'Gestion complète du système Djabaro'
        };
      case 'Manager':
        return {
          title: 'Tableau de bord managérial',
          description: 'Supervision des opérations et performances'
        };
      case 'Employé':
        return {
          title: 'Espace de travail',
          description: 'Gestion quotidienne des stocks'
        };
      case 'Client':
        return {
          title: 'Mon espace client',
          description: 'Suivi de vos commandes et historique'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Bienvenue sur Djabaro'
        };
    }
  };

  const roleContent = getRoleBasedContent();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getGreeting()}, {user?.firstName} !
            </h1>
            <p className="text-gray-600 mt-1">{roleContent.description}</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-primary border-primary">
              {user?.role}
            </Badge>
            <p className="text-sm text-gray-500 mt-2">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits en stock</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-gray-600">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock faible</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.lowStock}</div>
            <p className="text-xs text-gray-600">Articles à réapprovisionner</p>
          </CardContent>
        </Card>

        {user?.role !== 'Client' && (
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.totalUsers}</div>
              <p className="text-xs text-gray-600">+3 ce mois</p>
            </CardContent>
          </Card>
        )}

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'Client' ? 'Mes commandes' : 'Commandes en attente'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-600">En cours de traitement</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Activités récentes
            </CardTitle>
            <CardDescription>
              Dernières actions sur le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{activity.quantity}</p>
                    <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Raccourcis vers les fonctions principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {user?.role !== 'Client' && (
                <>
                  <button className="p-4 bg-primary/10 rounded-lg text-center hover:bg-primary/20 transition-colors">
                    <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-primary">Nouveau produit</p>
                  </button>
                  <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                    <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-600">Réception</p>
                  </button>
                </>
              )}
              <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-600">Rapport</p>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-600">Alertes</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Info Footer */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-primary">DJABARO</h3>
              <p className="text-sm text-gray-600">Commerce d'équipements électroniques - Côte d'Ivoire</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>📞 05 05 05 05 05</p>
              <p>📧 Djabaro@gmail.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
