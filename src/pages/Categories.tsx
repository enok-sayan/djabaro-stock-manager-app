
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus, Edit, Trash2, Smartphone, Headphones, Laptop, Cable } from 'lucide-react';

const Categories: React.FC = () => {
  const [categories] = useState([
    { id: 1, name: 'Téléphones', description: 'Smartphones et téléphones portables', icon: Smartphone, count: 45 },
    { id: 2, name: 'Casques Audio', description: 'Casques et écouteurs de qualité', icon: Headphones, count: 32 },
    { id: 3, name: 'Ordinateurs', description: 'Ordinateurs portables et accessoires', icon: Laptop, count: 18 },
    { id: 4, name: 'Accessoires', description: 'Câbles, chargeurs et étuis', icon: Cable, count: 67 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-2">Gestion des différentes familles de produits électroniques</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600">{category.count} produits</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
