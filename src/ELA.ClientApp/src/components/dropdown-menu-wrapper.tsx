import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type LucideIcon } from 'lucide-react';
import { ConfirmDialog } from '@/components/confirm-dialog';

export type DropdownOption = {
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  onSelect?: () => void;
  confirm?: {
    title: string;
    description: string;
    onConfirm: () => void;
  };
};

type DropdownMenuWrapperProps = {
  options: DropdownOption[];
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
};

export const DropdownMenuWrapper: React.FC<DropdownMenuWrapperProps> = ({
  options,
  trigger,
  align = 'end',
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align={align}>
        {options.map((option, idx) => {
          const content = (
            <DropdownMenuItem
              key={idx}
              disabled={option.disabled}
              onSelect={(e) => {
                if (option.confirm) {
                  // prevent close on confirm wrapper
                  e.preventDefault();
                } else {
                  option.onSelect?.();
                }
              }}
            >
              {option.icon && <option.icon className='mr-2 h-4 w-4' />}
              {option.label}
            </DropdownMenuItem>
          );

          return option.confirm ? (
            <ConfirmDialog
              key={idx}
              title={option.confirm.title}
              description={option.confirm.description}
              onConfirm={option.confirm.onConfirm}
            >
              {content}
            </ConfirmDialog>
          ) : (
            content
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
