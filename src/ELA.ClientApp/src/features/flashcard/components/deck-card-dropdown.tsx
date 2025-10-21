import {
  MoreVerticalIcon,
  PlusCircleIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDialog } from '@/components/confirm-dialog';

type DeckCardDropdownProps = {
  onDelete: () => void;
};

export const DeckCardDropdown: React.FC<DeckCardDropdownProps> = ({ onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          aria-label='Open menu'
          size='icon-sm'
          className='p-0 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto'
        >
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <PlusCircleIcon />
            Add flashcard
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SquarePenIcon />
            Edit infomation
          </DropdownMenuItem>
          <ConfirmDialog
            title='Confirm Delete'
            description='Are you sure you want to delete this word? This action cannot be undone.'
            onConfirm={onDelete}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </ConfirmDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
