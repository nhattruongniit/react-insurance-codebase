import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import { useTranslation } from 'react-i18next';

// feature
import { Counter } from 'features/counter/Counter';

// layout
import MainLayout from 'layout/MainLayout';

// components
import SnackBarBase from 'components/SnackBar';

// state
import { languageSelector } from 'state/app/appSelector';
import { useAppSelector } from 'state/hooks';

function App() {
  const { i18n } = useTranslation();
  const language = useAppSelector(languageSelector);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <SnackbarProvider
      autoHideDuration={process.env.REACT_APP_AUTO_HIDE_SNACKBAR || 2000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      maxSnack={process.env.REACT_APP_MAX_SNACKBAR || 3}
    >
      <MainLayout>
        <Counter />
      </MainLayout>
      <SnackBarBase />
    </SnackbarProvider>
  );
}

export default App;
