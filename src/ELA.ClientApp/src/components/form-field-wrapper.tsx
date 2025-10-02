import * as React from 'react';
import { Info } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { TooltipWrapper } from './tooltip-wrapper';

interface FormFieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  description?: string;
  tooltip?: React.ReactNode;
  children: React.ReactElement;
  className?: string;
}

export function FormFieldWrapper({
  name,
  label,
  description,
  tooltip,
  children,
  className,
  ...props
}: FormFieldWrapperProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-1', className)} {...props}>
          {label && (
            <div className='flex items-center gap-1'>
              <FormLabel>{label}</FormLabel>
              {tooltip && (
                <TooltipWrapper label={tooltip} asChild>
                  <Info className='size-4' />
                </TooltipWrapper>
              )}
            </div>
          )}
          <FormControl>
            {React.cloneElement(children, { ...field })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
