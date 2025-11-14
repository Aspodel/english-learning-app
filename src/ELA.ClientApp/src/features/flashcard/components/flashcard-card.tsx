import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

type FlashcardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  card: Card;
};

export const FlashcardCard: React.FC<FlashcardCardProps> = ({ card }) => {
  return (
    <Item
      variant='outline'
      className='relative transition hover:shadow-md hover:scale-[1.05] cursor-pointer'
    >
      <ItemContent className='items-center'>
        <ItemTitle className='text-lg'>{card.front}</ItemTitle>
        <ItemDescription className='text-md'>{card.back}</ItemDescription>
      </ItemContent>
    </Item>
  );
};
