import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cardApi } from '@/features/flashcard';
import { FlashcardList } from '@/features/flashcard/components/flashcard-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/flashcard/$deckId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { deckId } = Route.useParams();
  const { data, isLoading } = cardApi.useList<PaginatedList<Card>>({
    deckId: Number(deckId),
  });

  return (
    <>
      {isLoading ? (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='h-4 w-32' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-3 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.items.length ? (
        <FlashcardList cards={data.items} />
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
          <Card>
            <CardContent>
              <p className='text-center text-sm text-muted-foreground'>
                No cards found.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
