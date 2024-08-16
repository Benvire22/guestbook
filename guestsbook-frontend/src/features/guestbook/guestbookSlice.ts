import { Guest } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createGuest, fetchGuests } from './guestbookThunks';

export interface GuestbookState {
  guestsData: Guest[];
  fetchLoading: boolean;
  errorFetching: boolean;
  createLoading: boolean;
}

export const initialState: GuestbookState = {
  guestsData: [],
  fetchLoading: false,
  errorFetching: false,
  createLoading: false,
};

const guestbookSlice = createSlice({
  name: 'guestbook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuests.pending, (state) => {
      state.fetchLoading = true;
      state.errorFetching = false;
    }).addCase(fetchGuests.fulfilled, (state, {payload: guests}) => {
      state.fetchLoading = false;
      state.guestsData = guests;
    }).addCase(fetchGuests.rejected, (state) => {
      state.fetchLoading = false;
      state.errorFetching = true;
    });

    builder.addCase(createGuest.pending, (state) => {
      state.createLoading = true;
    }).addCase(createGuest.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createGuest.rejected, (state) => {
      state.createLoading = false;
    });
  },
  selectors: {
    selectGuests: (state) => state.guestsData,
    selectFetchLoading: (state) => state.fetchLoading,
    selectErrorFetching: (state) => state.errorFetching,
    selectCreateLoading: (state) => state.createLoading,
  },
});

export const guestbookReducer = guestbookSlice.reducer;

export const {
  selectGuests,
  selectFetchLoading,
  selectErrorFetching,
  selectCreateLoading,
} = guestbookSlice.selectors;