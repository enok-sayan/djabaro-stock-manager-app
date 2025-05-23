
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageOpen, Plus, Eye, CheckCircle, Clock, Package } from 'lucide-react';

const Receptions: React.FC = () => {
  const [receptions] = useState([
    {
      id: 1,
      reference: 'REC-2024-001',
      fournisseur: 'Samsung Electronics CI',
      date: '2024-01-20',
      status: 'Réceptionné',
      items: [
        { product: 'Samsung Galaxy S24', quantity: 15, unitPrice: 450000 },
        { product: 'Samsung Galaxy Tab A9', quantity: 8, unitPrice: 180000 }
      ],
      total: 8190000,
      emplacement: 'Dépôt Principal'
    },
    {
      id: 2,
      reference: 'REC-2024-002',
      fournisseur: 'Apple Distribution',
      date: '2024-01-22',
      status: 'En attente',
      items: [
        { product: 'iPhone 15 Pro', quantity: 10, unitPrice: 650000 },
        { product: 'MacBook Air M3', quantity: 5, unitPrice: 850000 }
      ],
      total: 10750000,
      emplacement: 'Dépôt Principal'
    },
    {
      id: 3,
      reference: 'REC-2024-003',
      fournisseur: 'JBL Audio Pro',
      date: '2024-01-23',
      status: 'En cours',
      items: [
        { product: 'JBL Tune 760NC', quantity: 20, unitPrice: 45000 },
        { product: 'JBL Flip 6', quantity: 12, unitPrice: 75000 }
      ],
      total: 1800000,
      emplacement: 'Boutique Vitrine'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Réceptionné': return <CheckCircle className="w-4 h-4" />;
      case 'En cours': return <Clock className="w-4 h-4" />;
      case 'En attente': return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Réceptionné': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Réceptions</h1>
          <p className="text-gray-600 mt-2">Saisie des nouvelles livraisons reçues (Samsung, Apple, JBL, etc.)</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle réception
        </Button>
      </div>

      <div className="grid gap-6">
        {receptions.map((reception) => (
          <Card key={reception.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <PackageOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{reception.reference}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {reception.fournisseur} • {new Date(reception.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(reception.status)}>
                    {getStatusIcon(reception.status)}
                    <span className="ml-1">{reception.status}</span>
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Articles reçus:</h4>
                  <div className="space-y-1">
                    {reception.items.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between">
                        <span>{item.product} x{item.quantity}</span>
                        <span className="text-gray-600">{formatCurrency(item.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      {formatCurrency(reception.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emplacement:</span>
                    <span className="text-gray-600">{reception.emplacement}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Articles:</span>
                    <span className="text-gray-600">
                      {reception.items.reduce((sum, item) => sum + item.quantity, 0)} unités
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Receptions;
