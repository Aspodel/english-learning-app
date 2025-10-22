import {
  MoreVerticalIcon,
  PlusCircleIcon,
  CirclePauseIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditWordDialog } from '@/features/vocabulary';

type VocabularyCardDropdownProps = {
  word: Vocabulary;
  onDelete: () => void;
};

export function VocabularyCardDropdown({
  word,
  onDelete,
}: VocabularyCardDropdownProps) {
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
            <PlusCircleIcon /> Add to flashcard
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <CirclePauseIcon /> Suspense
          </DropdownMenuItem>
          <EditWordDialog
            word={word}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <SquarePenIcon />
                Edit
              </DropdownMenuItem>
            }
          />
          <ConfirmDialog
            title='Confirm Delete'
            description='Are you sure you want to delete this word? This action cannot be undone.'
            onConfirm={onDelete}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
