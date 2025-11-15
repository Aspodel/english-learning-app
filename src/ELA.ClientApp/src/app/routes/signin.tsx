import { createFileRoute } from '@tanstack/react-router';

import { AuthLayout } from '@/components/common/layouts/auth-layout';
import SigninForm from '@/features/auth/components/signin-form';

export const Route = createFileRoute('/signin')({
  component: SignIn,
  validateSearch: (search) => ({
    redirectTo: search.redirectTo ?? undefined,
  }),
});

function SignIn() {
  return (
    <AuthLayout>
      <SigninForm />
    </AuthLayout>
  );
}
