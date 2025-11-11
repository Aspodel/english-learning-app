import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cardApi } from '@/features/flashcard';
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
        <div className='space-y-4'>
          {[...Array(3)].map((_, i) => (
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
        <div className='grid gap-4'>
          {data.items.map((card: any) => (
            <Card key={card.id ?? `${card.front ?? ''}-${card.back ?? ''}`}>
              <CardHeader>
                <CardTitle className='font-medium'>
                  {card.front ?? 'No front'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  {card.back ?? 'No back'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <p className='text-center text-sm text-muted-foreground'>
              No cards found.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
