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

type DeckCardDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const DeckCardDropdown: React.FC<DeckCardDropdownProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          aria-label='Open menu'
          size='icon-sm'
          className='absolute right-4 top-4 p-0 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto'
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

          <DropdownMenuItem onSelect={onEdit}>
            <SquarePenIcon />
            Edit information
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onDelete}>
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
