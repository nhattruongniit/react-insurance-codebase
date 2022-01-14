import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  snackbar: {};
  isLoading: boolean;
  language: string;
}

const initialState: AppState = {
  snackbar: {},
  isLoading: false,
  language: 'en',
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
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { enqueueSnackbar, removeSnackbar, setLoading, setLanguage } = appSlice.actions;

export default appSlice.reducer;
