import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  front: z.string().min(1, 'Front is required'),
  back: z.string().min(1, 'Back is required'),
  easeFactor: z.number().min(1, 'Ease Factor must be at least 1').default(2.5),
  interval: z.number().min(0, 'Interval must be at least 0').default(0),
  repetition: z.number().min(0, 'Repetition must be at least 0').default(0),
  nextReview: z.string().min(1, 'Next Review is required'),
  lastReview: z.string().optional(),
  suspended: z.boolean().default(false),
  reviewLogs: z.array(z.number()).optional(),
});

export type flashCardFormSchemaType = z.infer<typeof formSchema>;

export function useFlashCardCreateForm() {
  const initialValues = {
    front: '',
    back: '',
    easeFactor: 2.5,
    interval: 0,
    repetition: 0,
    nextReview: '',
    lastReview: undefined,
    suspended: false,
    reviewLogs: [],
  };

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });

  return { form };
}

export function useFlashCardEditForm(flashCard: Card) {
  const initialValues = React.useMemo(
    () => ({
      front: flashCard.front,
      back: flashCard.back,
      easeFactor: flashCard.easeFactor,
      interval: flashCard.interval,
      repetition: flashCard.repetition,
      nextReview: flashCard.nextReview,
      lastReview: flashCard.lastReview,
      suspended: flashCard.suspended,
      reviewLogs: flashCard.reviewLogs.map((log) => log.id),
    }),
    [flashCard]
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
