
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Download, Upload, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Sauvegarde: React.FC = () => {
  const { toast } = useToast();
  const [sauvegardes, setSauvegardes] = useState([
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
  const [configDialog, setConfigDialog] = useState(false);
  const [configValues, setConfigValues] = useState({
    frequency: 'quotidienne',
    time: '02:00',
    retention: '30'
  });

  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleBackup = async () => {
    setIsBackingUp(true);
    // Simulation d'une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newBackup = {
      id: Math.max(...sauvegardes.map(s => s.id), 0) + 1,
      nom: `sauvegarde_manuelle_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.sql`,
      type: 'Manuelle',
      date: new Date().toISOString(),
      taille: `${Math.floor(Math.random() * 50) + 140} MB`,
      status: 'Complète',
      description: 'Sauvegarde manuelle'
    };
    
    setSauvegardes([newBackup, ...sauvegardes]);
    setIsBackingUp(false);
    console.log('Sauvegarde terminée');
    
    toast({
      title: "Sauvegarde terminée",
      description: "La base de données a été sauvegardée avec succès.",
      duration: 3000
    });
  };

  const handleRestore = async (filename: string) => {
    setIsRestoring(true);
    // Simulation d'une restauration
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsRestoring(false);
    console.log(`Restauration de ${filename} terminée`);
    
    toast({
      title: "Restauration terminée",
      description: `La base de données a été restaurée à partir de ${filename}.`,
      duration: 3000
    });
  };

  const handleDownload = (backupId: number) => {
    const backup = sauvegardes.find(s => s.id === backupId);
    if (!backup) return;
    
    toast({
      title: "Téléchargement démarré",
      description: `La sauvegarde ${backup.nom} est en cours de téléchargement.`,
      duration: 3000
    });
    
    // Simulation de téléchargement
    const dummyLink = document.createElement('a');
    dummyLink.setAttribute('download', backup.nom);
    dummyLink.setAttribute('href', 'data:application/octet-stream;charset=utf-8,');
    dummyLink.style.display = 'none';
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  const handleConfigSave = () => {
    toast({
      title: "Configuration sauvegardée",
      description: `Les sauvegardes automatiques seront effectuées ${configValues.frequency} à ${configValues.time}.`,
      duration: 3000
    });
    setConfigDialog(false);
  };

  const handleUpload = () => {
    if (!uploadFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à importer.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    toast({
      title: "Fichier importé",
      description: `Le fichier ${uploadFile.name} a été importé avec succès.`,
      duration: 3000
    });
    
    // Ajouter la sauvegarde importée à la liste
    const newBackup = {
      id: Math.max(...sauvegardes.map(s => s.id), 0) + 1,
      nom: uploadFile.name,
      type: 'Importée',
      date: new Date().toISOString(),
      taille: `${Math.round(uploadFile.size / (1024 * 1024))} MB`,
      status: 'Complète',
      description: 'Sauvegarde importée manuellement'
    };
    
    setSauvegardes([newBackup, ...sauvegardes]);
    setUploadDialog(false);
    setUploadFile(null);
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
            <Button variant="outline" className="w-full" onClick={() => setUploadDialog(true)}>
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
            <Button variant="outline" className="w-full" onClick={() => setConfigDialog(true)}>
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
                    <Button variant="outline" size="sm" onClick={() => handleDownload(sauvegarde.id)}>
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

      {/* Configuration Dialog */}
      <Dialog open={configDialog} onOpenChange={setConfigDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configuration des sauvegardes automatiques</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Fréquence
              </Label>
              <Select 
                value={configValues.frequency} 
                onValueChange={(value) => setConfigValues({...configValues, frequency: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner la fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quotidienne">Quotidienne</SelectItem>
                  <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                  <SelectItem value="mensuelle">Mensuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Heure
              </Label>
              <Input
                id="time"
                type="time"
                value={configValues.time}
                onChange={(e) => setConfigValues({...configValues, time: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="retention" className="text-right">
                Rétention (jours)
              </Label>
              <Input
                id="retention"
                type="number"
                min="1"
                value={configValues.retention}
                onChange={(e) => setConfigValues({...configValues, retention: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialog(false)}>Annuler</Button>
            <Button onClick={handleConfigSave}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Importer une sauvegarde</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="file">Fichier de sauvegarde (.sql)</Label>
              <Input
                id="file"
                type="file"
                accept=".sql,.db"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadFile(e.target.files[0]);
                  }
                }}
              />
              {uploadFile && (
                <p className="text-sm text-gray-500">
                  Fichier sélectionné: {uploadFile.name} ({Math.round(uploadFile.size / 1024)} KB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialog(false)}>Annuler</Button>
            <Button onClick={handleUpload}>Importer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sauvegarde;
