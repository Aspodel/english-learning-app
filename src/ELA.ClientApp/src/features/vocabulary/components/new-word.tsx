import React from 'react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

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
import { Label } from '@/components/ui/label';

import { useIsMobile } from '@/hooks/use-mobile';

type FormValues = {
  word: string;
  meaning: string;
};

export default function NewWord() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // Handle submit logic here
    console.log(data);
    reset();
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid flex-1 auto-rows-min gap-6 px-4'
          >
            <div className='grid gap-3'>
              <Label>Word</Label>
              <Input
                placeholder='Word'
                {...register('word', { required: true })}
              />
            </div>
            <div className='grid gap-3'>
              <Label>Meaning</Label>
              <Input
                placeholder='Meaning'
                {...register('meaning', { required: true })}
              />
            </div>
          </form>

          <DrawerFooter>
            <Button type='submit'>Add word</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid flex-1 auto-rows-min gap-6 px-4'
        >
          <div className='grid gap-3'>
            <Label>Word</Label>
            <Input
              placeholder='Word'
              {...register('word', { required: true })}
            />
          </div>
          <div className='grid gap-3'>
            <Label>Meaning</Label>
            <Input
              placeholder='Meaning'
              {...register('meaning', { required: true })}
            />
          </div>
        </form>

        <SheetFooter>
          <Button type='submit'>Add word</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
