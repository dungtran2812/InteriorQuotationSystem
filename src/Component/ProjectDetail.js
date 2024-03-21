import { Box, Button, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';


export default function ProjectDetail() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [sampleDetail, setSampleDetail] = useState(null);
  const [roomDataList, setRoomDataList] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  useEffect(() => {
    fetch(`https://furniture-quote.azurewebsites.net/quote/getAllQuoteByProjectId?projectId=${id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setSampleDetail(data.data);
        setRoomDataList(data.data.withAllQuoteDetailDTOList)
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!sampleDetail) return null;

  return (
    <div className="container">
      <Typography variant='h4' sx={{ backgroundColor: 'rgba(255,200,20,0.5)', textAlign: 'center' }}>{sampleDetail.projectDTO.name}</Typography>
      <Typography>{sampleDetail.info}</Typography>
      <Typography>Thông Tin Dự Án: </Typography>
      <ul>
        <li>Tên Dự Án: {sampleDetail.projectDTO.name}</li>
        <li>Phong Cách Thiết Kế: {sampleDetail.projectDTO.designStyleName}</li>
        <li>Chi Phí Thi Công Theo Loại Dự Án: {sampleDetail.constructionPriceType}</li>
        <li>Chi Phí Thiết Kế: {sampleDetail.constructionPriceDesign}</li>
        <li>Tổng Chi Phí: {sampleDetail.totalPrice}</li>
      </ul>
      {console.log(sampleDetail)}
      <Slider {...settings}>
        {roomDataList.map((room) => (
          <Paper key={room.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
            <CardMedia
              component="img"
              height="200"
              image={room.img}
              alt={room.roomName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align="center">
                {room.roomName}
              </Typography>
              <Typography gutterBottom variant="h5" component="div" align="center">
                Diện Tích : {room.area} (m2)
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <a href={`#${room.roomName.toLowerCase()}`}>
                <Button variant="contained" size="small">
                  Chi Tiết
                </Button>
              </a>
            </CardActions>
          </Paper>
        ))}
      </Slider>


      <div>
        {roomDataList && roomDataList.length > 0 && roomDataList.map((room, index) => (
          <section id={room.roomName.toLowerCase()} className="section" key={index}>
            <h2>Thiết Kế Nội Thất {room.roomName} của {sampleDetail.projectDTO.name}</h2>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={4} key={index}>
                <img className="responsive-image" src={room.img} alt='' />

              </Grid>
              <Grid item xs={12} sm={4} key={index}>
                <img className="responsive-image" src={room.img} alt='' />

              </Grid>
              <Grid item xs={12} sm={4} key={index}>
                <img className="responsive-image" src={room.img} alt='' />

              </Grid>

            </Grid>
          </section>
        ))}
      </div>

      <Box sx={{
        backgroundImage: "url('https://kretzerfirm.com/wp-content/uploads/2019/08/handshake-agreement-laws.jpg')",
        backgroundSize: 'cover', height: '250px', marginBottom: '40px'
      }}>
        <div className='image-wrapper'>
          <Typography color={'white'}>Chọn Dự Án Mẫu ở trên </Typography>

          <Typography color={'#f9a33d'}>Hoặc đăng ký dự án mới tại đây</Typography>
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
