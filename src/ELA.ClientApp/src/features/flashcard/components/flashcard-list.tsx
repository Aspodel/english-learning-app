import { EmptyComponent } from '@/components/empty-component';
import { FlashcardCard } from '@/features/flashcard';

type FlashcardListProps = {
  cards: Card[];
};

export const FlashcardList: React.FC<FlashcardListProps> = ({ cards }) => {
  if (!cards.length) {
    return (
      <EmptyComponent
        title='No flashcards found.'
        description='You can add flashcards to your deck to get started.'
        icon='🃏'
      />
    );
  }
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
      {cards.map((card) => (
        <FlashcardCard key={card.id} card={card} />
      ))}
    </div>
  );
};
