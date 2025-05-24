
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SupplierForm from '@/components/SupplierForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { Supplier } from '@/types/database';

const Fournisseurs: React.FC = () => {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: 'TechSupply SARL',
      contact_person: 'Jean Kouassi',
      phone: '+225 27 20 30 40 50',
      email: 'contact@techsupply.ci',
      address: 'Zone Industrielle Yopougon, Abidjan'
    },
    {
      id: 2,
      name: 'ElectroDistrib',
      contact_person: 'Marie Ouattara',
      phone: '+225 25 22 33 44 55',
      email: 'info@electrodistrib.ci',
      address: 'Plateau, Abidjan'
    },
    {
      id: 3,
      name: 'Global Electronics',
      contact_person: 'Ahmed Traoré',
      phone: '+225 07 08 09 10 11',
      email: 'sales@globalelec.ci',
      address: 'Marcory, Abidjan'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    supplierId: number | null;
  }>({ isOpen: false, supplierId: null });

  const handleCreate = () => {
    setFormMode('create');
    setSelectedSupplier(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setFormMode('edit');
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleView = (supplier: Supplier) => {
    toast({
      title: "Détails du fournisseur",
      description: `${supplier.name} - Contact: ${supplier.contact_person}`,
    });
  };

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, supplierId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.supplierId) {
      setSuppliers(suppliers.filter(s => s.id !== deleteDialog.supplierId));
      toast({
        title: "Fournisseur supprimé",
        description: "Le fournisseur a été supprimé avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, supplierId: null });
  };

  const handleFormSubmit = (data: Omit<Supplier, 'id'>) => {
    if (formMode === 'create') {
      const newSupplier = {
        ...data,
        id: Math.max(...suppliers.map(s => s.id), 0) + 1,
      };
      setSuppliers([...suppliers, newSupplier]);
      toast({
        title: "Fournisseur créé",
        description: `${data.name} a été ajouté avec succès.`,
      });
    } else if (selectedSupplier) {
      setSuppliers(suppliers.map(supplier => 
        supplier.id === selectedSupplier.id 
          ? { ...data, id: selectedSupplier.id }
          : supplier
      ));
      toast({
        title: "Fournisseur modifié",
        description: `${data.name} a été mis à jour avec succès.`,
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fournisseurs</h1>
          <p className="text-gray-600 mt-2">Gestion des fournisseurs et partenaires commerciaux</p>
        </div>
        <Button onClick={handleCreate} className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau fournisseur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <p className="text-sm text-gray-600">{supplier.contact_person}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(supplier)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(supplier)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600"
                    onClick={() => handleDelete(supplier.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {supplier.phone && (
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{supplier.phone}</span>
                </div>
              )}
              {supplier.email && (
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{supplier.email}</span>
                </div>
              )}
              {supplier.address && (
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="line-clamp-2">{supplier.address}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <SupplierForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        supplier={selectedSupplier}
        mode={formMode}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, supplierId: null })}
        onConfirm={confirmDelete}
        title="Supprimer le fournisseur"
        description="Êtes-vous sûr de vouloir supprimer ce fournisseur ? Cette action est irréversible."
      />
    </div>
  );
};

export default Fournisseurs;
