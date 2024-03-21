import { Box, Grid, Typography, Button } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Quotationbanner() {
  return (
    <div className='container'>
      <Link to='/Quotepage' style={{textDecoration:'none'}}>
      <Box
        sx={{
          marginTop: 4,
          border: 1,
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          backgroundImage: "url('https://www.integrichain.com/wp-content/uploads/2022/07/contract-banner.jpg')",
          backgroundSize: 'cover', // Ensure the background image covers the entire box
        }}
      >

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant='h4' sx={{ color: '#18FF15', padding: 6, fontWeight: "bold" }}>
              Đăng Kí Ngay
            </Typography>
            <Typography variant='h6' sx={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 5, color: 'black', padding: 6, textAlign: 'center', textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}>

              Để nhận được báo giá thiết kế, thi công nội thất nhanh và chính xác nhất. Vui lòng liên hệ quaHotline:0123456789. Cảm ơn!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
              <Button
                variant='contained'
                sx={{width:'200px', backgroundColor: '#f9a11b', color: 'white', '&:hover': { backgroundColor: yellow[700] } }}
              >
                Nhận Báo Giá 
              </Button>
            
          </Grid>
        </Grid>
      </Box>
      </Link>
    </div>
  );
}
