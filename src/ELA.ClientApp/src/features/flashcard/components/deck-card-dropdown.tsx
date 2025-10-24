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
import { EditDeckDialog } from './edit-deck-dialog';
import type { DeckDto } from '../api/type';

type DeckCardDropdownProps = {
  deck: DeckDto & { id: number };
  onDelete: () => void;
};

export const DeckCardDropdown: React.FC<DeckCardDropdownProps> = ({
  deck,
  onDelete,
}) => {
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

          <EditDeckDialog
            deck={deck}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <SquarePenIcon />
                Edit information
              </DropdownMenuItem>
            }
          />

          <ConfirmDialog
            title='Confirm Delete'
            description='Are you sure you want to delete this deck? All associated flashcards will also be deleted. This action cannot be undone.'
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
};
