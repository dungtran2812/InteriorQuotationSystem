import React from 'react';
import Slider from 'react-slick';
import { Box, Button, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


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
    <Box sx={{ paddingTop: 5 }}>
      <Slider {...settings} >
        <Paper key={'1'} sx={{ display: 'flex', justifyContent: 'center'}}>

          
            <CardMedia
              sx={{ height: 500 }}
              image='https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg'
              title="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Apartment Project
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Apartment description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link to={'apartment-project'}>View Detail</Link></Button>
              
            </CardActions>
          
        </Paper>
        <Paper key={'2'} sx={{  display: 'flex', justifyContent: 'center' }}>
          
          
            <CardMedia
              sx={{ height: 500 }}
              image='https://mgvs.vn/wp-content/uploads/2020/08/biet-thu-nha-pho-1024x538.jpg'
              title="townhouse Project"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Townhouse Project
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Townhouse Project description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              
            </CardActions>
          
        </Paper >
        <Paper key={'3'} sx={{ display: 'flex', justifyContent: 'center'}}>
          
          
            <CardMedia
              sx={{ height: 500 }}
              image='https://ezcloud.vn/wp-content/uploads/2019/03/villa-da-lat-dep-sieu-cap.webp'
              title="Villa Project"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Villa Project
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Villa description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              
            </CardActions>
         
        </Paper>
        <Paper key={'4'} sx={{ display: 'flex', justifyContent: 'center'}}>
          
          
            <CardMedia
              sx={{ height: 500 }}
              image='https://images.livspace-cdn.com/plain/https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2023/05/23163145/modern-office-interior-design-with-partition-plants.jpg'
              title="Villa Project"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Office Project
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Office description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              
            </CardActions>
         
        </Paper>
      </Slider>
    </Box>
  );
};

export default Banner;