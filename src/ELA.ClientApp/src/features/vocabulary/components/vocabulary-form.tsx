import { FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FieldWrapper } from '@/components/field-wrapper';
import { type vocabularyFormSchemaType } from '@/features/vocabulary';

type VocabularyFormProps = {
  form: any;
  onSubmit: (data: vocabularyFormSchemaType) => void;
  formId?: string;
}

export function VocabularyForm({
  form,
  onSubmit,
  formId = 'vocabulary-form',
}: VocabularyFormProps) {
  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid flex-1 auto-rows-min gap-6 px-4'
      >
        <FieldWrapper name='text' label='Word'>
          <Input placeholder='Word' />
        </FieldWrapper>

        <FieldWrapper name='ipa' label='IPA'>
          <Input placeholder='IPA' />
        </FieldWrapper>
      </form>
    </FormProvider>
  );
}
