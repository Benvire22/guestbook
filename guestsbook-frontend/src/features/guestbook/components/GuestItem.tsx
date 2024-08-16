import React from 'react';
import { Card, CardContent, CardHeader, Grid, CardMedia, Typography } from '@mui/material';

interface Props {
  author: string;
  message: string;
  image: string | null;
}

const GuestItem: React.FC<Props> = ({author, message, image}) => {
  let cardImage = '';

  if (image) {
    cardImage = `http://localhost:8000/${image}`;
  }

  return (
    <Grid item>
      <Card variant="outlined" sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        mb: 2
      }}>
        <CardHeader title={author} sx={{width: '100%', borderBottom: '2px solid #ededed'}} />
        <CardContent sx={{display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant="body1" width="90%">{message}</Typography>
          {image ? (
            <CardMedia
              image={cardImage}
              title={author}
              sx={{height: '100px', width: '100px', borderRadius: '50%', border: '2px solid #e4eded'}} />
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GuestItem;