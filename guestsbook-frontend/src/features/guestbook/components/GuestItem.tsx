import React from 'react';
import { Card, CardContent, CardHeader, Grid, CardMedia, Typography } from '@mui/material';

interface Props {
  author: string;
  message: string;
  image: string | null
}

const GuestItem: React.FC<Props> = ({author, message, image}) => {
  let cardImage = '';

  if (image) {
    cardImage = `http://localhost:8000/${image}`;
  }

  return (
    <Grid item sx={{width: '280px'}}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={author} />
        {image ? (
          <CardMedia image={cardImage} title={author} sx={{height: 0, paddingTop: '56.25%'}} />
        ) : null}
        <CardContent>
          <Typography variant="body1">{message}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GuestItem;