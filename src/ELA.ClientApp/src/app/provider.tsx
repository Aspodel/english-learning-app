import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// import { AuthLoader } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';
import { ErrorFallback } from '@/components/common/error-fallback';
import { Loader } from '@/components/common/loader';
import { QueryProvider } from '@/lib/query-client';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryProvider>
          {/* <AuthLoader renderLoading={() => <Loader />}> */}
          {children}
          <Toaster position='top-right' richColors />
          {/* </AuthLoader> */}
        </QueryProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
