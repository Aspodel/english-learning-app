import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  text: z.string().min(1, 'Text is required').max(200, 'Text must not exceed 200 characters'),
  ipa: z.string().max(200, 'IPA must not exceed 200 characters').optional(),
});

export type vocabularyFormSchemaType = z.infer<typeof formSchema>;

export function useVocabularyCreateForm() {
  const initialValues: vocabularyFormSchemaType = {
    text: '',
    ipa: '',
  };

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return { form };
}

export function useVocabularyEditForm(vocabulary: Vocabulary) {
  const initialValues = React.useMemo(
    () => ({
      text: vocabulary.text,
      ipa: vocabulary.ipa,
      definitions: vocabulary.definitions,
    }),
    [vocabulary]
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  return { form };
}
