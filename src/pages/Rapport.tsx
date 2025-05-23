
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, BarChart3, TrendingUp, Package } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Rapport: React.FC = () => {
  const { toast } = useToast();
  const [rapports, setRapports] = useState([
    {
      id: 1,
      type: 'Ventes mensuel',
      periode: 'Janvier 2024',
      dateGeneration: '2024-02-01',
      taille: '2.4 MB',
      status: 'Généré',
      description: 'Rapport détaillé des ventes du mois de janvier'
    },
    {
      id: 2,
      type: 'Stock critique',
      periode: 'Semaine 4',
      dateGeneration: '2024-01-28',
      taille: '1.2 MB',
      status: 'Généré',
      description: 'Liste des produits en rupture ou proche de la rupture'
    },
    {
      id: 3,
      type: 'Performance fournisseurs',
      periode: 'T4 2023',
      dateGeneration: '2024-01-15',
      taille: '3.1 MB',
      status: 'Généré',
      description: 'Évaluation des fournisseurs sur le dernier trimestre'
    }
  ]);

  const [stats] = useState({
    totalRapports: 15,
    rapportsGeneresCeMois: 8,
    tailleTotal: '45.2 MB',
    dernierRapport: '2024-01-28'
  });

  const generateReport = (type: string) => {
    console.log(`Génération du rapport: ${type}`);
    
    const newDate = new Date();
    const formattedDate = newDate.toISOString();
    
    const newReport = {
      id: Math.max(...rapports.map(r => r.id), 0) + 1,
      type: type === 'ventes' ? 'Ventes mensuel' : 
            type === 'stock' ? 'Stock critique' : 'Performance fournisseurs',
      periode: newDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      dateGeneration: formattedDate,
      taille: `${Math.random() * 3 + 0.5}.${Math.floor(Math.random() * 9)}`,
      status: 'Généré',
      description: type === 'ventes' ? 'Rapport détaillé des ventes du mois' : 
                  type === 'stock' ? 'Liste des produits en rupture ou proche de la rupture' :
                  'Évaluation des fournisseurs sur la période'
    };
    
    setRapports([newReport, ...rapports]);
    
    toast({
      title: "Rapport généré",
      description: `Le rapport de ${newReport.type} a été généré avec succès.`,
      duration: 3000
    });
  };

  const handleDownload = (reportId: number) => {
    const report = rapports.find(r => r.id === reportId);
    if (!report) return;
    
    toast({
      title: "Téléchargement démarré",
      description: `Le rapport ${report.type} est en cours de téléchargement.`,
      duration: 3000
    });
    
    // Simulation de téléchargement pour l'exemple
    const dummyLink = document.createElement('a');
    dummyLink.setAttribute('download', `rapport_${report.type.toLowerCase().replace(' ', '_')}_${report.periode.toLowerCase().replace(' ', '_')}.pdf`);
    dummyLink.setAttribute('href', 'data:application/pdf;charset=utf-8,');
    dummyLink.style.display = 'none';
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
          <p className="text-gray-600 mt-2">Génération automatique de rapports périodiques</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Rapports</p>
                <p className="text-2xl font-bold">{stats.totalRapports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ce mois</p>
                <p className="text-2xl font-bold">{stats.rapportsGeneresCeMois}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taille totale</p>
                <p className="text-2xl font-bold">{stats.tailleTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernier rapport</p>
                <p className="text-lg font-bold">
                  {new Date(stats.dernierRapport).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Génération rapide */}
      <Card>
        <CardHeader>
          <CardTitle>Génération rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => generateReport('ventes')}
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              Rapport de ventes
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => generateReport('stock')}
            >
              <Package className="w-6 h-6 mb-2" />
              État du stock
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => generateReport('fournisseurs')}
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              Performance fournisseurs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des rapports */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Rapports générés</h2>
        {rapports.map((rapport) => (
          <Card key={rapport.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{rapport.type}</h3>
                    <p className="text-sm text-gray-600">{rapport.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">Période: {rapport.periode}</span>
                      <span className="text-xs text-gray-500">Taille: {rapport.taille}</span>
                      <span className="text-xs text-gray-500">
                        Généré le {new Date(rapport.dateGeneration).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="default">{rapport.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(rapport.id)}>
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rapport;
