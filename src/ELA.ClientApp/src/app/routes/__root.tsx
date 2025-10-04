import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen flex'>
      {/* <div className='p-2 flex gap-2'>
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
      </div> */}

      {/* <ThemeToggle
        className='group size-8 hover:[&>svg]:scale-120 hover:[&>svg]:transition-all'
        variant='ghost'
        size='icon'
      /> */}
      {/* Page Content */}
      <main className='flex-1'>
        <Outlet />
      </main>
      {/* Footer */}
      {/* <footer className='bg-white shadow p-4 text-center text-sm text-gray-500'>
        © 2025 ELA
      </footer> */}
    </div>
  ),
});
