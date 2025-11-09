import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import {
  PartOfSpeechBadge,
  VocabularyCardDropdown,
  type VocabularyListItemDto,
} from '@/features/vocabulary';

type VocabularyCardProps = React.HTMLAttributes<HTMLDivElement> & {
  vocab: VocabularyListItemDto;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function VocabularyCard({
  vocab,
  onSelect,
  onEdit,
  onDelete,
}: VocabularyCardProps) {
  return (
    <Item
      variant='outline'
      className='relative group gap-0 transition hover:shadow-md hover:scale-[1.05] cursor-pointer'
    >
      <ItemContent onClick={() => onSelect(vocab.id)}>
        <div className='relative'>
          <div>
            <div className='mb-2 space-x-1'>
              {vocab.partsOfSpeech.map((part: any, index: number) => (
                <PartOfSpeechBadge key={index} part={part.name} />
              ))}
            </div>

            <ItemTitle className='text-lg'>{vocab.text}</ItemTitle>

            <ItemDescription>{vocab.ipa || 'No IPA provided'}</ItemDescription>

            <ItemDescription>
              {vocab.definitionCount} definitions
            </ItemDescription>
          </div>
        </div>
      </ItemContent>

      <VocabularyCardDropdown
        onDelete={() => onDelete(vocab.id)}
        onEdit={() => onEdit(vocab.id)}
      />
    </Item>
  );
}
