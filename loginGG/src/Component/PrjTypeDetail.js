import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Sampledesigndata } from '../Shared/ListOfSample'
import { Link } from 'react-router-dom'

export default function PrjTypeDetail() {
  return (
    <>
        <Typography variant='h2' sx={{backgroundColor:'rgba(255,200,20,0.5)'}}>Apartment Project</Typography>
        <Container sx={{ paddingTop: 6 }}>
        <Grid container spacing={2}>
          {Sampledesigndata.map((sample) => (
            <Grid item key={sample.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={sample.img}
                  title={sample.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="#f9a11b">
                    {sample.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {`Design style: ${sample.style}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`detail/${sample.id}`}>
                    <Button size="small">Detail</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
