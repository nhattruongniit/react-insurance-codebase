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

// guards
import GuestGuard from 'guards/GuestGuard';
import AuthGuard from 'guards/AuthGuard';

// configs
import { PATH_NAME } from 'configs';

// feature
const Employer = React.lazy(() => import('features/employer'));
const UserManagement = React.lazy(() => import('features/user-management'));
const Employees = React.lazy(() => import('features/employees'));
const Login = React.lazy(() => import('features/login'));

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
      <Router>
        <React.Suspense fallback={<div />}>
          <Routes>
            <Route
              path={PATH_NAME.LOGIN}
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
          </Routes>
          <Routes>
            <Route
              path={PATH_NAME.ROOT}
              element={
                <AuthGuard>
                  <MainLayout>
                    <Employer />
                  </MainLayout>
                </AuthGuard>
              }
            />
          </Routes>
          <Routes>
            <Route
              path={PATH_NAME.EMPLOYER}
              element={
                <AuthGuard>
                  <MainLayout>
                    <Employer />
                  </MainLayout>
                </AuthGuard>
              }
            />
          </Routes>
          <Routes>
            <Route
              path={PATH_NAME.EMPLOYEES}
              element={
                <AuthGuard>
                  <MainLayout>
                    <Employees />
                  </MainLayout>
                </AuthGuard>
              }
            />
          </Routes>
          <Routes>
            <Route
              path={PATH_NAME.USER_MANAGEMENT}
              element={
                <AuthGuard>
                  <MainLayout>
                    <UserManagement />
                  </MainLayout>
                </AuthGuard>
              }
            />
          </Routes>
        </React.Suspense>
      </Router>

      <SnackBarBase />
    </SnackbarProvider>
  );
}

export default App;
