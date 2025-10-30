import { useMemo } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}

export const createAppRouter = (queryClient?: QueryClient) =>
  createRouter({
    routeTree,
    context: { queryClient },
  });

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [])

  return <RouterProvider router={router} />;
};
