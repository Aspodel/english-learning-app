import { PlusIcon } from 'lucide-react';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { FieldWrapper } from '@/components/field-wrapper';
import { DefinitionForm, type vocabularyFormSchemaType } from '@/features/vocabulary';

type VocabularyFormProps = {
  form: any;
  onSubmit: (data: vocabularyFormSchemaType) => void;
  formId?: string;
};

export function VocabularyForm({
  form,
  onSubmit,
  formId = 'vocabulary-form',
}: VocabularyFormProps) {
  const {
    fields: definitionFields,
    append: appendDefinition,
    remove: removeDefinition,
  } = useFieldArray({
    control: form.control,
    name: 'definitions',
  });

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

        <FieldGroup className='gap-5'>
          
          {definitionFields.map((defField, index) => (
            <DefinitionForm
              key={defField.id}
              form={form}
              index={index}
              removeDefinition={() => removeDefinition(index)}
            />
          ))}

          <Button
            type='button'
            variant='outline'
            onClick={() => appendDefinition({ meaning: '' })}
            disabled={definitionFields.length >= 5}
          >
            <PlusIcon /> Add Definition
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
