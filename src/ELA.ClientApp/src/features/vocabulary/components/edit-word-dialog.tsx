import { toast } from 'sonner';

import {
  useVocabularyEditForm,
  vocabularyApi,
  VocabularyForm,
  type vocabularyFormSchemaType,
} from '@/features/vocabulary';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Loading } from '@/components/common/loading';

type EditWordDialogProps = {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditWordDialog({
  id,
  open,
  onOpenChange,
}: EditWordDialogProps) {
  const { data: vocab, isLoading } = vocabularyApi.useGet({ id });
  const { updateMutation } = vocabularyApi.useUpdate();
  const { form } = useVocabularyEditForm(vocab);

  const onSubmit = (data: vocabularyFormSchemaType) => {
    updateMutation.mutate(
      {
        data: {
          ...data,
          id: id,
        },
      },
      {
        onSuccess: () => {
          toast.success('Word updated successfully');

          onOpenChange(false);
          form.reset();
        },
      }
    );
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Edit Word'
      description='Make changes to the word details below.'
      onCancel={() => form.reset()}
      formId='vocabulary-form'
      footerBtnText='Save Changes'
    >
      {isLoading ? (
        <Loading />
      ) : (
        <VocabularyForm form={form} onSubmit={onSubmit} />
      )}
    </ResponsiveDialog>
  );
}
