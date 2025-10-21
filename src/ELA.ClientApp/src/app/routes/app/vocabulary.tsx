import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import FeatureLayout from '@/components/common/layouts/feature-layout';
import { Input } from '@/components/ui/input';
import {
  NewWord,
  SectionCards,
  vocabularyApi,
  VocabularyList,
} from '@/features/vocabulary';

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
});

function RouteComponent() {
  const vocab = vocabularyApi.useSearch({ queryParams: { pageSize: '100' } });
  console.log(vocab.data, vocab.isLoading);
  const [search, setSearch] = React.useState('');
  // const filteredVocabulary = sampleVocabulary.filter(
  //   (item) =>
  //     item.text.toLowerCase().includes(search.toLowerCase()) ||
  //     item.definitions.some((def) =>
  //       def.meaning.toLowerCase().includes(search.toLowerCase())
  //     )
  // );

  const filteredVocabulary =
    vocab.data?.items.filter(
      (item) => item.text.toLowerCase().includes(search.toLowerCase())
      //  || item.definitions.some((def) =>
      //   def.meaning.toLowerCase().includes(search.toLowerCase())
      // )
    ) || [];

  return (
    <FeatureLayout
      title='Vocabulary'
      description='Manage your vocabulary here.'
    >
      <div className='@container/main flex flex-1 flex-col gap-2 pt-8'>
        <div className='flex flex-col gap-4'>
          <SectionCards />
          <div className='px-4 lg:px-6'>{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
          <div className='flex gap-4 px-4 lg:px-6'>
            <div className='basis-1/2'>{/* <ChartPieDonut /> */}</div>
            <div className='basis-1/2'>{/* <ChartBarMixed /> */}</div>
          </div>

          <div className='flex justify-between gap-2'>
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