import { format } from 'date-fns';
import { Clock4Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { DeckCardDropdown, type DeckListItemDto } from '@/features/flashcard';
import { Link } from '@tanstack/react-router';

type DeckCardProps = React.HTMLAttributes<HTMLDivElement> & {
  deck: DeckListItemDto;
  onEdit: () => void;
  onDelete: () => void;
};

export function DeckCard({ deck, onEdit, onDelete }: DeckCardProps) {
  return (
    <Item
      variant='outline'
      key={deck.id}
      className='relative group gap-0 transition hover:shadow-md hover:scale-[1.05] cursor-pointer'
    >
      <ItemContent>
        <Link to='/app/flashcard/$deckId' params={{ deckId: String(deck.id) }}>
          <div className='flex justify-between gap-2'>
            <div>
              <ItemTitle className='text-lg'>{deck.name}</ItemTitle>
              <ItemDescription>{deck.description}</ItemDescription>
            </div>
          </div>
          <div className='flex mt-2'>
            <p className='flex place-items-center gap-1 text-sm text-muted-foreground'>
              <Clock4Icon className='size-4' />
              {format(new Date(deck.created), 'PP')}
            </p>
            <Badge className='text-md ml-auto bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-600/30 dark:text-teal-200 dark:border-teal-900'>
              {deck.cardCount ?? 0} {deck.cardCount === 1 ? 'card' : 'cards'}
            </Badge>
          </div>
        </Link>
      </ItemContent>

      <DeckCardDropdown onEdit={onEdit} onDelete={onDelete} />
    </Item>
  );
}
