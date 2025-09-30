import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

function SignUp() {
  return (
    <div className='p-2'>
      <h3>Sign Up Page</h3>
    </div>
  );
}
