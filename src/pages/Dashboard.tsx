
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
  Clock,
  MapPin,
  Building
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
    activeSuppliers: 8,
    locations: 3
  };

  const recentActivities = [
    { id: 1, action: 'Nouvelle réception', item: 'iPhone 15 Pro - 50 unités', brand: 'Apple', time: '2h' },
    { id: 2, action: 'Stock faible', item: 'AirPods Pro - 5 unités restantes', brand: 'Apple', time: '4h' },
    { id: 3, action: 'Expédition', item: 'Samsung Galaxy S24 - 15 unités', brand: 'Samsung', time: '6h' },
    { id: 4, action: 'Nouveau client', item: 'Client Premium enregistré', brand: '', time: '8h' },
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
          title: 'Administration Djabaro',
          description: 'Gestion complète du système de commerce électronique'
        };
      case 'Manager':
        return {
          title: 'Management Djabaro',
          description: 'Supervision des opérations commerciales'
        };
      case 'Employé':
        return {
          title: 'Espace Employé',
          description: 'Gestion quotidienne des stocks et commandes'
        };
      case 'Client':
        return {
          title: 'Mon espace Djabaro',
          description: 'Découvrez nos produits électroniques'
        };
      default:
        return {
          title: 'Dashboard Djabaro',
          description: 'Commerce d\'électronique - Côte d\'Ivoire'
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

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emplacements</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.locations}</div>
            <p className="text-xs text-gray-600">Zones de stockage actives</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'Client' ? 'Mes commandes' : 'Commandes actives'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-600">En cours de traitement</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Company Info */}
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
                    {activity.brand && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {activity.brand}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              À propos de Djabaro
            </CardTitle>
            <CardDescription>
              Informations sur l'entreprise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary text-lg">DJABARO</h3>
                <p className="text-sm text-gray-600">Commerce d'équipements électroniques</p>
                <p className="text-sm text-gray-600">📍 Côte d'Ivoire</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Nos spécialités :</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">• Casques audio</div>
                  <div className="text-sm text-gray-600">• Écouteurs</div>
                  <div className="text-sm text-gray-600">• Téléphones portables</div>
                  <div className="text-sm text-gray-600">• Ordinateurs portables</div>
                  <div className="text-sm text-gray-600">• Accessoires (câbles, chargeurs, étuis)</div>
                  <div className="text-sm text-gray-600">• Accessoires gaming</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">📞 05 05 05 05 05</p>
                <p className="text-sm text-gray-600">📧 Djabaro@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
