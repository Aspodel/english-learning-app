import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Input } from '@/components/ui/input';
import { SectionCards } from '@/features/vocabulary/components/section-card';
import NewWord from '@/features/vocabulary/components/new-word';
import FeatureLayout from '@/components/common/layouts/feature-layout';
import VocabularyList from '@/features/vocabulary/components/vocabulary-list';
import { vocabularyApi } from '@/features/vocabulary/api/vocabulary.api';

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
});

function RouteComponent() {
  // const vocab = vocabularyApi.useSearch({});
  const t = vocabularyApi.useGet({ id: 1 });
  console.log(t);
  const [search, setSearch] = React.useState('');
  const filteredVocabulary = sampleVocabulary.filter(
    (item) =>
      item.text.toLowerCase().includes(search.toLowerCase()) ||
      item.definitions.some((def) =>
        def.meaning.toLowerCase().includes(search.toLowerCase())
      )
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
    text: 'Eloquent',
    ipa: '/ˈɛləkwənt/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Fluent or persuasive in speaking or writing.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'She gave an eloquent speech that moved everyone.', translation: '' }],
      },
    ],
  },
  {
    id: 2,
    text: 'Candid',
    ipa: '/ˈkændɪd/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Truthful and straightforward; frank.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'He was candid about the problems in the project.', translation: '' }],
      },
    ],
  },
  {
    id: 3,
    text: 'Astute',
    ipa: '/əˈstjuːt/',
    userId: 'system',
    definitions: [
      {
        meaning: "Having or showing an ability to accurately assess situations or people and turn this to one's advantage.",
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'She made an astute observation during the meeting.', translation: '' }],
      },
    ],
  },
  {
    id: 4,
    text: 'Pragmatic',
    ipa: '/præɡˈmætɪk/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'We need a pragmatic solution to the issue.', translation: '' }],
      },
    ],
  },
  {
    id: 5,
    text: 'Ubiquitous',
    ipa: '/juːˈbɪkwɪtəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Present, appearing, or found everywhere.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Smartphones are ubiquitous in modern society.', translation: '' }],
      },
    ],
  },
  {
    id: 6,
    text: 'Serendipity',
    ipa: '/ˌsɛrənˈdɪpɪti/',
    userId: 'system',
    definitions: [
      {
        meaning: 'The occurrence of events by chance in a happy or beneficial way.',
        translation: '',
        partOfSpeech: 'noun',
        examples: [{ text: 'Finding the old letter was pure serendipity.', translation: '' }],
      },
    ],
  },
  {
    id: 7,
    text: 'Ambiguous',
    ipa: '/æmˈbɪɡjuəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Open to more than one interpretation; not having one obvious meaning.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'The instruction was ambiguous and led to confusion.', translation: '' }],
      },
    ],
  },
  {
    id: 8,
    text: 'Resilient',
    ipa: '/rɪˈzɪliənt/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Able to withstand or recover quickly from difficult conditions.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Children can be incredibly resilient after setbacks.', translation: '' }],
      },
    ],
  },
  {
    id: 9,
    text: 'Meticulous',
    ipa: '/məˈtɪkjʊləs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Showing great attention to detail; very careful and precise.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'She kept meticulous records of every transaction.', translation: '' }],
      },
    ],
  },
  {
    id: 10,
    text: 'Ephemeral',
    ipa: '/ɪˈfɛmərəl/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Lasting for a very short time.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'The beauty of the sunset was ephemeral.', translation: '' }],
      },
    ],
  },
  {
    id: 11,
    text: 'Voracious',
    ipa: '/vəˈreɪʃəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Having a very eager approach to a particular activity.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'He has a voracious appetite for learning.', translation: '' }],
      },
    ],
  },
  {
    id: 12,
    text: 'Tenacious',
    ipa: '/təˈneɪʃəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Tending to keep a firm hold of something; clinging or adhering closely.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Her tenacious attitude helped her finish the marathon.', translation: '' }],
      },
    ],
  },
  {
    id: 13,
    text: 'Obsolete',
    ipa: '/ˈɒbsəliːt/',
    userId: 'system',
    definitions: [
      {
        meaning: 'No longer produced or used; out of date.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Many technologies become obsolete within a few years.', translation: '' }],
      },
    ],
  },
  {
    id: 14,
    text: 'Lucid',
    ipa: '/ˈluːsɪd/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Expressed clearly; easy to understand.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'He provided a lucid explanation of the theory.', translation: '' }],
      },
    ],
  },
  {
    id: 15,
    text: 'Inevitable',
    ipa: '/ɪnˈɛvɪtəbl/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Certain to happen; unavoidable.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Given the delays, the cancellation seemed inevitable.', translation: '' }],
      },
    ],
  },
  {
    id: 16,
    text: 'Altruistic',
    ipa: '/ælˈtruːɪstɪk/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Showing a disinterested and selfless concern for the well-being of others; unselfish.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'Her altruistic acts helped many people in need.', translation: '' }],
      },
    ],
  },
  {
    id: 17,
    text: 'Conundrum',
    ipa: '/kəˈnʌndrəm/',
    userId: 'system',
    definitions: [
      {
        meaning: 'A confusing and difficult problem or question.',
        translation: '',
        partOfSpeech: 'noun',
        examples: [{ text: 'The engineer faced a conundrum when the design failed tests.', translation: '' }],
      },
    ],
  },
  {
    id: 18,
    text: 'Fortuitous',
    ipa: '/fɔːrˈtuːɪtəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Happening by a lucky chance; fortunate.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'It was fortuitous that they met at the conference.', translation: '' }],
      },
    ],
  },
  {
    id: 19,
    text: 'Sagacious',
    ipa: '/səˈɡeɪʃəs/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Having or showing keen mental discernment and good judgment; wise or shrewd.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'The sagacious leader guided the company through crisis.', translation: '' }],
      },
    ],
  },
  {
    id: 20,
    text: 'Ineffable',
    ipa: '/ɪnˈɛfəbl/',
    userId: 'system',
    definitions: [
      {
        meaning: 'Too great or extreme to be expressed or described in words.',
        translation: '',
        partOfSpeech: 'adjective',
        examples: [{ text: 'The view from the summit was ineffable.', translation: '' }],
      },
    ],
  },
];
