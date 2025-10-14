import { cn } from '@/lib/utils';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

type EmptyComponentProps = React.ComponentProps<'div'> & {
  title: string;
  description: string;
  mediaVariant?: 'icon' | 'default';
  icon?: React.ReactNode;
};

export function EmptyComponent({
  title = 'No Data',
  description = 'There is no data to display.',
  mediaVariant = 'icon',
  icon,
  className,
  children,
  ...props
}: EmptyComponentProps) {
  return (
    <Empty className={cn(className)} {...props}>
      <EmptyHeader>
        {icon && <EmptyMedia variant={mediaVariant}>{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
