import React from 'react';
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
  id: number;
  onDelete: () => void;
};

export function VocabularyCardDropdown({
  id,
  onDelete,
}: VocabularyCardDropdownProps) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            aria-label='Open menu'
            size='icon-sm'
            className='p-0 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto'
            onClick={(e) => e.stopPropagation()}
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

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
            >
              <SquarePenIcon />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {editOpen && (
        <EditWordDialog id={id} open={editOpen} onOpenChange={setEditOpen} />
      )}

      {confirmOpen && (
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title='Confirm Delete'
          description='Are you sure you want to delete this word? This action cannot be undone.'
          onConfirm={onDelete}
        />
      )}
    </>
  );
}
