import { createFileRoute } from '@tanstack/react-router';

import { AuthLayout } from '@/components/common/layouts/auth-layout';
import SignUpForm from '@/features/auth/components/signup-form';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
