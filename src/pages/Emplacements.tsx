
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Edit, Trash2, Warehouse, Store, Package, Eye } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const Emplacements: React.FC = () => {
  const [emplacements, setEmplacements] = useState([
    { 
      id: 1, 
      name: 'Dépôt Principal', 
      type: 'Entrepôt',
      address: 'Zone Industrielle, Abidjan',
      capacity: 1000,
      occupied: 750,
      icon: Warehouse,
      status: 'Actif'
    },
    { 
      id: 2, 
      name: 'Boutique Vitrine', 
      type: 'Magasin',
      address: 'Avenue Houphouët-Boigny, Cocody',
      capacity: 200,
      occupied: 180,
      icon: Store,
      status: 'Actif'
    },
    { 
      id: 3, 
      name: 'Entrepôt Secondaire', 
      type: 'Entrepôt',
      address: 'Yopougon, Abidjan',
      capacity: 500,
      occupied: 320,
      icon: Package,
      status: 'Actif'
    },
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    emplacementId: number | null;
  }>({ isOpen: false, emplacementId: null });

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, emplacementId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.emplacementId) {
      setEmplacements(emplacements.filter(emp => emp.id !== deleteDialog.emplacementId));
    }
    setDeleteDialog({ isOpen: false, emplacementId: null });
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emplacements</h1>
          <p className="text-gray-600 mt-2">Organisation des zones physiques de stockage</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel emplacement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emplacements.map((emplacement) => {
          const occupancyPercentage = Math.round((emplacement.occupied / emplacement.capacity) * 100);
          
          return (
            <Card key={emplacement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <emplacement.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{emplacement.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {emplacement.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => handleDelete(emplacement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{emplacement.address}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Occupation</span>
                    <span className={getOccupancyColor(occupancyPercentage)}>
                      {emplacement.occupied}/{emplacement.capacity} ({occupancyPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        occupancyPercentage >= 90 ? 'bg-red-500' :
                        occupancyPercentage >= 75 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <Badge variant={emplacement.status === 'Actif' ? 'default' : 'secondary'}>
                  {emplacement.status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, emplacementId: null })}
        onConfirm={confirmDelete}
        title="Supprimer l'emplacement"
        description="Êtes-vous sûr de vouloir supprimer cet emplacement ? Cette action est irréversible."
      />
    </div>
  );
};

export default Emplacements;
