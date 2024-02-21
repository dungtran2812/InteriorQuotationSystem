import React from 'react'
import { Sampledesigndata } from '../Shared/ListOfSample';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';


export default function ProjectDetail() {
    const prjName = useParams();
    const prj = Sampledesigndata.find(obj => {
        return obj.id === prjName.id;  
    });
  return (
    <>
    <Typography variant='h4' sx={{backgroundColor:'rgba(255,200,20,0.5)'}}>{prj.name}</Typography>
    <Typography>{prj.info}</Typography>
    <Typography>Project Info: </Typography>
    <ul>
        <li>Project: {prj.name}</li>
        <li>Style: {prj.style}</li>
        <li>Price: {prj.price}</li>
    </ul>
    <div>
      <nav>
        <ul>
          <li><a href="#kitchen">interior design for {prj.name}'s Kitchen</a></li>
          <li><a href="#Living">interior design for {prj.name}'s Living Room</a></li>
          <li><a href="#Bed">interior design for {prj.name}'s Bed Room</a></li>
        </ul>
      </nav>

      <section id="kitchen">
        <h2>interior design for {prj.name}'s Kitchen</h2>
        <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://www.lanha.vn/wp-content/uploads/2023/10/3649ac5b68fbbca5e5ea7.jpg' alt=''/>
      </Grid>
      {/* Add more Grid items as needed */}
    </Grid>
      </section>

      <section id="Living">
        <h2>interior design for {prj.name}'s Living Room</h2>
        <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-0.jpg' alt=''/>
      </Grid>
      {/* Add more Grid items as needed */}
    </Grid>
      </section>
      
      <section id="Bed">
        <h2>interior design for {prj.name}'s Bed Room</h2>
        <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <img className="responsive-image" src='https://noithatanmoc.vn/wp-content/uploads/2024/02/Thiet-ke-noi-that-chung-cu-Diamond-Alnata-8.jpg' alt=''/>
      </Grid>
      {/* Add more Grid items as needed */}
    </Grid>
      </section>
    </div>
    </>
    
  )
}
