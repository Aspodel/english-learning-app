import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cards: z.array(z.number()).optional(),
});

export type deckFormSchemaType = z.infer<typeof formSchema>;

export function useDeckCreateForm() {
  const initialValues = {
    name: '',
  };

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return { form };
}

export function useDeckEditForm(deck: Deck) {
  const initialValues = React.useMemo(
    () => ({
      name: deck.name,
      cards: deck.cards.map((card) => card.id),
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
