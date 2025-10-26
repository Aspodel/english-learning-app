import { FormProvider, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FieldWrapper } from '@/components/field-wrapper';
import { type vocabularyFormSchemaType } from '@/features/vocabulary';
import { FieldGroup } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { PlusIcon, XIcon } from 'lucide-react';

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
  const { fields, append, remove } = useFieldArray({
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

        <FieldGroup className='gap-4'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='grid gap-2 border p-4 rounded-md border-dashed'
            >
              <FieldWrapper
                name={`definitions.${index}.meaning`}
                label='Meaning'
              >
                <InputGroup>
                  <InputGroupInput
                    id={`definitions-meaning-${index}`}
                    placeholder='Meaning'
                  />

                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      type='button'
                      variant='ghost'
                      size='icon-xs'
                      onClick={() => remove(index)}
                      aria-label={`Remove email ${index + 1}`}
                    >
                      <XIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FieldWrapper>

              <FieldWrapper
                name={`definitions.${index}.partOfSpeech`}
                label='Part of Speech'
                tooltip='Optional'  
              >
                <InputGroup>
                  <InputGroupInput
                    id={`definitions-partOfSpeech-${index}`}
                    placeholder='Part of Speech'
                  />
                </InputGroup>
              </FieldWrapper>

              <FieldWrapper
                name={`definitions.${index}.translation`}
                label='Translation'
                tooltip='Optional'
              >
                <InputGroup>
                  <InputGroupInput
                    id={`definitions-translation-${index}`}
                    placeholder='Translation'
                  />
                </InputGroup>
              </FieldWrapper>
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            onClick={() => append({ meaning: '' })}
            disabled={fields.length >= 5}
          >
            <PlusIcon /> Add Definition
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
