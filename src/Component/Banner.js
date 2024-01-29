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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 3000,
  };

  return (
    <Box >
        <Slider {...settings}>
          <Paper sx={{ display: 'flex', justifyContent: 'center'}}> 
            <img src='../images/banner.png' style={{width:"100%", height:450}}/>
            
          </Paper>
          <Paper sx={{ display: 'flex', justifyContent: 'center'}}>
          <img src='../images/banner2.png' style={{width:"100%", height:450}}/>
            
          </Paper >
          <Paper sx={{ display: 'flex', justifyContent: 'center'}}>
          <img src='../images/banner3.jpg' style={{width:"100%", height:450}}/>
            
          </Paper>
        </Slider>
    </Box>
  );
};

export default Banner;