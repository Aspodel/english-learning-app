import { NotFound } from '@/components/common/not-found';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen flex'>
      {/* Page Content */}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  ),

  notFoundComponent: () => {
    return <NotFound />;
  },
});
