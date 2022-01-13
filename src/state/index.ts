import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// slice
import counterReducer from 'state/counter/counterSlice';
import appReducer from 'state/app/appSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
