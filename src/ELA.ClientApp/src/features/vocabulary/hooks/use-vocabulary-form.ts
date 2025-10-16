import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  ipa: z.string().min(1, 'IPA is required'),
  userId: z.string().min(1, 'User ID is required'),
  definitions: z.array(
    z.object({
      partOfSpeech: z.string().min(1, 'Part of speech is required'),
      meaning: z.string().min(1, 'Meaning is required'),
      translation: z.string().min(1, 'Translation is required'),
      examples: z.array(
        z.object({
          text: z.string().min(1, 'Example text is required'),
          translation: z.string().min(1, 'Example translation is required'),
        })
      ),
    })
  ),
});

export type formSchemaType = z.infer<typeof formSchema>;

export function useVocabularyCreateForm() {
  const initialValues = {
    text: '',
    ipa: '',
    userId: '',
    definitions: [],
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
      userId: vocabulary.userId,
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
