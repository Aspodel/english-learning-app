import React from 'react';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  deckApi,
  DeckForm,
  useDeckCreateForm,
  type deckFormSchemaType,
} from '@/features/flashcard';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export function NewDeck() {
  const [open, setOpen] = React.useState(false);

  const { form } = useDeckCreateForm();
  const { createMutation } = deckApi.useCreate();

  const onSubmit = (data: deckFormSchemaType) => {
    createMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast.success('Deck created successfully');

          setOpen(false);
          form.reset();
        },
      }
    );
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title='New Deck'
      description=' Create a new flashcard deck by entering its name and description.'
      trigger={
        <Button>
          <PlusIcon />
          Add Deck
        </Button>
      }
      onCancel={() => form.reset()}
      formId='deck-form'
    >
      <DeckForm form={form} onSubmit={onSubmit} />
    </ResponsiveDialog>
  );
}
