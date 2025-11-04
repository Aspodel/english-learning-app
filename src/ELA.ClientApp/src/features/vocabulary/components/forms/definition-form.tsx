import { PlusIcon, XIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldWrapper } from '@/components/field-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PARTS_OF_SPEECH } from '@/features/vocabulary';

type DefinitionFormProps = {
  form: any;
  index: number;
  removeDefinition: () => void;
};

export function DefinitionForm({
  form,
  index,
  removeDefinition,
}: DefinitionFormProps) {
  const {
    fields: exampleFields,
    append: appendExample,
    remove: removeExample,
  } = useFieldArray({
    control: form.control,
    name: `definitions.${index}.examples` as const,
  });

  return (
    <div className='grid gap-3 border p-4 rounded-md border-dashed'>
      <div className='flex justify-between items-center'>
        <h1 className='font-medium'>Definition {index + 1}</h1>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={removeDefinition}
        >
          <XIcon />
        </Button>
      </div>

      <FieldWrapper name={`definitions.${index}.meaning`} label='Meaning'>
        <Input id={`definitions-meaning-${index}`} placeholder='Meaning' />
      </FieldWrapper>

      <FieldWrapper
        name={`definitions.${index}.partOfSpeech`}
        label='Part of Speech'
        tooltip='Optional'
      >
        <Select
          onValueChange={(value) =>
            form.setValue(`definitions.${index}.partOfSpeech`, value)
          }
        >
          <SelectTrigger id={`definitions-partOfSpeech-${index}`}>
            <SelectValue placeholder='Select part of speech' />
          </SelectTrigger>
          <SelectContent>
            {PARTS_OF_SPEECH.map((part) => (
              <SelectItem key={part} value={part}>
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldWrapper>

      <FieldWrapper
        name={`definitions.${index}.translation`}
        label='Translation'
        tooltip='Optional'
      >
        <Input
          id={`definitions-translation-${index}`}
          placeholder='Translation'
        />
      </FieldWrapper>

      {exampleFields.map((exField, exIndex) => (
        <div
          key={exField.id}
          className='grid gap-2 border p-3 rounded-md border-dashed'
        >
          <div className='flex justify-between items-center'>
            <h2 className='font-medium'>Example {exIndex + 1}</h2>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => removeExample(exIndex)}
            >
              <XIcon />
            </Button>
          </div>

          <FieldWrapper
            name={`definitions.${index}.examples.${exIndex}.text`}
            label='Example'
          >
            <Input placeholder='Example Text' />
          </FieldWrapper>

          <FieldWrapper
            name={`definitions.${index}.examples.${exIndex}.translation`}
            label='Translation'
            tooltip='Optional'
          >
            <Input placeholder='Example Translation' />
          </FieldWrapper>
        </div>
      ))}

      <Button
        type='button'
        variant='outline'
        onClick={() => appendExample({ text: '', translation: '' })}
      >
        <PlusIcon /> Add Example
      </Button>
    </div>
  );
}
