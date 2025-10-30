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
} from '@/features/vocabulary';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

type VocabularyListProps = {
  items: Vocabulary[] | any[];
  onCreate?: () => void;
  onSelect?: (item: Vocabulary) => void;
};

export const VocabularyList: React.FC<VocabularyListProps> = ({
  items,
  onSelect,
}) => {
  const { deleteMutation: deleteVocabulary } = vocabularyApi.useDelete();

  const handleDelete = (id: string) => {
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
        <Link
          to='/app/vocabulary/$vocabId'
          params={{ vocabId: item.id }}
          search={{ from: 'list' }}
        >
          <Item
            variant='outline'
            key={item.id}
            className={`cursor-${onSelect ? 'pointer' : 'default'} group gap-0 transition hover:shadow-md hover:scale-[1.05]`}
          >
            <ItemContent>
              <div className='flex justify-between gap-2'>
                <div>
                  <ItemDescription className='mb-2 space-x-1'>
                    {item.partsOfSpeech.map((part: any, index: number) => (
                      <PartOfSpeechBadge key={index} part={part.name} />
                    ))}
                  </ItemDescription>
                  <ItemTitle className='text-lg'>{item.text}</ItemTitle>
                  <ItemDescription>
                    {item.ipa || 'No IPA provided'}
                  </ItemDescription>
                </div>

                <VocabularyCardDropdown
                  id={item.id}
                  onDelete={() => handleDelete(item.id)}
                />
              </div>

              <ItemDescription>
                {item.definitionCount} definitions
              </ItemDescription>
            </ItemContent>
          </Item>
        </Link>
      ))}

      <Link
        to='/app/vocabulary/$vocabId'
        params={{ vocabId: '1' }}
        search={{ from: 'list' }}
        className='text-blue-600 hover:underline'
      >
        Test
      </Link>

      {/* {open && (
        <VocabularyDetailsDialog
          vocabularyId={selectedId!}
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedId(null);
            setOpen(isOpen);
          }}
        />
      )} */}
    </div>
  );
};
