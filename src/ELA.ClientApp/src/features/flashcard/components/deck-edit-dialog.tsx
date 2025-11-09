import {
  useDeckEditForm,
  DeckForm,
  type deckFormSchemaType,
  type DeckListItemDto,
} from '@/features/flashcard';
import { ResponsiveDialog } from '@/components/responsive-dialog';

type DeckEditDialogProps = {
  deck: DeckListItemDto | null;
  onSave: (v: deckFormSchemaType) => void;
  onCancel: () => void;
  isPending: boolean;
};

export function DeckEditDialog({
  deck,
  onSave,
  onCancel,
  isPending,
}: DeckEditDialogProps) {
  if (!deck) return null;

  const { form } = useDeckEditForm(deck);

  return (
    <ResponsiveDialog
      open={!!deck}
      onOpenChange={(o) => !o && onCancel()}
      title='Edit Deck Information'
      description='Update the details of your deck below.'
      onCancel={() => form.reset()}
      formId='deck-form'
      footerBtnText='Save Changes'
      loading={isPending}
    >
      <DeckForm form={form} onSubmit={onSave} />
    </ResponsiveDialog>
  );
}
