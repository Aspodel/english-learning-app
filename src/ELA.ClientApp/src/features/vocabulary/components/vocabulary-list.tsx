import React from 'react';
import { toast } from 'sonner';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { EmptyComponent } from '@/components/empty-component';
import {
  PartOfSpeechBadge,
  vocabularyApi,
  VocabularyCardDropdown,
  VocabularyDetailsDialog,
} from '@/features/vocabulary';

type VocabularyListProps = {
  items: Vocabulary[] | any[];
};

export const VocabularyList: React.FC<VocabularyListProps> = ({ items }) => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const { deleteMutation: deleteVocabulary } = vocabularyApi.useDelete();

  const handleDelete = (id: number) => {
    deleteVocabulary.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Word deleted successfully');
        },
      }
    );
  };

  if (!items.length) {
    return (
      <EmptyComponent
        title='No Words Found'
        description='There are currently no words in your vocabulary list. Add new words to get started!'
        icon='📋'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 @lg/main:grid-cols-2 @3xl/main:grid-cols-3 @5xl/main:grid-cols-4'>
      {items.map((item) => (
        <Item
          variant='outline'
          key={item.id}
          className='relative group gap-0 transition hover:shadow-md hover:scale-[1.05] cursor-pointer'
        >
          <ItemContent onClick={() => setSelectedId(item.id)}>
            <div className='relative'>
              <div>
                <div className='mb-2 space-x-1'>
                  {item.partsOfSpeech.map((part: any, index: number) => (
                    <PartOfSpeechBadge key={index} part={part.name} />
                  ))}
                </div>

                <ItemTitle className='text-lg'>{item.text}</ItemTitle>

                <ItemDescription>
                  {item.ipa || 'No IPA provided'}
                </ItemDescription>

                <ItemDescription>
                  {item.definitionCount} definitions
                </ItemDescription>
              </div>
            </div>
          </ItemContent>

          <VocabularyCardDropdown
            id={item.id}
            onDelete={() => handleDelete(item.id)}
          />
        </Item>
      ))}

      <VocabularyDetailsDialog
        id={selectedId!}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
};
