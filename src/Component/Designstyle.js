import React from 'react';
import Slider from 'react-slick';
import { Box, Paper, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Block, Image } from '@mui/icons-material';
import { Designstyledata } from '../Shared/ListOfDesign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

  return (
    
    <Box sx={{ paddingTop: 6 }}>
      <Box sx={{paddingBottom: 4, display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <TrendingUpIcon/>
        <Typography variant='h4'> Hot design trend in 2024 </Typography>
        <TrendingUpIcon/>
        </Box>
      <Slider {...settings}>
        {Designstyledata.map((designData) => (
          <Paper key={designData.id} sx={{ padding: 2,display: 'flex', justifyContent: 'center' }}>
            {/* Adjust the structure based on your design data */}
            <Typography variant="h5">{designData.title}</Typography>
            <img src={designData.img} alt={designData.title} style={{width:"100%", height:450}}/>
            <Typography>{designData.description}</Typography>
          </Paper>
        ))}
      </Slider>
    </Box>
  );
};

export default Designstyle;
