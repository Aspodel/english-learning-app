import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  component: SignIn,
});

function SignIn() {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <h3 className='text-lg font-semibold mb-4'>Sign In</h3>
      <form className='flex flex-col gap-4 w-full max-w-sm'>
        <input type='email' placeholder='Email' className='border p-2 w-full' />
        <input
          type='password'
          placeholder='Password'
          className='border p-2 w-full'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 w-full'>
          Sign In
        </button>
      </form>
    </div>
  );
}
