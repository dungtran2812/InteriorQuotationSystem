import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sampledesign() {
  const [sampleList, setSampleList] = useState([]);
  useEffect(() => {
    fetch('https://furniture-quote.azurewebsites.net/quote/getAllQuoteByProjectSample?isSample=true', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
     
    }).then(data => {
      console.log(data.data)
      setSampleList(data.data)
      
    }).catch(error => {
      console.log(error);
    })
  
  }, [])
 
  if (!sampleList) return null;
  return (
    <>
      <Container sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Typography variant='h4' sx={{ paddingLeft: '2%', paddingRight: '2%', fontWeight: "bold" }}>Dự Án Mẫu</Typography>

      </Container>
      <Container sx={{ paddingTop: 6 }}>
        <Grid container spacing={4}>
          {sampleList.map((sample) => (
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
                    {`Phong Cách: ${sample.designStyleName}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`detail/${sample.id}`}>
                    <Button size="small" >Chi TIết</Button>
                  </Link>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={`/sampleprojectpage/`} style={{ textDecoration: 'none' }}><Typography variant='h6' sx={{ border: 1, textDecoration: 'none', padding: 2 }}>Xem Thêm</Typography></Link>

      </Container>
    </>
  )
}
