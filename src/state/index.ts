import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// slice
import counterReducer from 'state/counter/counterSlice';
import appReducer from 'state/app/appSlice';
import employersReducer from 'state/employers/employersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    employers: employersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
