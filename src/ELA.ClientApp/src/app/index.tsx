import '@fontsource-variable/nunito';
import '@fontsource-variable/nunito/wght-italic.css';


import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
