import React from 'react';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { EmptyComponent } from '@/components/empty-component';

interface VocabularyItem {
  id: number;
  word: string;
  definition: string;
}

type VocabularyListProps = {
  items: VocabularyItem[];
  onCreate?: () => void;
  onSelect?: (item: VocabularyItem) => void;
};

const VocabularyList: React.FC<VocabularyListProps> = ({ items, onSelect }) => {
  if (items.length === 0) {
    return (
      <EmptyComponent
      title="No Words Found"
      description="There are currently no words in your vocabulary list. Add new words to get started!"
      icon="📋"
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items.map((item) => (
        <Item
          variant='outline'
          key={item.id}
          className={`cursor-${onSelect ? 'pointer' : 'default'} gap-0 transition-shadow hover:shadow-lg`}
          onClick={onSelect ? () => onSelect(item) : undefined}
        >
          <ItemContent>
            <ItemTitle className='text-lg'>{item.word}</ItemTitle>
            <ItemDescription>
              <p className='text-muted-foreground'>{item.definition}</p>
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};

export default VocabularyList;
