import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { PARTS_OF_SPEECH, type PartOfSpeech } from '@/features/vocabulary';

const badgeVariants = cva('border', {
  variants: {
    variant: {
      noun: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-600/30 dark:text-blue-200 dark:border-blue-900',
      verb: 'bg-green-100 text-green-600 border-green-200 dark:bg-green-600/30 dark:text-green-200 dark:border-green-900',
      adjective:
        'bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-600/30 dark:text-purple-200 dark:border-purple-900',
      adverb:
        'bg-pink-100 text-pink-600 border-pink-200 dark:bg-pink-600/30 dark:text-pink-200 dark:border-pink-900',
      pronoun:
        'bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-600/30 dark:text-yellow-200 dark:border-yellow-900',
      preposition:
        'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-600/30 dark:text-orange-200 dark:border-orange-900',
      conjunction:
        'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-600/30 dark:text-teal-200 dark:border-teal-900',
      interjection:
        'bg-red-100 text-red-600 border-red-200 dark:bg-red-600/30 dark:text-red-200 dark:border-red-900',
      default:
        'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-600/30 dark:text-gray-200 dark:border-gray-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface PartOfSpeechBadgeProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof badgeVariants> {
  part: string;
}

export const PartOfSpeechBadge = React.forwardRef<
  HTMLDivElement,
  PartOfSpeechBadgeProps
>(({ part, className, ...props }, ref) => {
  const normalized = part?.toLowerCase?.() ?? '';
  const variant = (
    PARTS_OF_SPEECH.includes(normalized as PartOfSpeech)
      ? normalized
      : 'default'
  ) as VariantProps<typeof badgeVariants>['variant'];

  return (
    <Badge
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...(props as any)}
    >
      {part}
    </Badge>
  );
});

PartOfSpeechBadge.displayName = 'PartOfSpeechBadge';
