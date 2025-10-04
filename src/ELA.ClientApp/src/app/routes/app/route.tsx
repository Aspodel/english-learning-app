import { createFileRoute } from '@tanstack/react-router';

import AppLayout from '@/components/common/layouts/app-layout';

export const Route = createFileRoute('/app')({
  component: AppLayout,
});
