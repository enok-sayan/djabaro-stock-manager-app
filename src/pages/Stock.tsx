
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2, Eye, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import MaterialForm from '@/components/MaterialForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { Material } from '@/types/database';

const Stock: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone Apple dernière génération',
      serial_number: 'APL001234567',
      quantity: 25,
      available: true,
      purchase_date: '2024-01-15',
      purchase_price: 850000,
      category: { id: 1, name: 'Téléphones' },
      status: { id: 1, name: 'Neuf' },
      supplier: { id: 1, name: 'TechSupply SARL' },
      manufacturer: { id: 1, name: 'Apple', country: 'USA' }
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone Samsung haut de gamme',
      serial_number: 'SAM998877665',
      quantity: 15,
      available: true,
      purchase_date: '2024-02-10',
      purchase_price: 780000,
      category: { id: 1, name: 'Téléphones' },
      status: { id: 1, name: 'Neuf' },
      supplier: { id: 2, name: 'ElectroDistrib' },
      manufacturer: { id: 2, name: 'Samsung', country: 'Corée du Sud' }
    },
    {
      id: 3,
      name: 'MacBook Pro M3',
      description: 'Ordinateur portable Apple avec puce M3',
      serial_number: 'MAC2024001',
      quantity: 8,
      available: true,
      purchase_date: '2024-03-05',
      purchase_price: 1200000,
      category: { id: 3, name: 'Ordinateurs' },
      status: { id: 1, name: 'Neuf' },
      supplier: { id: 1, name: 'TechSupply SARL' },
      manufacturer: { id: 1, name: 'Apple', country: 'USA' }
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    materialId: number | null;
  }>({ isOpen: false, materialId: null });

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setFormMode('create');
    setSelectedMaterial(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (material: Material) => {
    setFormMode('edit');
    setSelectedMaterial(material);
    setIsFormOpen(true);
  };

  const handleView = (material: Material) => {
    toast({
      title: "Détails du matériel",
      description: `${material.name} - Quantité: ${material.quantity}`,
    });
  };

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, materialId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.materialId) {
      setMaterials(materials.filter(m => m.id !== deleteDialog.materialId));
      toast({
        title: "Matériel supprimé",
        description: "Le matériel a été supprimé avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, materialId: null });
  };

  const handleExport = () => {
    const csvData = materials.map(material => ({
      Nom: material.name,
      'Numéro de série': material.serial_number || '',
      Quantité: material.quantity,
      'Prix d\'achat': material.purchase_price || '',
      Catégorie: material.category?.name || '',
      Statut: material.status?.name || '',
      Fournisseur: material.supplier?.name || '',
      Fabricant: material.manufacturer?.name || ''
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(';'),
      ...csvData.map(row => Object.values(row).join(';'))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `stock_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export réussi",
      description: "Les données de stock ont été exportées avec succès.",
    });
  };

  const handleFormSubmit = (data: Omit<Material, 'id'>) => {
    if (formMode === 'create') {
      const newMaterial = {
        ...data,
        id: Math.max(...materials.map(m => m.id), 0) + 1,
      };
      setMaterials([...materials, newMaterial]);
      toast({
        title: "Matériel créé",
        description: `${data.name} a été ajouté avec succès.`,
      });
    } else if (selectedMaterial) {
      setMaterials(materials.map(material => 
        material.id === selectedMaterial.id 
          ? { ...data, id: selectedMaterial.id }
          : material
      ));
      toast({
        title: "Matériel modifié",
        description: `${data.name} a été mis à jour avec succès.`,
      });
    }
    setIsFormOpen(false);
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'neuf': return 'bg-green-100 text-green-800';
      case 'bon': return 'bg-blue-100 text-blue-800';
      case 'usagé': return 'bg-yellow-100 text-yellow-800';
      case 'défectueux': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">État de Stock</h1>
          <p className="text-gray-600 mt-2">Gestion de l'inventaire des matériels électroniques</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau matériel
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Rechercher par nom, numéro de série ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    <p className="text-sm text-gray-600">Qté: {material.quantity}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(material)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(material)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600"
                    onClick={() => handleDelete(material.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
              {material.serial_number && (
                <p className="text-xs font-mono text-gray-500">SN: {material.serial_number}</p>
              )}
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(material.status?.name)}>
                  {material.status?.name || 'Non défini'}
                </Badge>
                <span className="text-sm font-semibold text-green-600">
                  {material.purchase_price?.toLocaleString()} XOF
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <p>Catégorie: {material.category?.name}</p>
                <p>Fournisseur: {material.supplier?.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MaterialForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        material={selectedMaterial}
        mode={formMode}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, materialId: null })}
        onConfirm={confirmDelete}
        title="Supprimer le matériel"
        description="Êtes-vous sûr de vouloir supprimer ce matériel ? Cette action est irréversible."
      />
    </div>
  );
};

export default Stock;
