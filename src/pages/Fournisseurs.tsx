
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, Edit, Trash2, Phone, Mail, Globe, Star, Eye } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const Fournisseurs: React.FC = () => {
  const [fournisseurs, setFournisseurs] = useState([
    {
      id: 1,
      name: 'Samsung Electronics CI',
      email: 'pro@samsung.ci',
      phone: '21 25 30 40 50',
      website: 'www.samsung.ci',
      speciality: 'Smartphones & Tablettes',
      rating: 5,
      totalOrders: 45,
      reliability: 'Excellent',
      status: 'Actif'
    },
    {
      id: 2,
      name: 'Apple Distribution',
      email: 'orders@apple-distrib.com',
      phone: '21 30 40 50 60',
      website: 'www.apple-distrib.com',
      speciality: 'iPhone & MacBook',
      rating: 5,
      totalOrders: 32,
      reliability: 'Excellent',
      status: 'Actif'
    },
    {
      id: 3,
      name: 'JBL Audio Pro',
      email: 'contact@jblaudio.ci',
      phone: '21 40 50 60 70',
      website: 'www.jblaudio.ci',
      speciality: 'Audio & Casques',
      rating: 4,
      totalOrders: 28,
      reliability: 'Très bon',
      status: 'Actif'
    },
    {
      id: 4,
      name: 'TechAccessories SARL',
      email: 'vente@techaccessories.ci',
      phone: '21 50 60 70 80',
      website: 'www.techaccessories.ci',
      speciality: 'Câbles & Accessoires',
      rating: 3,
      totalOrders: 67,
      reliability: 'Bon',
      status: 'Inactif'
    }
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    fournisseurId: number | null;
  }>({ isOpen: false, fournisseurId: null });

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, fournisseurId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.fournisseurId) {
      setFournisseurs(fournisseurs.filter(f => f.id !== deleteDialog.fournisseurId));
    }
    setDeleteDialog({ isOpen: false, fournisseurId: null });
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Très bon': return 'bg-blue-100 text-blue-800';
      case 'Bon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fournisseurs</h1>
          <p className="text-gray-600 mt-2">Gestion des partenaires fournisseurs d'articles électroniques</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau fournisseur
        </Button>
      </div>

      <div className="grid gap-4">
        {fournisseurs.map((fournisseur) => (
          <Card key={fournisseur.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{fournisseur.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {fournisseur.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {fournisseur.phone}
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {fournisseur.website}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{fournisseur.speciality}</Badge>
                      <div className="flex items-center space-x-1">
                        {renderStars(fournisseur.rating)}
                        <span className="text-sm text-gray-600 ml-2">({fournisseur.totalOrders} commandes)</span>
                      </div>
                      <Badge className={getReliabilityColor(fournisseur.reliability)}>
                        {fournisseur.reliability}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={fournisseur.status === 'Actif' ? 'default' : 'secondary'}>
                    {fournisseur.status}
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
                      onClick={() => handleDelete(fournisseur.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, fournisseurId: null })}
        onConfirm={confirmDelete}
        title="Supprimer le fournisseur"
        description="Êtes-vous sûr de vouloir supprimer ce fournisseur ? Cette action est irréversible."
      />
    </div>
  );
};

export default Fournisseurs;
