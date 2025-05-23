
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';

const Clients: React.FC = () => {
  const [clients] = useState([
    {
      id: 1,
      name: 'Kouakou Jean',
      email: 'j.kouakou@email.com',
      phone: '07 07 07 07 07',
      address: 'Cocody, Abidjan',
      type: 'Particulier',
      totalPurchases: 850000,
      lastPurchase: '2024-01-15',
      status: 'Actif'
    },
    {
      id: 2,
      name: 'SARL TechPro CI',
      email: 'contact@techpro.ci',
      phone: '21 21 21 21 21',
      address: 'Plateau, Abidjan',
      type: 'Professionnel',
      totalPurchases: 2500000,
      lastPurchase: '2024-01-20',
      status: 'Actif'
    },
    {
      id: 3,
      name: 'Diabaté Marie',
      email: 'm.diabate@email.com',
      phone: '05 05 05 05 05',
      address: 'Yopougon, Abidjan',
      type: 'Particulier',
      totalPurchases: 320000,
      lastPurchase: '2023-12-10',
      status: 'Inactif'
    }
  ]);

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
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Gestion de la clientèle Djabaro</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {client.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {client.address}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{client.type}</Badge>
                      <span className="text-sm font-medium text-green-600">
                        Total: {formatCurrency(client.totalPurchases)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Dernier achat: {new Date(client.lastPurchase).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={client.status === 'Actif' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default Clients;
