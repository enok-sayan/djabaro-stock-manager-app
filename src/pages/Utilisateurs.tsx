
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';

const Utilisateurs: React.FC = () => {
  const users = [
    { id: 1, firstName: 'Admin', lastName: 'Djabaro', email: 'admin@djabaro.ci', role: 'Admin', status: 'Actif' },
    { id: 2, firstName: 'Employé', lastName: 'Djabaro', email: 'employe@djabaro.ci', role: 'Employé', status: 'Actif' },
    { id: 3, firstName: 'Manager', lastName: 'Djabaro', email: 'manager@djabaro.ci', role: 'Manager', status: 'Actif' },
    { id: 4, firstName: 'Client', lastName: 'Djabaro', email: 'client@djabaro.ci', role: 'Client', status: 'Actif' },
    { id: 5, firstName: 'Koffi', lastName: 'Assamoi', email: 'k.assamoi@djabaro.ci', role: 'Employé', status: 'Actif' },
    { id: 6, firstName: 'Aya', lastName: 'Kouassi', email: 'a.kouassi@djabaro.ci', role: 'Manager', status: 'Inactif' },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Employé': return 'bg-green-100 text-green-800';
      case 'Client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-2">Gestion des comptes utilisateurs et des rôles</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600">
          <UserPlus className="w-4 h-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === 'Actif' ? 'default' : 'secondary'}>
                    {user.status}
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

export default Utilisateurs;
