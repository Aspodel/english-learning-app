import {
  MoreVerticalIcon,
  PlusCircleIcon,
  CirclePauseIcon,
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

type VocabularyCardDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function VocabularyCardDropdown({
  onEdit,
  onDelete,
}: VocabularyCardDropdownProps) {
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
            <PlusCircleIcon /> Add to flashcard
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            <CirclePauseIcon /> Suspense
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onEdit}>
            <SquarePenIcon />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onDelete}>
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
