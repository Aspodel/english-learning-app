import React from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FieldWrapper } from '@/components/field-wrapper';

import { useIsMobile } from '@/hooks/use-mobile';

import { vocabularyApi } from '../api/vocabulary.api';
import { useVocabularyCreateForm } from '../hooks/use-vocabulary-form';
import type { CreateVocabularyDto } from '../api/types';

export default function NewWord() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const { form } = useVocabularyCreateForm();
  const { createMutation } = vocabularyApi.useCreate();

  const onSubmit = (data: CreateVocabularyDto) => {
    createMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast.success('Word created successfully');

          setOpen(false);
          form.reset();
        },
      }
    );
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <Plus /> Add
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Add New Word</DrawerTitle>
            <DrawerDescription>
              Type a new word and its meaning to your vocabulary.
            </DrawerDescription>
          </DrawerHeader>

          <FormProvider {...form}>
            <form
              id='vocabulary-form'
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

          <DrawerFooter>
            <Button type='submit' form='vocabulary-form'>
              Add word
            </Button>
            <DrawerClose asChild>
              <Button variant='outline' onClick={() => form.reset()}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus /> Add New Word
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Word</SheetTitle>
          <SheetDescription>
            Type a new word and its meaning to your vocabulary.
          </SheetDescription>
        </SheetHeader>

        <FormProvider {...form}>
          <form
            id='vocabulary-form'
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

        <SheetFooter>
          <Button type='submit' form='vocabulary-form'>
            Add word
          </Button>
          <SheetClose asChild>
            <Button variant='outline' onClick={() => form.reset()}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

