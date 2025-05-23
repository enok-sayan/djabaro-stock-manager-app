
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Package, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Stock: React.FC = () => {
  const [stockItems] = useState([
    {
      id: 1,
      product: 'Samsung Galaxy S24',
      category: 'Téléphones',
      emplacement: 'Dépôt Principal',
      quantite: 25,
      seuilAlerte: 10,
      prixUnitaire: 450000,
      valeurStock: 11250000,
      derniereEntree: '2024-01-20'
    },
    {
      id: 2,
      product: 'iPhone 15 Pro',
      category: 'Téléphones',
      emplacement: 'Boutique Vitrine',
      quantite: 8,
      seuilAlerte: 15,
      prixUnitaire: 650000,
      valeurStock: 5200000,
      derniereEntree: '2024-01-18'
    },
    {
      id: 3,
      product: 'JBL Tune 760NC',
      category: 'Casques Audio',
      emplacement: 'Dépôt Principal',
      quantite: 45,
      seuilAlerte: 20,
      prixUnitaire: 45000,
      valeurStock: 2025000,
      derniereEntree: '2024-01-19'
    },
    {
      id: 4,
      product: 'MacBook Air M3',
      category: 'Ordinateurs',
      emplacement: 'Entrepôt Secondaire',
      quantite: 3,
      seuilAlerte: 5,
      prixUnitaire: 850000,
      valeurStock: 2550000,
      derniereEntree: '2024-01-15'
    },
    {
      id: 5,
      product: 'Câble USB-C',
      category: 'Accessoires',
      emplacement: 'Boutique Vitrine',
      quantite: 120,
      seuilAlerte: 50,
      prixUnitaire: 3500,
      valeurStock: 420000,
      derniereEntree: '2024-01-22'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStock = stockItems.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantite: number, seuil: number) => {
    if (quantite === 0) return { status: 'Rupture', color: 'bg-red-100 text-red-800' };
    if (quantite <= seuil) return { status: 'Alerte', color: 'bg-orange-100 text-orange-800' };
    return { status: 'Disponible', color: 'bg-green-100 text-green-800' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalValue = stockItems.reduce((sum, item) => sum + item.valeurStock, 0);
  const alertItems = stockItems.filter(item => item.quantite <= item.seuilAlerte).length;
  const totalItems = stockItems.reduce((sum, item) => sum + item.quantite, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">État de Stock</h1>
          <p className="text-gray-600 mt-2">Consultation en temps réel des quantités disponibles</p>
        </div>
      </div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valeur Stock</p>
                <p className="text-xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alertes Stock</p>
                <p className="text-2xl font-bold text-orange-600">{alertItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Produits</p>
                <p className="text-2xl font-bold">{stockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          Exporter
        </Button>
      </div>

      {/* Liste des articles en stock */}
      <div className="space-y-4">
        {filteredStock.map((item) => {
          const stockStatus = getStockStatus(item.quantite, item.seuilAlerte);
          
          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-lg">{item.product}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.emplacement}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{item.quantite}</p>
                    <p className="text-xs text-gray-500">En stock</p>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={stockStatus.color}>
                      {stockStatus.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Seuil: {item.seuilAlerte}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-medium">{formatCurrency(item.prixUnitaire)}</p>
                    <p className="text-xs text-gray-500">Prix unitaire</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-bold text-green-600">{formatCurrency(item.valeurStock)}</p>
                    <p className="text-xs text-gray-500">Valeur totale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Stock;
