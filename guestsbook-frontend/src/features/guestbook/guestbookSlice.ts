import { Guest } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createGuest, fetchGuests } from './guestbookThunks';

export interface GuestbookState {
  guestsData: Guest[];
  fetchLoading: boolean;
  errorFetching: boolean;
  createLoading: boolean;
  errorCreating: boolean;
}

export const initialState: GuestbookState = {
  guestsData: [],
  fetchLoading: false,
  errorFetching: false,
  createLoading: false,
  errorCreating: false,
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
      state.errorCreating = false;
    }).addCase(createGuest.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createGuest.rejected, (state) => {
      state.createLoading = false;
      state.errorCreating = true;
    });

  },
  selectors: {
    selectGuests: (state) => state.guestsData,
    selectFetchLoading: (state) => state.fetchLoading,
    selectErrorFetching: (state) => state.errorFetching,
    selectCreateLoading: (state) => state.createLoading,
    selectErrorCreating: (state) => state.errorCreating,
  },
});

export const guestbookReducer = guestbookSlice.reducer;

export const {
  selectGuests,
  selectFetchLoading,
  selectErrorFetching,
  selectCreateLoading,
  selectErrorCreating,
} = guestbookSlice.selectors;