import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Toaster } from '@/components/ui/sonner';
import { ErrorFallback } from '@/components/common/error-fallback';
import { Loading } from '@/components/common/loading';
import { QueryProvider } from '@/lib/query-client';
import { ThemeProvider } from '@/components/theme-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            {children}
            <Toaster position='top-center' />
          </ThemeProvider>
        </QueryProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
