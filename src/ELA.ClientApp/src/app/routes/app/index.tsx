import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  loader: () => {
    // 1. If not logged in → redirect to /login
    // if (!isAuthenticated()) {
    //   throw redirect({ to: '/login' })
    // }

    // 2. If logged in → redirect to /app/dashboard
    throw redirect({ to: '/app/dashboard' });
  },
});
