import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function TooltipWrapper({
  label,
  command,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipTrigger> & {
  label: ReactNode;
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
          {command && (
            <kbd className='bg-muted text-muted-foreground flex items-center gap-[0.5ch] rounded px-1.5 py-0.5 font-mono text-xs [&>svg]:size-3'>
              {command}
            </kbd>
          )}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
