import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VocabularyItem {
  id: number;
  word: string;
  definition: string;
}

interface VocabularyListProps {
  items: VocabularyItem[];
  onSelect?: (item: VocabularyItem) => void;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ items, onSelect }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items.map((item) => (
        <Card
          key={item.id}
          className={`cursor-${onSelect ? 'pointer' : 'default'} gap-0 transition-shadow hover:shadow-lg`}
          onClick={() => onSelect && onSelect(item)}
        >
          <CardHeader>
            <CardTitle className='text-lg'>{item.word}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>{item.definition}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VocabularyList;
