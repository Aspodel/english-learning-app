import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Kbd } from './ui/kbd';

export function TooltipWrapper({
  label,
  command,
  className,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTrigger> & {
  label: React.ReactNode;
  command?: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className={cn(className)} {...props}>
        {children}
      </TooltipTrigger>

      <TooltipContent>
        <span className='flex items-center gap-[1ch]'>
          {label}
          {command && <Kbd>{command}</Kbd>}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
