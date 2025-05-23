
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageOpen, Plus, Eye, CheckCircle, Clock, Package, Edit, Trash2 } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
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
import { useToast } from "@/components/ui/use-toast";

const Receptions: React.FC = () => {
  const { toast } = useToast();
  const [receptions, setReceptions] = useState([
    {
      id: 1,
      reference: 'REC-2024-001',
      fournisseur: 'Samsung Electronics CI',
      date: '2024-01-20',
      status: 'Réceptionné',
      items: [
        { product: 'Samsung Galaxy S24', quantity: 15, unitPrice: 450000 },
        { product: 'Samsung Galaxy Tab A9', quantity: 8, unitPrice: 180000 }
      ],
      total: 8190000,
      emplacement: 'Dépôt Principal'
    },
    {
      id: 2,
      reference: 'REC-2024-002',
      fournisseur: 'Apple Distribution',
      date: '2024-01-22',
      status: 'En attente',
      items: [
        { product: 'iPhone 15 Pro', quantity: 10, unitPrice: 650000 },
        { product: 'MacBook Air M3', quantity: 5, unitPrice: 850000 }
      ],
      total: 10750000,
      emplacement: 'Dépôt Principal'
    },
    {
      id: 3,
      reference: 'REC-2024-003',
      fournisseur: 'JBL Audio Pro',
      date: '2024-01-23',
      status: 'En cours',
      items: [
        { product: 'JBL Tune 760NC', quantity: 20, unitPrice: 45000 },
        { product: 'JBL Flip 6', quantity: 12, unitPrice: 75000 }
      ],
      total: 1800000,
      emplacement: 'Boutique Vitrine'
    }
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    receptionId: number | null;
  }>({ isOpen: false, receptionId: null });

  const [newReceptionDialog, setNewReceptionDialog] = useState(false);
  const [newReception, setNewReception] = useState({
    reference: '',
    fournisseur: '',
    date: new Date().toISOString().split('T')[0],
    status: 'En attente',
    emplacement: 'Dépôt Principal',
    productName: '',
    quantity: 1,
    unitPrice: 0
  });

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, receptionId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.receptionId) {
      setReceptions(receptions.filter(r => r.id !== deleteDialog.receptionId));
      toast({
        title: "Réception supprimée",
        description: "La réception a été supprimée avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, receptionId: null });
  };

  const handleAddReception = () => {
    if (!newReception.reference || !newReception.fournisseur || !newReception.productName) {
      toast({
        title: "Erreur",
        description: "Tous les champs marqués d'un * sont requis.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    const newId = Math.max(...receptions.map(r => r.id), 0) + 1;
    const newReceptionItem = {
      id: newId,
      reference: newReception.reference,
      fournisseur: newReception.fournisseur,
      date: newReception.date,
      status: newReception.status,
      items: [{
        product: newReception.productName,
        quantity: Number(newReception.quantity),
        unitPrice: Number(newReception.unitPrice)
      }],
      total: Number(newReception.quantity) * Number(newReception.unitPrice),
      emplacement: newReception.emplacement
    };

    setReceptions([...receptions, newReceptionItem]);
    
    setNewReception({
      reference: '',
      fournisseur: '',
      date: new Date().toISOString().split('T')[0],
      status: 'En attente',
      emplacement: 'Dépôt Principal',
      productName: '',
      quantity: 1,
      unitPrice: 0
    });
    
    setNewReceptionDialog(false);
    
    toast({
      title: "Réception ajoutée",
      description: "La nouvelle réception a été ajoutée avec succès.",
      duration: 3000
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Réceptionné': return <CheckCircle className="w-4 h-4" />;
      case 'En cours': return <Clock className="w-4 h-4" />;
      case 'En attente': return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Réceptionné': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Réceptions</h1>
          <p className="text-gray-600 mt-2">Saisie des nouvelles livraisons reçues (Samsung, Apple, JBL, etc.)</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600" onClick={() => setNewReceptionDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle réception
        </Button>
      </div>

      <div className="grid gap-6">
        {receptions.map((reception) => (
          <Card key={reception.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <PackageOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{reception.reference}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {reception.fournisseur} • {new Date(reception.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(reception.status)}>
                    {getStatusIcon(reception.status)}
                    <span className="ml-1">{reception.status}</span>
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(reception.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Articles reçus:</h4>
                  <div className="space-y-1">
                    {reception.items.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between">
                        <span>{item.product} x{item.quantity}</span>
                        <span className="text-gray-600">{formatCurrency(item.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      {formatCurrency(reception.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emplacement:</span>
                    <span className="text-gray-600">{reception.emplacement}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Articles:</span>
                    <span className="text-gray-600">
                      {reception.items.reduce((sum, item) => sum + item.quantity, 0)} unités
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, receptionId: null })}
        onConfirm={confirmDelete}
        title="Supprimer la réception"
        description="Êtes-vous sûr de vouloir supprimer cette réception ? Cette action est irréversible."
      />

      <Dialog open={newReceptionDialog} onOpenChange={setNewReceptionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle réception</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">
                Référence *
              </Label>
              <Input
                id="reference"
                value={newReception.reference}
                onChange={(e) => setNewReception({...newReception, reference: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fournisseur" className="text-right">
                Fournisseur *
              </Label>
              <Input
                id="fournisseur"
                value={newReception.fournisseur}
                onChange={(e) => setNewReception({...newReception, fournisseur: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newReception.date}
                onChange={(e) => setNewReception({...newReception, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select 
                value={newReception.status} 
                onValueChange={(value) => setNewReception({...newReception, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Réceptionné">Réceptionné</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emplacement" className="text-right">
                Emplacement
              </Label>
              <Select 
                value={newReception.emplacement} 
                onValueChange={(value) => setNewReception({...newReception, emplacement: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dépôt Principal">Dépôt Principal</SelectItem>
                  <SelectItem value="Boutique Vitrine">Boutique Vitrine</SelectItem>
                  <SelectItem value="Entrepôt Secondaire">Entrepôt Secondaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-2">
              <h3 className="font-medium mb-2">Produit</h3>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Nom *
              </Label>
              <Input
                id="productName"
                value={newReception.productName}
                onChange={(e) => setNewReception({...newReception, productName: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantité
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newReception.quantity}
                onChange={(e) => setNewReception({...newReception, quantity: Number(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unitPrice" className="text-right">
                Prix unitaire
              </Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                value={newReception.unitPrice}
                onChange={(e) => setNewReception({...newReception, unitPrice: Number(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReceptionDialog(false)}>Annuler</Button>
            <Button onClick={handleAddReception}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Receptions;
