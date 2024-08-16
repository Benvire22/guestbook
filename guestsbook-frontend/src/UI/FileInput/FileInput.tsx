import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { selectCreateLoading } from '../../features/guestbook/guestbookSlice';
import { useAppSelector } from '../../app/hooks';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const createLoading = useAppSelector(selectCreateLoading);

  useEffect(() => {
    if (createLoading) {
      setFileName('');
    }
  }, [createLoading]);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        name={name}
        style={{display: 'none'}}
        ref={inputRef}
        onInput={onFileChange}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label={label}
            inputProps={{readOnly: true}}
            value={fileName}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;