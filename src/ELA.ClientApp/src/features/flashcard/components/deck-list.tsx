import { toast } from 'sonner';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { EmptyComponent } from '@/components/empty-component';
import {
  deckApi,
  DeckCardDropdown,
  type DeckListItem,
} from '@/features/flashcard';

type DeckListProps = {
  items: DeckListItem[];
};

export const DeckList: React.FC<DeckListProps> = ({ items }) => {
  const { deleteMutation: deleteDeck } = deckApi.useDelete();

  const handleDelete = (id: string) => {
    deleteDeck.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Deck deleted successfully');
        },
      }
    );
  };
  if (items.length === 0) {
    return (
      <EmptyComponent
        title='No Decks Yet'
        description='Create a new deck to start studying flashcards!'
        icon='📚'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items.map((deck) => (
        <Item
          variant='outline'
          key={deck.id}
          className={` group gap-0 transition hover:shadow-md hover:scale-[1.05]`}
          // onClick={onSelect ? () => onSelect(item) : undefined}
        >
          <ItemContent>
            <div className='flex justify-between gap-2'>
              <div>
                <ItemTitle className='text-lg'>{deck.name}</ItemTitle>
                <ItemDescription>
                  Created on {format(new Date(deck.created), 'PP')}
                </ItemDescription>
              </div>

              <DeckCardDropdown onDelete={() => handleDelete(deck.id)} />
            </div>
            <div className='flex'>
              <Badge variant='secondary' className='text-md ml-auto'>
                {deck.cardCount ?? 0} {deck.cardCount === 1 ? 'card' : 'cards'}
              </Badge>
            </div>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};
