
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Plus, Edit, Trash2, Phone, Mail, MapPin, Eye } from 'lucide-react';
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

const Clients: React.FC = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState([
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

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    clientId: number | null;
  }>({ isOpen: false, clientId: null });

  const [newClientDialog, setNewClientDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Particulier',
    status: 'Actif'
  });

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, clientId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.clientId) {
      setClients(clients.filter(client => client.id !== deleteDialog.clientId));
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, clientId: null });
  };

  const handleAddClient = () => {
    if (newClient.name.trim() === '' || newClient.email.trim() === '') {
      toast({
        title: "Erreur",
        description: "Le nom et l'email du client sont requis.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    const newId = Math.max(...clients.map(c => c.id), 0) + 1;
    setClients([...clients, {
      id: newId,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      type: newClient.type,
      totalPurchases: 0,
      lastPurchase: new Date().toISOString().split('T')[0],
      status: newClient.status
    }]);
    
    setNewClient({
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'Particulier',
      status: 'Actif'
    });
    
    setNewClientDialog(false);
    
    toast({
      title: "Client ajouté",
      description: "Le nouveau client a été ajouté avec succès.",
      duration: 3000
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Gestion de la clientèle Djabaro</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600" onClick={() => setNewClientDialog(true)}>
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
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, clientId: null })}
        onConfirm={confirmDelete}
        title="Supprimer le client"
        description="Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible."
      />

      <Dialog open={newClientDialog} onOpenChange={setNewClientDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau client</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adresse
              </Label>
              <Input
                id="address"
                value={newClient.address}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select 
                value={newClient.type} 
                onValueChange={(value) => setNewClient({...newClient, type: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Particulier">Particulier</SelectItem>
                  <SelectItem value="Professionnel">Professionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select 
                value={newClient.status} 
                onValueChange={(value) => setNewClient({...newClient, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewClientDialog(false)}>Annuler</Button>
            <Button onClick={handleAddClient}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
