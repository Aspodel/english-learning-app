import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen flex flex-col w-full'>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>

        <Link to='/signup' className='[&.active]:font-bold'>
          Sign Up
        </Link>

        <Link to='/signin' className='[&.active]:font-bold'>
          Sign In
        </Link>

        <Link to='/app' className='[&.active]:font-bold'>
          App
        </Link>
      </div>

      {/* Page Content */}
      <main className='flex-1 w-full'>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className='bg-white shadow p-4 text-center text-sm text-gray-500'>
        © 2025 ELA
      </footer>
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
