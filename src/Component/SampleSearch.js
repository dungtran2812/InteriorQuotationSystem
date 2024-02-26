import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SampleSearch() {
  const [sampleList, setSampleList] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    fetch('https://65a68cd574cf4207b4f05588.mockapi.io/api/swp/SampleProject', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(data => {
      setSampleList(data);
      console.log(sampleList);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };
  
  let filteredSamples = [];
  if (sampleList) {
    filteredSamples = sampleList.filter(sample =>
        sample.name.toLowerCase().includes(searchTerm.toLowerCase())
        
      );
      filteredSamples = sampleList.filter(sample =>
          sample.style.toLowerCase().includes(selectedStyle.toLowerCase())
          
        );
  }
    
  

  if (!sampleList) return null;

  return (
    <>
      <Container sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' sx={{ paddingLeft: '2%', paddingRight: '2%', fontWeight: "bold" }}>Sample design</Typography>
      </Container>
      <Container sx={{ paddingTop: 2 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>
      <Container sx={{ paddingTop: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="style-select-label">Design Style</InputLabel>
          <Select
            labelId="style-select-label"
            id="style-select"
            value={selectedStyle}
            onChange={handleStyleChange}
            label="Design Style"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Modern">Modern</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Vintage">Vintage</MenuItem>
            {/* Add other design styles as needed */}
          </Select>
        </FormControl>
      </Container>
      <Container sx={{ paddingTop: 6 }}>
        <Grid container spacing={4}>
          {filteredSamples.map((sample) => (
            <Grid item key={sample.id} xs={12} md={4} >
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={sample.img}
                  title={sample.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="#f9a11b">
                    {sample.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {`Design style: ${sample.style}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`detail/${sample.id}`}>
                    <Button size="small">Detail</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ paddingTop: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={'/Sampleprojectpage'} style={{ textDecoration: 'none' }}><Typography variant='h6' sx={{ border: 1, textDecoration: 'none', padding: 2 }}>Watch More</Typography></Link>
      </Container>
    </>
  );
}
