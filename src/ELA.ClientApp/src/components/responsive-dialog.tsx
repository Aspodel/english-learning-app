import { useIsMobile } from '@/hooks/use-mobile';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { ScrollArea } from './ui/scroll-area';

type ResponsiveDialogProps = {
  open?: boolean;
  title: string;
  description?: string;
  footerBtnText?: string;
  formId?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
};

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  footerBtnText = 'Add',
  onCancel,
  formId = 'form',
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  const sharedHeader = (
    <>
      {isMobile ? (
        <>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </>
      ) : (
        <>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </>
      )}
    </>
  );

  const sharedFooter = (
    <>
      <Button type='submit' form={formId}>
        {footerBtnText}
      </Button>
      {(isMobile ? DrawerClose : SheetClose)({
        asChild: true,
        children: (
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        ),
      })}
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className='flex flex-col'>
          <DrawerHeader className='text-left'>{sharedHeader}</DrawerHeader>
          <ScrollArea className='overflow-auto'>{children}</ScrollArea>
          <DrawerFooter>{sharedFooter}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className='flex flex-col'>
        <SheetHeader>{sharedHeader}</SheetHeader>
        <ScrollArea className='overflow-auto'>{children}</ScrollArea>
        <SheetFooter>{sharedFooter}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
