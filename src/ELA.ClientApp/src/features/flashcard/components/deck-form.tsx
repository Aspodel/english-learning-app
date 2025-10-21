import { FormProvider } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { FieldWrapper } from '@/components/field-wrapper';
import type { deckFormSchemaType } from '@/features/flashcard';

type DeckFormProps = {
  form: any;
  onSubmit: (data: deckFormSchemaType) => void;
  formId?: string;
};

export function DeckForm({
  form,
  onSubmit,
  formId = 'deck-form',
}: DeckFormProps) {
  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid flex-1 auto-rows-min gap-6 px-4'
      >
        <FieldWrapper name='name' label='Deck Name'>
          <Input placeholder='Deck name' />
        </FieldWrapper>

        <FieldWrapper name='description' label='Description (optional)'>
          <Input placeholder='Short description' />
        </FieldWrapper>
      </form>
    </FormProvider>
  );
}
