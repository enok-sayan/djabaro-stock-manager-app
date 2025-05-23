
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Headphones, Phone, Laptop, Cable, Gamepad2 } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    { 
      id: 1, 
      name: 'Téléphones portables', 
      description: 'Smartphones et téléphones mobiles',
      icon: Phone,
      count: 156,
      brands: ['Samsung', 'Apple', 'Huawei', 'Xiaomi']
    },
    { 
      id: 2, 
      name: 'Casques audio', 
      description: 'Casques filaires et sans fil',
      icon: Headphones,
      count: 89,
      brands: ['JBL', 'Sony', 'Beats', 'Bose']
    },
    { 
      id: 3, 
      name: 'Écouteurs', 
      description: 'Écouteurs intra-auriculaires et oreillettes',
      icon: Headphones,
      count: 134,
      brands: ['Apple', 'Samsung', 'Sony', 'JBL']
    },
    { 
      id: 4, 
      name: 'Ordinateurs portables', 
      description: 'Laptops et ultrabooks',
      icon: Laptop,
      count: 45,
      brands: ['HP', 'Dell', 'Lenovo', 'Asus']
    },
    { 
      id: 5, 
      name: 'Accessoires électroniques', 
      description: 'Câbles, chargeurs, étuis et autres accessoires',
      icon: Cable,
      count: 267,
      brands: ['Anker', 'Belkin', 'Ugreen', 'Aukey']
    },
    { 
      id: 6, 
      name: 'Accessoires gaming', 
      description: 'Manettes, claviers et souris gaming',
      icon: Gamepad2,
      count: 78,
      brands: ['Razer', 'Logitech', 'SteelSeries', 'Corsair']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-2">Gestion des différentes familles de produits électroniques</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          {categories.length} catégories
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <category.icon className="h-8 w-8 text-primary" />
                <Badge variant="secondary">{category.count} articles</Badge>
              </div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Marques principales :</p>
                <div className="flex flex-wrap gap-1">
                  {category.brands.map((brand) => (
                    <Badge key={brand} variant="outline" className="text-xs">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
