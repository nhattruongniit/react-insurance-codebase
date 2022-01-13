import { createSelector } from 'reselect';
import { RootState } from 'state';

export const countSelector = createSelector(
  (state: RootState) => state.counter,
  (counter) => counter.value,
);