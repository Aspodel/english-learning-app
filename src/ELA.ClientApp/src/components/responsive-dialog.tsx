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

type ResponsiveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  footerBtnText?: string;
  onCancel: () => void;
  formId?: string;
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
          <DrawerDescription>{description}</DrawerDescription>
        </>
      ) : (
        <>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
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
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className='text-left'>{sharedHeader}</DrawerHeader>
          {children}
          <DrawerFooter>{sharedFooter}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>{sharedHeader}</SheetHeader>
        {children}
        <SheetFooter>{sharedFooter}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
