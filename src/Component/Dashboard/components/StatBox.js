import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default function ActionAreaCard({title, data, imageSrc}) {
  return (
    <Card>  
        <CardMedia
          component="img"
          height="240"
          image={imageSrc}
          alt="imgDashboard"
        />
        <CardContent>
          <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h5">
            {title}
          </Typography>
          <Typography variant="h5">
            {data}
          </Typography>
          </Stack>
        </CardContent>
     
    </Card>
  );
}
