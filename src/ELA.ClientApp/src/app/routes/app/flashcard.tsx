import { createFileRoute } from '@tanstack/react-router';

import NewDeck from '@/features/flashcard/components/new-deck';
import FeatureLayout from '@/components/common/layouts/feature-layout';
import { EmptyComponent } from '@/components/empty-component';

export const Route = createFileRoute('/app/flashcard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FeatureLayout
      title='Decks'
      description='Choose a deck to study'
      toolbar={<NewDeck />}
    >
      <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
        <EmptyComponent
          title='No decks yet'
          description='Create a new deck to start studying flashcards!'
          icon= {'📚'}
        />
      </div>
    </FeatureLayout>
  );
}
