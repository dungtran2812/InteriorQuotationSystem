import { Box, Button, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Designstyledata } from '../Shared/ListOfDesign';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ProjectDetail() {
  const navigation = useNavigate();
  const { id } = useParams();
  
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
    fetch(`https://furniture-quote.azurewebsites.net/project/getProjectById?id=${id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setSampleDetail(data.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!sampleDetail) return null;

  return (
    <div className="container">
      <Typography variant='h4' sx={{ backgroundColor: 'rgba(255,200,20,0.5)', textAlign: 'center' }}>{sampleDetail.name}</Typography>
      <Typography>{sampleDetail.info}</Typography>
      <Typography>Thông Tin Dự Án: </Typography>
      <ul>
        <li>Tên Dự Án: {sampleDetail.name}</li>
        <li>Phong Cách Thiết Kế: {sampleDetail.designStyleName}</li>
        <li>Ngân Sách: {sampleDetail.price}</li>
      </ul>
      <Slider {...settings}>
        {Designstyledata.map((designData) => (
          <Paper key={designData.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
            <CardMedia
              component="img"
              height="200"
              image={designData.img}
              alt={designData.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align="center">
                {designData.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Link to={`detail/${designData.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small">
                  Chi Tiết
                </Button>
              </Link>
            </CardActions>
          </Paper>
        ))}
      </Slider>

      <div>
        <nav className='room-section'>
          <ul>
            <li className='section-title'><a href="#kitchen">Thiết Kế Nội Thất Bếp của {sampleDetail.name}</a></li>
            <li className='section-title'><a href="#Living">Thiết Kế Nội Thất Phòng Khách của {sampleDetail.name}</a></li>
            <li className='section-title'><a href="#Bed">Thiết Kế Nội Thất Phòng Ngủ của {sampleDetail.name}</a></li>
          </ul>
        </nav>

        <section id="kitchen" className="section">
          <h2>Thiết Kế Nội Thất Bếp của {sampleDetail.name}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt='' />
            </Grid>
          </Grid>
        </section>

        <section id="Living" className="section">
          <h2>Thiết Kế Nội Thất Phòng Khách của {sampleDetail.name}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt='' />
            </Grid>
          </Grid>
        </section>

        <section id="Bed" className="section">
          <h2>Thiết Kế Nội Thất Phòng Ngủ của {sampleDetail.name}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt='' />
            </Grid>
            <Grid item xs={12} md={4}>
              <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt='' />
            </Grid>
          </Grid>
        </section>
      </div>

      <Box sx={{
        backgroundImage: "url('https://kretzerfirm.com/wp-content/uploads/2019/08/handshake-agreement-laws.jpg')",
        backgroundSize: 'cover', height: '250px', marginBottom: '40px'
      }}>
        <div className='image-wrapper'>
          <Typography color={'white'}>Gọi 0123456789 để được:</Typography>
          <Typography color={'#f9a33d'}>TƯ VẤN MIỄN PHÍ</Typography>
          <Typography color={'white'}>Hoặc đăng ký thông tin tại đây</Typography>
          <Button onClick={() => navigation('./../../Quotepage')} sx={{
            backgroundColor: '#f9a33d', width: '20%', color: 'black', marginTop: '20px', borderRadius: '20px', '&:hover': {
              backgroundColor: '#239a64',
              color: '#ffffff',
            },
          }}>Đăng ký mẫu thiết kế</Button>
        </div>
      </Box>
    </div>
  );
}
