import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Info } from 'lucide-react';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { TooltipWrapper } from './tooltip-wrapper';

type FieldWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  label?: string;
  description?: string;
  tooltip?: React.ReactNode;
  children: React.ReactElement;
  className?: string;
};

export function FieldWrapper({
  name,
  label,
  description,
  tooltip,
  children,
  className,
  ...props
}: FieldWrapperProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={className}
          {...props}
        >
          {label && (
            <FieldLabel htmlFor={name}>
              {label}
              {tooltip && (
                <TooltipWrapper label={tooltip} asChild>
                  <Info className='size-3' />
                </TooltipWrapper>
              )}
            </FieldLabel>
          )}
          {React.cloneElement(children, { ...field })}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
