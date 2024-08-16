import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, Grid, Typography } from '@mui/material';
import {
  selectCreateLoading,
  selectErrorFetching,
  selectFetchLoading,
  selectGuests
} from './guestbookSlice';
import { GuestMutation } from '../../types';
import { createGuest, fetchGuests } from './guestbookThunks';
import GuestForm from './components/GuestForm';
import GuestItem from './components/GuestItem';
import MySpinner from '../../UI/MySpinner/MySpinner';

const Guestbook = () => {
  const guestsList = useAppSelector(selectGuests);
  const isCreating = useAppSelector(selectCreateLoading);
  const isFetching = useAppSelector(selectFetchLoading);
  const isErrorFetching = useAppSelector(selectErrorFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchGuests()).unwrap();
    } catch (e) {
      console.error('Error', e);
    }
  }, [dispatch]);

  const onFormSubmit = async (productMutation: GuestMutation) => {
    try {
      await dispatch(createGuest(productMutation)).unwrap();
      await dispatch(fetchGuests()).unwrap();
      toast.success('Guest is already created!');
    } catch (e) {
      console.log('Error', e);
      toast.error('Guest is not been created!');
    }
  };

  return (
    <Container maxWidth="xl" component="main" sx={{mt:5}}>
      {isFetching && <MySpinner />}
      <GuestForm onSubmit={onFormSubmit} isLoading={isCreating} />
      <Grid container justifyContent="center">
        <Grid item sx={{my: 5}}>
          <Typography variant="h2" textAlign="center" color="primary">Guestbook</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} direction="column">
        {isErrorFetching
          ? (
          <Grid item sx={{my: 5}}>
            <Typography variant="h3" textAlign="center" color="red">Error load guest list!</Typography>
          </Grid>
          ) : (
          guestsList.map((guest) => (
            <GuestItem
              key={guest.id}
              author={guest.author}
              message={guest.message}
              image={guest.image}
            />
          )))}
      </Grid>
    </Container>
  );
};

export default Guestbook;