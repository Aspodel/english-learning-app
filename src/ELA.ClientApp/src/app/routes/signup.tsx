import { createFileRoute } from '@tanstack/react-router';
import SignUpForm from '@/features/auth/components/signup-form';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

function SignUp() {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <SignUpForm />
    </div>
  );
}
