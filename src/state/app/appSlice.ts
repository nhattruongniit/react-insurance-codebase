import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  snackbar: {};
}

const initialState: AppState = {
  snackbar: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<any>) => {
      const { key, message, variant } = action.payload;
      state.snackbar = {
        [key]: {
          key,
          message,
          variant,
        },
      };
    },
    removeSnackbar: (state, action: PayloadAction<any>) => {
      const newNotfi: any = state.snackbar;
      delete newNotfi[action.payload];
      state.snackbar = newNotfi;
    },
  },
});

export const { enqueueSnackbar, removeSnackbar } = appSlice.actions;

export default appSlice.reducer;
