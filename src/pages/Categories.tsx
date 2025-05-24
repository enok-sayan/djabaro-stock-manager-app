
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus, Edit, Trash2, Eye, Smartphone, Headphones, Laptop, Cable } from 'lucide-react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import CategoryForm from '@/components/CategoryForm';
import { useToast } from "@/hooks/use-toast";
import { Category } from '@/types/database';

const Categories: React.FC = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Téléphones', description: 'Smartphones et téléphones portables' },
    { id: 2, name: 'Casques Audio', description: 'Casques et écouteurs de qualité' },
    { id: 3, name: 'Ordinateurs', description: 'Ordinateurs portables et accessoires' },
    { id: 4, name: 'Accessoires', description: 'Câbles, chargeurs et étuis' },
  ]);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    categoryId: number | null;
  }>({ isOpen: false, categoryId: null });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const getIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('téléphone') || name.includes('phone')) return Smartphone;
    if (name.includes('casque') || name.includes('audio')) return Headphones;
    if (name.includes('ordinateur') || name.includes('laptop')) return Laptop;
    if (name.includes('accessoire') || name.includes('câble')) return Cable;
    return Package;
  };

  const handleCreate = () => {
    setFormMode('create');
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setFormMode('edit');
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleView = (category: Category) => {
    toast({
      title: "Détails de la catégorie",
      description: `${category.name}: ${category.description}`,
    });
  };

  const handleDelete = (id: number) => {
    setDeleteDialog({ isOpen: true, categoryId: id });
  };

  const confirmDelete = () => {
    if (deleteDialog.categoryId) {
      setCategories(categories.filter(cat => cat.id !== deleteDialog.categoryId));
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès.",
        duration: 3000
      });
    }
    setDeleteDialog({ isOpen: false, categoryId: null });
  };

  const handleFormSubmit = (data: Omit<Category, 'id'>) => {
    if (formMode === 'create') {
      const newCategory = {
        ...data,
        id: Math.max(...categories.map(c => c.id), 0) + 1,
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Catégorie créée",
        description: `${data.name} a été ajoutée avec succès.`,
      });
    } else if (selectedCategory) {
      setCategories(categories.map(category => 
        category.id === selectedCategory.id 
          ? { ...data, id: selectedCategory.id }
          : category
      ));
      toast({
        title: "Catégorie modifiée",
        description: `${data.name} a été mise à jour avec succès.`,
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-2">Gestion des différentes familles de produits électroniques</p>
        </div>
        <Button className="bg-primary hover:bg-primary-600" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = getIcon(category.name);
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleView(category)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        category={selectedCategory}
        mode={formMode}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, categoryId: null })}
        onConfirm={confirmDelete}
        title="Supprimer la catégorie"
        description="Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible."
      />
    </div>
  );
};

export default Categories;
