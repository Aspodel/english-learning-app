import React from 'react';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  useVocabularyCreateForm,
  vocabularyApi,
  VocabularyForm,
  type vocabularyFormSchemaType,
} from '@/features/vocabulary';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export function NewWord() {
  const [open, setOpen] = React.useState(false);

  const { form } = useVocabularyCreateForm();
  const { createMutation } = vocabularyApi.useCreate();

  const onSubmit = (data: vocabularyFormSchemaType) => {
    createMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast.success('Word created successfully');

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
      title='New Word'
      description='Type a new word and its meaning to your vocabulary.'
      trigger={
        <Button>
          <PlusIcon />
          Add Word
        </Button>
      }
      onCancel={() => form.reset()}
      formId='vocabulary-form'
    >
      <VocabularyForm form={form} onSubmit={onSubmit} />
    </ResponsiveDialog>
  );
}
