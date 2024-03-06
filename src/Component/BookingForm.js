import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    checkInDate: '',
    checkOutDate: '',
    additionalRequests: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //  handle form submission, sending data to server, processing it
    console.log(formData);
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      cost:'',
      additionalRequests: ''
    });
  };

  return (
    <Container maxWidth="sm" >
      <Typography variant="h4" gutterBottom>
        Đăng kí mẫu thiết kế
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Họ tên của bạn"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Điền số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngân Sách"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Thông tin ngôi nhà (số phòng ngủ, diện tích,...)"
              multiline
              rows={4}
              name="additionalRequests"
              value={formData.additionalRequests}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Gửi
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default BookingForm;
