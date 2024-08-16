import { createAsyncThunk } from '@reduxjs/toolkit';
import { Guest, GuestMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchGuests = createAsyncThunk<Guest[]>(
  'guestbook/fetchGuests',
  async () => {
    const {data: guests} = await axiosApi.get<Guest[] | null>('/guests');

    if (!guests) {
      return [];
    }

    return guests;
  },
);

export const createGuest = createAsyncThunk<void, GuestMutation>(
  'guestbook/createGuest',
  async (guestMutation) => {
    const formData = new FormData();

    formData.append('author', guestMutation.author);
    formData.append('message', guestMutation.message);

    if (guestMutation.image) {
      formData.append('image', guestMutation.image);
    }

    await axiosApi.post('/guests', formData);
  },
);