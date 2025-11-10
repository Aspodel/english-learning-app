import React from 'react';
import { toast } from 'sonner';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { EmptyComponent } from '@/components/empty-component';
import {
  vocabularyApi,
  VocabularyCard,
  VocabularyDetailsDialog,
  VocabularyEditDialog,
} from '@/features/vocabulary';

type VocabularyListProps = {
  items: Vocabulary[] | any[];
};

export const VocabularyList: React.FC<VocabularyListProps> = ({ items }) => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const { deleteMutation } = vocabularyApi.useDelete();
  const { updateMutation } = vocabularyApi.useUpdate();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          setDeletingId(null);
          toast.success('Word deleted successfully');
        },
      }
    );
  };

  const handleEdit = (id: number, data: any) => {
    updateMutation.mutate(
      {
        data: {
          ...data,
          id,
        },
      },
      {
        onSuccess: () => {
          setEditingId(null);
          toast.success('Word updated successfully');
        },
      }
    );
  };

  if (!items.length) {
    return (
      <EmptyComponent
        title='No Words Found'
        description='There are currently no words in your vocabulary list. Add new words to get started!'
        icon='📋'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 @md/main:grid-cols-2 @3xl/main:grid-cols-3 @5xl/main:grid-cols-4 @7xl/main:grid-cols-5'>
      {items.map((item) => (
        <VocabularyCard
          key={item.id}
          vocab={item}
          onSelect={() => setSelectedId(item.id)}
          onEdit={setEditingId}
          onDelete={setDeletingId}
        />
      ))}

      <VocabularyDetailsDialog
        id={selectedId!}
        onClose={() => setSelectedId(null)}
      />

      <VocabularyEditDialog
        id={editingId!}
        onSave={(vocab) => handleEdit(editingId!, vocab)}
        onCancel={() => setEditingId(null)}
        isPending={updateMutation.isPending}
      />

      <ConfirmDialog
        open={!!deletingId}
        onOpenChange={() => setDeletingId(null)}
        title='Confirm Delete'
        description='Are you sure you want to delete this word? This action cannot be undone.'
        onConfirm={() => handleDelete(deletingId!)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
