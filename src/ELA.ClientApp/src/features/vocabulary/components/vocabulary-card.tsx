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

type VocabularyCardProps = {
  vocab: VocabularyListItemDto;
  onSelect: () => void;
  onEdit: (v: VocabularyListItemDto) => void;
  onDelete: (v: VocabularyListItemDto) => void;
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
      <ItemContent onClick={onSelect}>
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
        id={vocab.id}
        onDelete={() => onDelete(vocab)}
        onEdit={() => onEdit(vocab)}
      />
    </Item>
  );
}
