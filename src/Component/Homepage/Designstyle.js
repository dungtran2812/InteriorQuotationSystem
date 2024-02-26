import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Designstyle = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [styleList,setStyleList] = useState(null)
  useEffect(() => {
    fetch('https://65a68cd574cf4207b4f05588.mockapi.io/api/swp/DesignStyle', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
     
    }).then(data => {
      setStyleList(data)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <Box sx={{ paddingTop: 6 }}>
      <Box sx={{ paddingBottom: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <Typography variant="h4" sx={{paddingLeft:'2%',paddingRight:'2%',fontWeight:"bold"}}> Hot design trends in 2024 </Typography>
        
      </Box>
      <Slider {...settings}>
        {styleList ? (styleList.map((designData) => (
          <Paper key={designData.id} sx={{ display: 'flex', justifyContent: 'center', paddingLeft:'10%'}}>
            <Card sx={{ maxWidth: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}>
              <CardMedia
                sx={{ height: 200, objectFit: 'cover' }}
                image={designData.img}
                title={designData.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
                  {designData.name}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link to={`detail/${designData.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="small">
                    Detail
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Paper>
        ))): <Typography>loading...</Typography>}
      </Slider>
    </Box>
  );
};

export default Designstyle;
