import React from 'react';
import Slider from 'react-slick';
import { Box, Paper, Typography } from '@mui/material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Block, Image } from '@mui/icons-material';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 3000,
  };

  return (
    <Box >
        <Slider {...settings} >
          <Paper key={'1'} sx={{ display: 'flex', justifyContent: 'center'}}> 
            <img src='https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?cs=srgb&dl=pexels-pixabay-276724.jpg&fm=jpg' style={{width:"100%", height:600, margin: '0 30px'}}/>
            
          </Paper>
          <Paper key={'2'} sx={{ display: 'flex', justifyContent: 'center'}}>
          <img src='https://i.pinimg.com/originals/95/9d/ab/959dab9ab97b3d3011121fcd3300f861.jpg' style={{width:"100%", height:600, margin: '0 30px'}}/>
            
          </Paper >
          <Paper key={'3'} sx={{ display: 'flex', justifyContent: 'center'}}>
          <img src='https://s1.1zoom.me/b5050/891/357152-svetik_1920x1080.jpg' style={{width:"100%", height:600, margin: '0 30px'}}/>
            
          </Paper>
        </Slider>
    </Box>
  );
};

export default Banner;