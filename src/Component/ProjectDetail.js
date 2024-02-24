import React, { useEffect, useState } from 'react';
import { Button, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import { Sampledesigndata } from '../Shared/ListOfSample';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Slider from 'react-slick';
import { Designstyledata } from '../Shared/ListOfDesign';


export default function ProjectDetail() {
  const sample = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };
  const [sampleDetail, setSampleDetail] = useState(null);
  useEffect(() => {
    fetch(`https://65a68cd574cf4207b4f05588.mockapi.io/api/swp/SampleProject/${sample.id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
     
    }).then(data => {
      setSampleDetail(data)
      
    }).catch(error => {
      console.log(error);
    })
  }, [])
  if (!sampleDetail) return null;
  return (
    <div className="container" >
      <Typography variant='h4' sx={{backgroundColor:'rgba(255,200,20,0.5)', textAlign:'center'}}>{sampleDetail.name}</Typography>
      <Typography>{sampleDetail.info}</Typography>
      <Typography>Project Info: </Typography>
      <ul>
        <li>Project: {sampleDetail.name}</li>
        <li>Style: {sampleDetail.style}</li>
        <li>Price: {sampleDetail.price}</li>
      </ul>
      <Slider {...settings}>
        {Designstyledata.map((designData) => (
          <Paper key={designData.id} sx={{ display: 'flex', justifyContent: 'center'}}>
            
              <CardMedia
                sx={{ height: 400, objectFit: 'cover' }}
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
            
          </Paper>
        ))}
      </Slider>
      <div>
        <nav className='room-section'>
          <ul>
            <li className='section-title'><a href="#kitchen">interior design for {sampleDetail.name}'s Kitchen</a></li>
            <li className='section-title'><a href="#Living">interior design for {sampleDetail.name}'s Living Room</a></li>
            <li className='section-title'><a href="#Bed">interior design for {sampleDetail.name}'s Bed Room</a></li>
          </ul>
        </nav>

        <section id="kitchen" className="section">
          <h2>interior design for {sampleDetail.name}'s Kitchen</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
            </Grid>
            {/* Add more Grid items as needed */}
          </Grid>
        </section>

        <section id="Living" className="section">
          <h2>interior design for {sampleDetail.name}'s Living Room</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
            </Grid>
            {/* Add more Grid items as needed */}
          </Grid>
        </section>
        
        <section id="Bed" className="section">
          <h2>interior design for {sampleDetail.name}'s Bed Room</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
            </Grid>
            {/* Add more Grid items as needed */}
          </Grid>
        </section>
      </div>
    </div>
  );
}
