
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Download, Upload, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Sauvegarde: React.FC = () => {
  const [sauvegardes] = useState([
    {
      id: 1,
      nom: 'sauvegarde_auto_20240120.sql',
      type: 'Automatique',
      date: '2024-01-20T02:00:00',
      taille: '156 MB',
      status: 'Complète',
      description: 'Sauvegarde automatique quotidienne'
    },
    {
      id: 2,
      nom: 'sauvegarde_manuelle_20240118.sql',
      type: 'Manuelle',
      date: '2024-01-18T14:30:00',
      taille: '152 MB',
      status: 'Complète',
      description: 'Sauvegarde avant mise à jour système'
    },
    {
      id: 3,
      nom: 'sauvegarde_auto_20240119.sql',
      type: 'Automatique',
      date: '2024-01-19T02:00:00',
      taille: '154 MB',
      status: 'Complète',
      description: 'Sauvegarde automatique quotidienne'
    }
  ]);

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    // Simulation d'une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBackingUp(false);
    console.log('Sauvegarde terminée');
  };

  const handleRestore = async (filename: string) => {
    setIsRestoring(true);
    // Simulation d'une restauration
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsRestoring(false);
    console.log(`Restauration de ${filename} terminée`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complète': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En cours': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Erreur': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complète': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Erreur': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Automatique' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sauvegarde BD</h1>
          <p className="text-gray-600 mt-2">Sauvegarde et restauration de la base de données</p>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Nouvelle sauvegarde</h3>
            <p className="text-sm text-gray-600 mb-4">Créer une sauvegarde manuelle immédiate</p>
            <Button 
              onClick={handleBackup}
              disabled={isBackingUp}
              className="w-full"
            >
              {isBackingUp ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Importer sauvegarde</h3>
            <p className="text-sm text-gray-600 mb-4">Télécharger un fichier de sauvegarde</p>
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Importer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Configuration auto</h3>
            <p className="text-sm text-gray-600 mb-4">Paramétrer les sauvegardes automatiques</p>
            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Configurer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informations système */}
      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">3.2 GB</p>
              <p className="text-sm text-gray-600">Taille de la base</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">462 MB</p>
              <p className="text-sm text-gray-600">Dernière sauvegarde</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">Quotidienne</p>
              <p className="text-sm text-gray-600">Fréquence auto</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des sauvegardes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Historique des sauvegardes</h2>
        {sauvegardes.map((sauvegarde) => (
          <Card key={sauvegarde.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{sauvegarde.nom}</h3>
                    <p className="text-sm text-gray-600">{sauvegarde.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(sauvegarde.date).toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs text-gray-500">Taille: {sauvegarde.taille}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(sauvegarde.type)}>
                    {sauvegarde.type}
                  </Badge>
                  <Badge className={getStatusColor(sauvegarde.status)}>
                    {getStatusIcon(sauvegarde.status)}
                    <span className="ml-1">{sauvegarde.status}</span>
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRestore(sauvegarde.nom)}
                      disabled={isRestoring}
                    >
                      {isRestoring ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      Restaurer
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

export default Sauvegarde;
