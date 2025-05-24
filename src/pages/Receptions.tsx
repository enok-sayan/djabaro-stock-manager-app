
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageOpen, Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BorrowRequestForm from '@/components/BorrowRequestForm';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { BorrowRequest } from '@/types/database';

const Receptions: React.FC = () => {
  const { toast } = useToast();
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([
    {
      id: 1,
      user_id: 2,
      material_id: 1,
      request_date: '2024-01-20T10:30:00Z',
      start_date: '2024-01-25T09:00:00Z',
      end_date: '2024-01-30T17:00:00Z',
      status: 'PENDING',
      purpose: 'Démonstration client',
      comments: 'Besoin urgent pour présentation',
      user: { id: 2, username: 'employe1', first_name: 'Jean', last_name: 'Kouassi' },
      material: { id: 1, name: 'iPhone 15 Pro Max', quantity: 25, available: true }
    },
    {
      id: 2,
      user_id: 3,
      material_id: 2,
      request_date: '2024-01-18T14:15:00Z',
      start_date: '2024-01-22T08:00:00Z',
      end_date: '2024-01-25T18:00:00Z',
      status: 'APPROVED',
      purpose: 'Test produit',
      comments: 'Validation technique nécessaire',
      user: { id: 3, username: 'manager1', first_name: 'Marie', last_name: 'Ouattara' },
      material: { id: 2, name: 'Samsung Galaxy S24 Ultra', quantity: 15, available: true }
    },
    {
      id: 3,
      user_id: 4,
      material_id: 3,
      request_date: '2024-01-15T11:45:00Z',
      start_date: '2024-01-20T09:00:00Z',
      end_date: '2024-01-28T17:00:00Z',
      status: 'RETURNED',
      purpose: 'Formation équipe',
      comments: 'Formation sur nouveau produit',
      user: { id: 4, username: 'client1', first_name: 'Ahmed', last_name: 'Traoré' },
      material: { id: 3, name: 'MacBook Pro M3', quantity: 8, available: true }
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedRequest, setSelectedRequest] = useState<BorrowRequest | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    requestId: number | null;
  }>({ isOpen: false, requestId: null });

  const handleCreate = () => {
    setFormMode('create');
    setSelectedRequest(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (request: BorrowRequest) => {
    setFormMode('edit');
    setSelectedRequest(request);
    setIsFormOpen(true);
  };

  const handleView = (request: BorrowRequest) => {
    toast({
      title: "Détails de la demande",
      description: `${request.user?.first_name} ${request.user?.last_name} - ${request.material?.name}`,
    });
  };

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, requestId: id });
  };

  const handleStatusChange = (id: number, newStatus: BorrowRequest['status']) => {
    setBorrowRequests(borrowRequests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
    
    const statusText = {
      'APPROVED': 'approuvée',
      'REJECTED': 'rejetée',
      'RETURNED': 'marquée comme retournée'
    };
    
    toast({
      title: "Statut mis à jour",
      description: `La demande a été ${statusText[newStatus]}.`,
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.requestId) {
      setBorrowRequests(borrowRequests.filter(r => r.id !== deleteDialog.requestId));
      toast({
        title: "Demande supprimée",
        description: "La demande d'emprunt a été supprimée avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, requestId: null });
  };

  const handleFormSubmit = (data: Omit<BorrowRequest, 'id'>) => {
    if (formMode === 'create') {
      const newRequest = {
        ...data,
        id: Math.max(...borrowRequests.map(r => r.id), 0) + 1,
      };
      setBorrowRequests([...borrowRequests, newRequest]);
      toast({
        title: "Demande créée",
        description: "La demande d'emprunt a été créée avec succès.",
      });
    } else if (selectedRequest) {
      setBorrowRequests(borrowRequests.map(request => 
        request.id === selectedRequest.id 
          ? { ...data, id: selectedRequest.id }
          : request
      ));
      toast({
        title: "Demande modifiée",
        description: "La demande d'emprunt a été mise à jour avec succès.",
      });
    }
    setIsFormOpen(false);
  };

  const getStatusColor = (status: BorrowRequest['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'RETURNED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: BorrowRequest['status']) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'APPROVED': return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      case 'RETURNED': return <PackageOpen className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demandes d'Emprunt</h1>
          <p className="text-gray-600 mt-2">Gestion des demandes d'emprunt de matériel</p>
        </div>
        <Button onClick={handleCreate} className="bg-primary hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle demande
        </Button>
      </div>

      <div className="grid gap-4">
        {borrowRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(request.status)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {request.user?.first_name} {request.user?.last_name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{request.material?.name}</p>
                    <p className="text-xs text-gray-500">
                      Demandé le {new Date(request.request_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleView(request)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(request)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => handleDelete(request.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Objet: {request.purpose}</p>
                {request.comments && (
                  <p className="text-sm text-gray-600 mt-1">{request.comments}</p>
                )}
              </div>
              
              {request.start_date && request.end_date && (
                <div className="text-sm text-gray-600">
                  <p>Période: {new Date(request.start_date).toLocaleDateString('fr-FR')} - {new Date(request.end_date).toLocaleDateString('fr-FR')}</p>
                </div>
              )}

              {request.status === 'PENDING' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-green-600 border-green-300"
                    onClick={() => handleStatusChange(request.id, 'APPROVED')}
                  >
                    Approuver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-300"
                    onClick={() => handleStatusChange(request.id, 'REJECTED')}
                  >
                    Rejeter
                  </Button>
                </div>
              )}

              {request.status === 'APPROVED' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                  onClick={() => handleStatusChange(request.id, 'RETURNED')}
                >
                  Marquer comme retourné
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <BorrowRequestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        request={selectedRequest}
        mode={formMode}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, requestId: null })}
        onConfirm={confirmDelete}
        title="Supprimer la demande"
        description="Êtes-vous sûr de vouloir supprimer cette demande d'emprunt ? Cette action est irréversible."
      />
    </div>
  );
};

export default Receptions;
