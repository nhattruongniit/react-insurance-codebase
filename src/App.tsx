import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// layout
import MainLayout from 'layout/MainLayout';

// components
import SnackBarBase from 'components/SnackBar';

// state
import { languageSelector } from 'state/app/appSelector';
import { useAppSelector } from 'state/hooks';

// routes
import RoutesMain from 'routes/Routes';

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
      <RoutesMain />

      <SnackBarBase />
    </SnackbarProvider>
  );
}

export default App;
