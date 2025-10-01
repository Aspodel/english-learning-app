import { AppProvider } from './provider';
import { AppRouter } from './router';
import '@fontsource-variable/nunito';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
