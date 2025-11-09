import { createFileRoute } from '@tanstack/react-router';

import FeatureLayout from '@/components/common/layouts/feature-layout';
import { deckApi, DeckCreateDialog, DeckList,  } from '@/features/flashcard';

export const Route = createFileRoute('/app/flashcard')({
  component: RouteComponent,
});

function RouteComponent() {
  const deck = deckApi.useSearch({});
  console.log(deck);
  return (
    <FeatureLayout
      title='Decks'
      description='Browse and manage your flashcard decks'
      toolbar={<DeckCreateDialog />}
    >
      <div className='flex flex-col h-full gap-4 pt-8'>
      <DeckList items={deck.data.items} />
      </div>
    </FeatureLayout>
  );
}
