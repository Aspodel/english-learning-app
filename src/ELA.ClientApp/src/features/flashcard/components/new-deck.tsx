import React from 'react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

type FormValues = {
  name: string;
  description: string;
};

export default function NewDeck() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // Handle submit logic here
    console.log(data);
    reset();
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <Plus /> Add Deck
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>
            <DrawerTitle>Add New Deck</DrawerTitle>
            <DrawerDescription>
              Create a new flashcard deck by entering its name and description.
            </DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid flex-1 auto-rows-min gap-6 px-4'
          >
            <div className='grid gap-3'>
              <Label>Name</Label>
              <Input
                placeholder='Deck name'
                {...register('name', { required: true })}
              />
            </div>
            <div className='grid gap-3'>
              <Label>Description</Label>
              <Input
                placeholder='Short description'
                {...register('description')}
              />
            </div>
          </form>
          <DrawerFooter>
            <Button type='submit'>Add deck</Button>
            <DrawerClose asChild>
              <Button variant='outline' type='button'>
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
          <Plus /> Add New Deck
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Deck</SheetTitle>
          <SheetDescription>
            Create a new flashcard deck by entering its name and description.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid flex-1 auto-rows-min gap-6 px-4'
        >
          <div className='grid gap-3'>
            <Label>Name</Label>
            <Input
              placeholder='Deck name'
              {...register('name', { required: true })}
            />
          </div>
          <div className='grid gap-3'>
            <Label>Description</Label>
            <Input
              placeholder='Short description'
              {...register('description')}
            />
          </div>
        </form>
        <SheetFooter>
          <Button type='submit'>Add deck</Button>
          <SheetClose asChild>
            <Button variant='outline' type='button'>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
