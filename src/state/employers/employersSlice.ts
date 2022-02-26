import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'state';

import { fetchEmployers } from './employersAPIs';
import { IEmployersState } from './interface';

const initialState: IEmployersState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errMsg: '',
  dataList: [],
  totalCount: 0,
};

export const employersSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.dataList = [];
      state.totalCount = 0;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchEmployers.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.dataList = payload.data;
        state.totalCount = payload.totalCount;
      })
      .addCase(fetchEmployers.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errMsg = payload || '';
      });
  },
});

export const { clearState } = employersSlice.actions;
export const employersSelector = (state: RootState) => state.employers;

export default employersSlice.reducer;
