import FeatureLayout from '@/components/common/layouts/feature-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewWord from '@/features/vocabulary/components/new-word';
import { SectionCards } from '@/features/vocabulary/components/section-card';
import VocabularyList from '@/features/vocabulary/components/vocabulary-list';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState('');
  const filteredVocabulary = sampleVocabulary.filter(
    (item) =>
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FeatureLayout
    // title='Vocabulary'
    // description='Manage your vocabulary here.'
    // toolbar={<Button>Add new word</Button>}
    >
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4'>
          <SectionCards />
          <div className='px-4 lg:px-6'>{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
          <div className='flex gap-4 px-4 lg:px-6'>
            <div className='basis-1/2'>{/* <ChartPieDonut /> */}</div>
            <div className='basis-1/2'>{/* <ChartBarMixed /> */}</div>
          </div>

          <div className='flex justify-between'>
            <div className='flex-1'>
              <Input
                className='input input-bordered w-full max-w-xs'
                placeholder='Search vocabulary...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <NewWord />
          </div>
          <VocabularyList items={filteredVocabulary} />
        </div>
      </div>
    </FeatureLayout>
  );
}

const sampleVocabulary = [
  {
    id: 1,
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing.',
  },
  { id: 2, word: 'Candid', definition: 'Truthful and straightforward; frank.' },
  {
    id: 3,
    word: 'Astute',
    definition:
      "Having or showing an ability to accurately assess situations or people and turn this to one's advantage.",
  },
  {
    id: 4,
    word: 'Pragmatic',
    definition:
      'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
  },
  {
    id: 5,
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
  },
  {
    id: 6,
    word: 'Serendipity',
    definition:
      'The occurrence of events by chance in a happy or beneficial way.',
  },
  {
    id: 7,
    word: 'Ambiguous',
    definition:
      'Open to more than one interpretation; not having one obvious meaning.',
  },
  {
    id: 8,
    word: 'Resilient',
    definition:
      'Able to withstand or recover quickly from difficult conditions.',
  },
  {
    id: 9,
    word: 'Meticulous',
    definition: 'Showing great attention to detail; very careful and precise.',
  },
  { id: 10, word: 'Ephemeral', definition: 'Lasting for a very short time.' },
  {
    id: 11,
    word: 'Voracious',
    definition: 'Having a very eager approach to a particular activity.',
  },
  {
    id: 12,
    word: 'Tenacious',
    definition:
      'Tending to keep a firm hold of something; clinging or adhering closely.',
  },
  {
    id: 13,
    word: 'Obsolete',
    definition: 'No longer produced or used; out of date.',
  },
  {
    id: 14,
    word: 'Lucid',
    definition: 'Expressed clearly; easy to understand.',
  },
  { id: 15, word: 'Inevitable', definition: 'Certain to happen; unavoidable.' },
  {
    id: 16,
    word: 'Altruistic',
    definition:
      'Showing a disinterested and selfless concern for the well-being of others; unselfish.',
  },
  {
    id: 17,
    word: 'Conundrum',
    definition: 'A confusing and difficult problem or question.',
  },
  {
    id: 18,
    word: 'Fortuitous',
    definition: 'Happening by a lucky chance; fortunate.',
  },
  {
    id: 19,
    word: 'Sagacious',
    definition:
      'Having or showing keen mental discernment and good judgment; wise or shrewd.',
  },
  {
    id: 20,
    word: 'Ineffable',
    definition: 'Too great or extreme to be expressed or described in words.',
  },
];
