import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';

export const Route = createFileRoute('/app/vocabulary/$vocabId')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { vocabId } = useParams({ from: '/app/vocabulary/$vocabId' });

  const vocabData: any = {
    '1': {
      word: 'Eloquent',
      meaning: 'Fluent or persuasive in speaking or writing.',
    },
    '2': {
      word: 'Meticulous',
      meaning: 'Showing great attention to detail; very careful.',
    },
    '3': {
      word: 'Serendipity',
      meaning:
        'The occurrence of events by chance in a happy or beneficial way.',
    },
  };

  const vocab = vocabData[vocabId];

  return (
    <Dialog
      open={true}
      onOpenChange={() => navigate({ to: '/app/vocabulary' })}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{vocab?.word}</DialogTitle>
        </DialogHeader>

        <p className='mt-2 text-gray-600'>{vocab?.meaning}</p>

        <div className='mt-4 text-right'>
          <Button onClick={() => navigate({ to: '/app/vocabulary' })}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
