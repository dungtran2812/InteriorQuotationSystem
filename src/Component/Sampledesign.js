import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import { Sampledesigndata } from '../Shared/ListOfSample';
import { Link } from 'react-router-dom';

export default function Sampledesign() {
  return (
    <>
    <Container sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DesignServicesOutlinedIcon />
        <Typography variant='h4' sx={{paddingLeft:'2%',paddingRight:'2%',fontWeight:"bold"}}>Sample design</Typography>
        <DesignServicesOutlinedIcon />
      </Container>
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
                  <Typography gutterBottom variant="h5" component="div">
                    {sample.name}
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
      <Container sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={'/Sampleprojectpage'} style={{ textDecoration: 'none'}}><Typography variant='h6' sx={{border:1, textDecoration: 'none', padding:2}}>Watch More</Typography></Link>
      </Container>
    </>
  )
}
