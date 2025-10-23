import React from 'react';
import { toast } from 'sonner';

import {
  useVocabularyEditForm,
  vocabularyApi,
  VocabularyForm,
  type vocabularyFormSchemaType,
} from '@/features/vocabulary';
import { ResponsiveDialog } from '@/components/responsive-dialog';

type EditWordDialogProps = {
  trigger: React.ReactNode;
  word: Vocabulary;
};

export function EditWordDialog({ trigger, word }: EditWordDialogProps) {
  const [open, setOpen] = React.useState(false);

  const { form } = useVocabularyEditForm(word);
  const { updateMutation } = vocabularyApi.useUpdate();

  const onSubmit = (data: vocabularyFormSchemaType) => {
    updateMutation.mutate(
      {
        data: {
          ...data,
          id: word.id,
        },
      },
      {
        onSuccess: () => {
          toast.success('Word updated successfully');

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
      title='Edit Word'
      description='Update the details of your vocabulary word below.'
      trigger={trigger}
      onCancel={() => form.reset()}
      formId='vocabulary-form'
      footerBtnText='Save Changes'
    >
      <VocabularyForm form={form} onSubmit={onSubmit} />
    </ResponsiveDialog>
  );
}
