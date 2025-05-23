
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Plus, Edit, Trash2, Eye, Package, Clock } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const Expedition: React.FC = () => {
  const [expeditions, setExpeditions] = useState([
    {
      id: 1,
      reference: 'EXP-2024-001',
      client: 'Kouakou Jean',
      destination: 'Cocody, Abidjan',
      date: '2024-01-20',
      status: 'Expédié',
      transporteur: 'DHL Express',
      items: [
        { product: 'Samsung Galaxy S24', quantity: 2, unitPrice: 450000 },
        { product: 'JBL Flip 6', quantity: 1, unitPrice: 75000 }
      ],
      total: 975000
    },
    {
      id: 2,
      reference: 'EXP-2024-002',
      client: 'SARL TechPro CI',
      destination: 'Plateau, Abidjan',
      date: '2024-01-22',
      status: 'En préparation',
      transporteur: 'Chronopost',
      items: [
        { product: 'iPhone 15 Pro', quantity: 5, unitPrice: 650000 }
      ],
      total: 3250000
    }
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    expeditionId: number | null;
  }>({ isOpen: false, expeditionId: null });

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, expeditionId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.expeditionId) {
      setExpeditions(expeditions.filter(exp => exp.id !== deleteDialog.expeditionId));
    }
    setDeleteDialog({ isOpen: false, expeditionId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Expédié': return 'bg-green-100 text-green-800';
      case 'En préparation': return 'bg-yellow-100 text-yellow-800';
      case 'Livré': return 'bg-blue-100 text-blue-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Expédition</h1>
          <p className="text-gray-600 mt-2">Suivi des produits sortants et livraisons clients</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle expédition
        </Button>
      </div>

      <div className="grid gap-6">
        {expeditions.map((expedition) => (
          <Card key={expedition.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{expedition.reference}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {expedition.client} • {expedition.transporteur}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(expedition.status)}>
                    {expedition.status === 'En préparation' ? <Clock className="w-3 h-3 mr-1" /> : <Package className="w-3 h-3 mr-1" />}
                    {expedition.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(expedition.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Articles expédiés:</h4>
                  <div className="space-y-1">
                    {expedition.items.map((item, index) => (
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
                      {formatCurrency(expedition.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Destination:</span>
                    <span className="text-gray-600">{expedition.destination}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date:</span>
                    <span className="text-gray-600">
                      {new Date(expedition.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, expeditionId: null })}
        onConfirm={confirmDelete}
        title="Supprimer l'expédition"
        description="Êtes-vous sûr de vouloir supprimer cette expédition ? Cette action est irréversible."
      />
    </div>
  );
};

export default Expedition;
