import React from 'react';
import { toast } from 'sonner';

import { EmptyComponent } from '@/components/empty-component';
import {
  deckApi,
  DeckCard,
  DeckEditDialog,
  type DeckListItemDto,
} from '@/features/flashcard';
import { ConfirmDialog } from '@/components/confirm-dialog';

type DeckListProps = {
  items: DeckListItemDto[];
};

export const DeckList: React.FC<DeckListProps> = ({ items }) => {
  const [editing, setEditing] = React.useState<DeckListItemDto | null>(null);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const { updateMutation } = deckApi.useUpdate();
  const { deleteMutation } = deckApi.useDelete();

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
          setEditing(null);
          toast.success('Word updated successfully');
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          setDeletingId(null);
          toast.success('Deck deleted successfully');
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <EmptyComponent
        title='No Decks Yet'
        description='Create a new deck to start studying flashcards!'
        icon='📚'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {items.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onEdit={() => setEditing(deck)}
          onDelete={() => setDeletingId(deck.id)}
        />
      ))}

      <DeckEditDialog
        deck={editing!}
        onSave={(deck) => handleEdit(editing!.id, deck)}
        onCancel={() => setEditing(null)}
        isPending={updateMutation.isPending}
      />

      <ConfirmDialog
        open={!!deletingId}
        onOpenChange={() => setDeletingId(null)}
        title='Confirm Delete'
        description='Are you sure you want to delete this deck? All associated flashcards will also be deleted. This action cannot be undone.'
        onConfirm={() => handleDelete(deletingId!)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
