import React from 'react';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { EmptyComponent } from '@/components/empty-component';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CirclePauseIcon, MoreVerticalIcon, PlusCircleIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';
import { vocabularyApi } from '../api/vocabulary.api';
import { toast } from 'sonner';

type VocabularyListProps = {
  items: Vocabulary[] | any[];
  onCreate?: () => void;
  onSelect?: (item: Vocabulary) => void;
};

const VocabularyList: React.FC<VocabularyListProps> = ({ items, onSelect }) => {
  const { deleteMutation: deleteVocabulary } = vocabularyApi.useDelete();

  const handleDelete = (id: string) => {
    deleteVocabulary.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Word deleted successfully');
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <EmptyComponent
        title='No Words Found'
        description='There are currently no words in your vocabulary list. Add new words to get started!'
        icon='📋'
      />
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {items.map((item) => (
          <Item
            variant='outline'
            key={item.id}
            className={`cursor-${onSelect ? 'pointer' : 'default'} group gap-0 transition hover:shadow-md hover:scale-[1.05]`}
            onClick={onSelect ? () => onSelect(item) : undefined}
          >
            <ItemContent>
              <div className='flex justify-between'>
                <div>
                  <ItemTitle className='text-lg'>{item.text}</ItemTitle>
                  <ItemDescription>{item.ipa}</ItemDescription>
                </div>
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
                      <DropdownMenuItem>
                        <SquarePenIcon />
                        Edit word
                      </DropdownMenuItem>
                      <ConfirmDialog onConfirm={() => handleDelete(item.id)}>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Trash2Icon />
                          Delete word
                        </DropdownMenuItem>
                      </ConfirmDialog>
                      <DropdownMenuItem disabled><PlusCircleIcon/>Add to flashcard</DropdownMenuItem>
                      <DropdownMenuItem disabled><CirclePauseIcon/>Suspense</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </ItemContent>
          </Item>
        ))}
      </div>
    </>
  );
};

export default VocabularyList;
