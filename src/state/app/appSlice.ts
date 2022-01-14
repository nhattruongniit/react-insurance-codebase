import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  snackbar: {};
  isLoading: boolean;
}

const initialState: AppState = {
  snackbar: {},
  isLoading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { enqueueSnackbar, removeSnackbar, setLoading } = appSlice.actions;

export default appSlice.reducer;
