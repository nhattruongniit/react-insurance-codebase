import { SnackbarProvider } from 'notistack';

// feature
import { Counter } from 'features/counter/Counter';

// layout
import MainLayout from 'layout/MainLayout';

// components
import SnackBarBase from 'components/SnackBar';

function App() {
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
