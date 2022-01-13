import { createSelector } from 'reselect';
import { RootState } from 'state';

export const snackbarSelector = createSelector(
  (state: RootState) => state.app,
  (app) => app.snackbar,
);
