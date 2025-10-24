import React from 'react';
import { toast } from 'sonner';

import {
  useDeckEditForm,
  deckApi,
  DeckForm,
  type deckFormSchemaType,
  type DeckDto,
} from '@/features/flashcard';
import { ResponsiveDialog } from '@/components/responsive-dialog';

type EditDeckDialogProps = {
  deck: DeckDto & { id: number };
  trigger: React.ReactNode;
};

export function EditDeckDialog({ trigger, deck }: EditDeckDialogProps) {
  const [open, setOpen] = React.useState(false);

  const { form } = useDeckEditForm(deck);
  const { updateMutation } = deckApi.useUpdate();

  const onSubmit = (data: deckFormSchemaType) => {
    updateMutation.mutate(
      {
        data: {
          id: deck.id,
          ...data,
        },
      },
      {
        onSuccess: () => {
          toast.success('Deck updated successfully');

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
      title='Edit Deck Information'
      description='Update the details of your deck below.'
      trigger={trigger}
      onCancel={() => form.reset()}
      formId='deck-form'
      footerBtnText='Save Changes'
    >
      <DeckForm form={form} onSubmit={onSubmit} />
    </ResponsiveDialog>
  );
}
