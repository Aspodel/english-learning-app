import { toast } from 'sonner';

import {
  useVocabularyEditForm,
  vocabularyApi,
  VocabularyForm,
  type vocabularyFormSchemaType,
} from '@/features/vocabulary';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Loading } from '@/components/common/loading';

type VocabularyEditDialogProps = {
  id: number | null;
  onSave: (v: vocabularyFormSchemaType) => void;
  onCancel: () => void;
  isPending: boolean;
};

export function VocabularyEditDialog({
  id,
  onSave,
  onCancel,
  isPending,
}: VocabularyEditDialogProps) {
  if (!id) return null;

  const { data: vocab, isLoading } = vocabularyApi.useGet({ id });
  const { form } = useVocabularyEditForm(vocab);

  if (isPending) {
    toast.info('Updating word...');
  }

  return (
    <ResponsiveDialog
      open={!!id}
      onOpenChange={(o) => !o && onCancel()}
      title='Edit Word'
      description='Make changes to the word details below.'
      onCancel={() => form.reset()}
      formId='vocabulary-form'
      footerBtnText='Save Changes'
      loading={isPending || isLoading}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <VocabularyForm form={form} onSubmit={onSave} />
      )}
    </ResponsiveDialog>
  );
}
