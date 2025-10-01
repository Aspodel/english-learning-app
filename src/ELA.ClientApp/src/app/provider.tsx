import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// import { AuthLoader } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';
import { ErrorFallback } from '@/components/common/error-fallback';
import { Loader } from '@/components/common/loader';
import { QueryProvider } from '@/lib/query-client';
import { ThemeProvider } from '@/components/theme-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            {/* <AuthLoader> */}
            {children}
            <Toaster position='top-right' richColors />
            {/* </AuthLoader> */}
          </ThemeProvider>
        </QueryProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
