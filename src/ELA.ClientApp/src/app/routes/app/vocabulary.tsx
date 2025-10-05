import FeatureLayout from '@/components/common/layouts/feature-layout';
import { Button } from '@/components/ui/button';
import { SectionCards } from '@/features/vocabulary/components/section-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FeatureLayout
      title='Vocabulary'
      description='Manage your vocabulary here.'
      toolbar={<Button>Add new word</Button>}
    >
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
          <div className='flex gap-4 px-4 lg:px-6'>
            <div className='basis-1/2'>{/* <ChartPieDonut /> */}</div>
            <div className='basis-1/2'>{/* <ChartBarMixed /> */}</div>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
}
