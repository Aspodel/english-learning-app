import { Button } from '../ui/button';

export const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div
      className='flex h-screen w-screen flex-col items-center justify-center text-red-500'
      role='alert'
    >
      <h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>
      <pre className='text-red-500'>{error.message}</pre>

      <Button
        className='mt-4'
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};
