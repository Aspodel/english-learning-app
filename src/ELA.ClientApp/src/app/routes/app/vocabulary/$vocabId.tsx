import { vocabularyApi } from '@/features/vocabulary';
import { VocabularyDetailsDialog } from '@/features/vocabulary/components/vocabulary-details-dialog';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/app/vocabulary/$vocabId')({
  loader: async ({ params, context }) => {
    const { queryClient } = context;

    // Prefetch and cache using the raw function
    const data = await queryClient.ensureQueryData({
      queryKey: ['get-vocabularies', params.vocabId],
      queryFn: () => vocabularyApi.getById({ id: params.vocabId }),
    });

    return data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const vocab: Vocabulary = Route.useLoaderData();
  const isLoading = false;
  return (
    <VocabularyDetailsDialog
      onOpenChange={() => navigate({ to: '/app/vocabulary' })}
      vocab={vocab}
    />
  );
}
