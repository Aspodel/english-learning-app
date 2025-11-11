import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { PartOfSpeechBadge, vocabularyApi } from '@/features/vocabulary';

type VocabularyDetailsDialogProps = {
  id: number;
  onClose: () => void;
};

export function VocabularyDetailsDialog({
  id,
  onClose,
}: VocabularyDetailsDialogProps) {
  const { data: vocab, isLoading } = vocabularyApi.useDetail(id);

  return (
    <Dialog open={!!id} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className='max-w-lg sm:max-w-2xl'>
        {isLoading && (
          <div className='flex justify-center items-center py-10'>
            <Loader2Icon className='animate-spin w-6 h-6 text-muted-foreground' />
            <span className='ml-2 text-muted-foreground'>
              Loading vocabulary...
            </span>
          </div>
        )}

        {/* {error && (
          <p className="text-destructive">
            Failed to load vocabulary details. Try again later.
          </p>
        )} */}

        {vocab && (
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
                    <div className='flex items-baseline gap-2 flex-wrap'>
                      <span className='font-semibold text-lg'>
                        {i + 1}. {def.meaning}
                      </span>

                      {def.translation && (
                        <p className='text-muted-foreground text-lg italic'>
                          — {def.translation}
                        </p>
                      )}
                    </div>
                    {def.partOfSpeech && (
                      <PartOfSpeechBadge part={def.partOfSpeech} />
                    )}

                    {def.examples.length > 0 && (
                      <div className='mt-2 ml-4'>
                        <h4 className='font-medium text-muted-foreground'>
                          Examples:
                        </h4>

                        <ul className='list-disc list-inside'>
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
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
