
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Warehouse, Store, Archive } from 'lucide-react';

const Emplacements: React.FC = () => {
  const emplacements = [
    {
      id: 1,
      name: 'Dépôt Principal',
      description: 'Entrepôt principal pour le stockage en gros',
      icon: Warehouse,
      capacity: 5000,
      occupied: 3750,
      address: 'Zone Industrielle, Abidjan'
    },
    {
      id: 2,
      name: 'Boutique Vitrine',
      description: 'Magasin de vente au détail',
      icon: Store,
      capacity: 800,
      occupied: 650,
      address: 'Plateau, Abidjan'
    },
    {
      id: 3,
      name: 'Entrepôt Secondaire',
      description: 'Stock de sécurité et overflow',
      icon: Archive,
      capacity: 2000,
      occupied: 1200,
      address: 'Yopougon, Abidjan'
    }
  ];

  const getOccupancyColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emplacements</h1>
          <p className="text-gray-600 mt-2">Organisation des zones physiques de stockage</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          {emplacements.length} emplacements
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emplacements.map((emplacement) => {
          const occupancyPercentage = (emplacement.occupied / emplacement.capacity) * 100;
          
          return (
            <Card key={emplacement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <emplacement.icon className="h-8 w-8 text-primary" />
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{emplacement.name}</CardTitle>
                <CardDescription>{emplacement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Adresse :</p>
                    <p className="text-sm font-medium">{emplacement.address}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Occupation</span>
                      <span className={getOccupancyColor(occupancyPercentage)}>
                        {occupancyPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${occupancyPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {emplacement.occupied} / {emplacement.capacity} articles
                    </p>
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

export default Emplacements;
