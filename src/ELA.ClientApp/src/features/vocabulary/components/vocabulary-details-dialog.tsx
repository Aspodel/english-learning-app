import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { PartOfSpeechBadge } from '@/features/vocabulary';
import { Separator } from '@radix-ui/react-separator';

type VocabularyDetailsDialogProps = {
  onOpenChange: () => void;
  vocab: Vocabulary;
};

export function VocabularyDetailsDialog({
  onOpenChange,
  vocab,
}: VocabularyDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg sm:max-w-2xl'>
        {/* {isLoading ? (
          <div className='flex justify-center items-center py-10'>
            <Loader2Icon className='animate-spin w-6 h-6 text-muted-foreground' />
            <span className='ml-2 text-muted-foreground'>
              Loading vocabulary...
            </span>
          </div>
        ) : vocab ? ( */}
        <>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>
              {vocab.text}
            </DialogTitle>
            {vocab.ipa && (
              <DialogDescription className='text-base text-muted-foreground'>
                /{vocab.ipa}/
              </DialogDescription>
            )}
          </DialogHeader>

          <div className='mt-4 max-h-[60vh] overflow-y-auto pr-2'>
            {vocab.definitions.length > 0 ? (
              vocab.definitions.map((def, i) => (
                <div key={def.id} className='mb-6'>
                  <div className='flex items-baseline gap-2'>
                    <span className='font-semibold text-lg'>{i + 1}.</span>
                    <p className='mt-1 text-base'>{def.meaning}</p>
                    {def.translation && (
                      <p className='text-muted-foreground italic'>
                        — {def.translation}
                      </p>
                    )}
                  </div>
                  {def.partOfSpeech && (
                    <PartOfSpeechBadge part={def.partOfSpeech} />
                  )}

                  {def.examples.length > 0 && (
                    <div className='mt-2 ml-4'>
                      <h4 className='text-sm font-medium text-muted-foreground'>
                        Examples:
                      </h4>
                      <ul className='list-disc list-inside text-sm'>
                        {def.examples.map((ex) => (
                          <li key={ex.id} className='mt-1'>
                            <span>{ex.text}</span>
                            {ex.translation && (
                              <span className='text-muted-foreground italic ml-1'>
                                — ({ex.translation})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {i < vocab.definitions.length - 1 && (
                    <Separator className='my-4' />
                  )}
                </div>
              ))
            ) : (
              <p className='text-muted-foreground italic'>
                No definitions yet.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant='secondary' onClick={onOpenChange}>
              Close
            </Button>
          </DialogFooter>
        </>
        {/* ) : (
          <div className='text-center text-muted-foreground py-10'>
            No vocabulary found.
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
