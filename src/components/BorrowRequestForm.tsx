
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BorrowRequest } from '@/types/database';

const borrowRequestSchema = z.object({
  user_id: z.number().min(1, 'L\'utilisateur est requis'),
  material_id: z.number().min(1, 'Le matériel est requis'),
  start_date: z.string().min(1, 'La date de début est requise'),
  end_date: z.string().min(1, 'La date de fin est requise'),
  purpose: z.string().min(1, 'L\'objet est requis'),
  comments: z.string().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'RETURNED']),
});

type BorrowRequestFormData = z.infer<typeof borrowRequestSchema>;

interface BorrowRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<BorrowRequest, 'id'>) => void;
  request?: BorrowRequest;
  mode: 'create' | 'edit';
}

const BorrowRequestForm: React.FC<BorrowRequestFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  request,
  mode
}) => {
  const form = useForm<BorrowRequestFormData>({
    resolver: zodResolver(borrowRequestSchema),
    defaultValues: {
      user_id: 1,
      material_id: 1,
      start_date: '',
      end_date: '',
      purpose: '',
      comments: '',
      status: 'PENDING',
    },
  });

  useEffect(() => {
    if (request && mode === 'edit') {
      form.reset({
        user_id: request.user_id,
        material_id: request.material_id,
        start_date: request.start_date ? request.start_date.split('T')[0] : '',
        end_date: request.end_date ? request.end_date.split('T')[0] : '',
        purpose: request.purpose || '',
        comments: request.comments || '',
        status: request.status,
      });
    } else {
      form.reset({
        user_id: 1,
        material_id: 1,
        start_date: '',
        end_date: '',
        purpose: '',
        comments: '',
        status: 'PENDING',
      });
    }
  }, [request, mode, form]);

  const handleSubmit = (data: BorrowRequestFormData) => {
    const submitData = {
      ...data,
      request_date: new Date().toISOString(),
      start_date: data.start_date ? new Date(data.start_date).toISOString() : undefined,
      end_date: data.end_date ? new Date(data.end_date).toISOString() : undefined,
    };
    onSubmit(submitData);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nouvelle demande d\'emprunt' : 'Modifier la demande'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Utilisateur *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="material_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Matériel *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objet de la demande *</FormLabel>
                  <FormControl>
                    <Input placeholder="Raison de l'emprunt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaires</FormLabel>
                  <FormControl>
                    <Input placeholder="Commentaires additionnels" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Créer' : 'Modifier'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowRequestForm;
