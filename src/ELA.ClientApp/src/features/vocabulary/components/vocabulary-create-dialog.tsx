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
import { useQueryClient } from '@tanstack/react-query';

export function VocabularyCreateDialog() {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { form } = useVocabularyCreateForm();
  const { mutate: createVocab } = vocabularyApi.useCreate({
    onSuccess: () => {
      toast.success('Word created successfully');
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: vocabularyApi.keys.list({ pageSize: 100 }),
      });
    },
  });

  const onSubmit = (data: vocabularyFormSchemaType) => {
    createVocab({data});
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title='Add New Word'
      description='Fill out the form below to add a new word to your vocabulary.'
      trigger={
        <Button>
          <PlusIcon />
          Add Word
        </Button>
      }
      onCancel={() =>
        form.reset({
          text: '',
          ipa: '',
          definitions: [],
        })
      }
      formId='vocabulary-form'
    >
      <VocabularyForm form={form} onSubmit={onSubmit} />
    </ResponsiveDialog>
  );
}
