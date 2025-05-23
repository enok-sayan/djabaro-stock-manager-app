
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';

const Societe: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'DJABARO SARL',
    email: 'contact@djabaro.ci',
    phone: '21 22 23 24 25',
    address: 'Zone Industrielle, Abidjan, Côte d\'Ivoire',
    website: 'www.djabaro.ci',
    siret: '123456789',
    tva: 'CI123456789',
    capital: '5000000',
    director: 'M. DJABARO Kouassi',
    activity: 'Commerce d\'articles électroniques'
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Informations sauvegardées:', companyInfo);
    // Ici vous pouvez ajouter la logique de sauvegarde
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Société</h1>
          <p className="text-gray-600 mt-2">Paramètres globaux de l'entreprise Djabaro</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-600">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom de la société</Label>
              <Input
                id="name"
                value={companyInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="director">Directeur</Label>
              <Input
                id="director"
                value={companyInfo.director}
                onChange={(e) => handleInputChange('director', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="activity">Activité</Label>
              <Input
                id="activity"
                value={companyInfo.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="capital">Capital (XOF)</Label>
              <Input
                id="capital"
                type="number"
                value={companyInfo.capital}
                onChange={(e) => handleInputChange('capital', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={companyInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="website">Site web</Label>
              <Input
                id="website"
                value={companyInfo.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={companyInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Informations légales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siret">SIRET</Label>
              <Input
                id="siret"
                value={companyInfo.siret}
                onChange={(e) => handleInputChange('siret', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tva">Numéro TVA</Label>
              <Input
                id="tva"
                value={companyInfo.tva}
                onChange={(e) => handleInputChange('tva', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Societe;
