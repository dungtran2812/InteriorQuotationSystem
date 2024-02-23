import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { Sampledesigndata } from '../../Shared/ListOfSample';
import { Link } from 'react-router-dom';

export default function Sampledesign() {
  const [sampleList, setSampleList] = useState(null);
  useEffect(() => {
    fetch('https://65a68cd574cf4207b4f05588.mockapi.io/api/swp/SampleProject', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
     
    }).then(data => {
      setSampleList(data)
    }).catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <>
      <Container sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Typography variant='h4' sx={{ paddingLeft: '2%', paddingRight: '2%', fontWeight: "bold" }}>Sample design</Typography>

      </Container>
      <Container sx={{ paddingTop: 6 }}>
        <Grid container spacing={4}>
          { sampleList.map((sample) => (
            <Grid item key={sample.id} xs={12} md={4} >
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
      <Container sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={'/Sampleprojectpage'} style={{ textDecoration: 'none' }}><Typography variant='h6' sx={{ border: 1, textDecoration: 'none', padding: 2 }}>Watch More</Typography></Link>
      </Container>
    </>
  )
}
