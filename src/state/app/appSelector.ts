import { createSelector } from 'reselect';
import { RootState } from 'state';

export const snackbarSelector = createSelector(
  (state: RootState) => state.app,
  (app) => app.snackbar,
);

export const isLoadingSelector = createSelector(
  (state: RootState) => state.app,
  (app) => app.isLoading,
);

export const languageSelector = createSelector(
  (state: RootState) => state.app,
  (app) => app.language,
);
