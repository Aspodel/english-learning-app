import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DeckDto } from '../api/type';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(250, 'Name must not exceed 250 characters'),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
});

export type deckFormSchemaType = z.infer<typeof formSchema>;

export function useDeckCreateForm() {
  const initialValues: deckFormSchemaType = {
    name: '',
  };

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return { form };
}

export function useDeckEditForm(deck: DeckDto) {
  const initialValues: deckFormSchemaType = React.useMemo(
    () => ({
      name: deck.name,
      description: deck.description,
    }),
    [deck]
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
