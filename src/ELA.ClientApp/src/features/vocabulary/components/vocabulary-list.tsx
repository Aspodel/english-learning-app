import { toast } from 'sonner';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { EmptyComponent } from '@/components/empty-component';
import { vocabularyApi, VocabularyCardDropdown } from '@/features/vocabulary';

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

  if (items.length === 0) {
    return (
      <EmptyComponent
        title='No Words Found'
        description='There are currently no words in your vocabulary list. Add new words to get started!'
        icon='📋'
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items.map((item) => (
        <Item
          variant='outline'
          key={item.id}
          className={`cursor-${onSelect ? 'pointer' : 'default'} group gap-0 transition hover:shadow-md hover:scale-[1.05]`}
          onClick={onSelect ? () => onSelect(item) : undefined}
        >
          <ItemContent>
            <div className='flex justify-between gap-2'>
              <div>
                <ItemTitle className='text-lg'>{item.text}</ItemTitle>
                <ItemDescription>
                  {item.ipa || 'No IPA provided'}
                </ItemDescription>
              </div>

              <VocabularyCardDropdown
                word={item}
                onDelete={() => handleDelete(item.id)}
              />
            </div>

            <ItemDescription>
              {item.definitionCount} definitions
            </ItemDescription>
            <ItemDescription>
              {item.partsOfSpeech.map((part: any, index: number) => (
                <span key={index}>
                  {part.abbreviation}
                  {index < item.partsOfSpeech.length - 1 && ', '}
                </span>
              ))}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};
