import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Button, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const [projectTypeList, setProjectTypeList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/type/getAllType', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          console.log(response.data);
          setProjectTypeList(response.data.data);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container'>
      {loading ? ( // Show loading indicator if data is being fetched
        <div>Loading...</div>
      ) : (
        <Slider {...settings} >
          {Array.isArray(projectTypeList) && projectTypeList.map((project, index) => (
            <Paper key={index} sx={{ display: 'flex', justifyContent: 'center'}}>
              <CardMedia
                sx={{ height: 500 }}
                image={"https://cdn-i.vtcnews.vn/resize/th/upload/2023/04/13/nha-pho2-22472688.jpg"} // Assuming each project type object has an 'image' property
                title={project.name} // Assuming each project type object has a 'title' property
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Loại Dự Án: {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Giá Thi Công: {project.price} 
                </Typography>
              </CardContent>
              
            </Paper>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Banner;
