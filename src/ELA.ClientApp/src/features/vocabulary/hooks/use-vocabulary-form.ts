import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PARTS_OF_SPEECH } from '@/features/vocabulary';

const formSchema = z.object({
  id: z.number().optional(),
  text: z
    .string()
    .min(1, 'Text is required')
    .max(200, 'Text must not exceed 200 characters'),
  ipa: z.string().max(200, 'IPA must not exceed 200 characters').optional(),
  definitions: z
    .array(
      z.object({
        meaning: z
          .string()
          .min(1, 'Meaning is required')
          .max(500, 'Meaning must not exceed 500 characters'),
        translation: z
          .string()
          .max(500, 'Translation must not exceed 500 characters')
          .optional(),
        partOfSpeech: z.enum(PARTS_OF_SPEECH).optional(),
        examples: z
          .array(
            z.object({
              text: z
                .string()
                .min(1, 'Example text is required')
                .max(500, 'Example text must not exceed 500 characters'),
              translation: z
                .string()
                .max(500, 'Example translation must not exceed 500 characters')
                .optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
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

export function useVocabularyEditForm(vocabulary?: Vocabulary) {
  const initialValues: vocabularyFormSchemaType = React.useMemo(
    () => ({
      id: vocabulary?.id,
      text: vocabulary?.text || '',
      ipa: vocabulary?.ipa || '',
      definitions: (vocabulary?.definitions || []).map((def) => ({
        ...def,
        translation: def.translation || '',
        partOfSpeech: def.partOfSpeech || undefined,
        examples: (def.examples || []).map((ex) => ({
          ...ex,
          translation: ex.translation || '',
        })),
      })),
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
