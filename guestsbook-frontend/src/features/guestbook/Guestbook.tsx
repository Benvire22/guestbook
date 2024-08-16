import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, Grid, Typography } from '@mui/material';
import { selectCreateLoading, selectGuests } from './guestbookSlice';
import { GuestMutation } from '../../types';
import { createGuest, fetchGuests } from './guestbookThunks';
import GuestForm from './components/GuestForm';
import GuestItem from './components/GuestItem';

const Guestbook = () => {
  const guestsList = useAppSelector(selectGuests);
  const isCreating = useAppSelector(selectCreateLoading);
  const dispatch = useAppDispatch();
  // const isFetching = useAppSelector(selectFetchLoading);

  useEffect(() => {
    try {
      void dispatch(fetchGuests()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const onFormSubmit = async (productMutation: GuestMutation) => {
    try {
      await dispatch(createGuest(productMutation)).unwrap();
      await dispatch(fetchGuests()).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xl" component="main" sx={{mt:5}}>
      <GuestForm onSubmit={onFormSubmit} isLoading={isCreating} />
      <Grid container justifyContent="center">
        <Grid item sx={{my: 5}}>
          <Typography variant="h2" textAlign="center" color="primary">Guestbook</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="column">
        {guestsList.map((guest) => (
          <GuestItem
            key={guest.id}
            author={guest.author}
            message={guest.message}
            image={guest.image}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Guestbook;