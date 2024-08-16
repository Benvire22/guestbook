import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { GuestMutation } from '../../../types';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (guest: GuestMutation) => void;
  isLoading: boolean;
}

const GuestForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<GuestMutation>({
    author: '',
    message: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...state});

    setState({
      author: '',
      message: '',
      image: null,
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    const value = files && files[0] ? files[0] : null

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          label="Author"
          name="author"
          id="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          multiline
          minRows={4}
          label="Message"
          required
          name="message"
          id="message"
          value={state.message}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          sx={{p: '8px 20px', fontSize: '24px'}}
          startIcon={<SendIcon/>}
          variant="contained"
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default GuestForm;