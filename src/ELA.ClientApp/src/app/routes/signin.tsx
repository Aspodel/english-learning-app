import SigninForm from '@/features/auth/components/signin-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  component: SignIn,
});

function SignIn() {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <SigninForm />
    </div>
  );
}
