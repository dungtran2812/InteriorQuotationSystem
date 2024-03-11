import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ReactComponent as Step1 } from '../../SvgIcon/icon1.svg';
import { ReactComponent as Step2 } from '../../SvgIcon/icon2.svg';
import { ReactComponent as Step3 } from '../../SvgIcon/icon3.svg';
import { ReactComponent as Step4 } from '../../SvgIcon/icon4.svg';
import { ReactComponent as Step5 } from '../../SvgIcon/icon5.svg';
export default function Workflowpage() {
    return (
    <Box sx={{paddingBottom:5}}>
        <Typography variant='h4' sx={{paddingTop:12, textAlign:'center',fontWeight:"bold"}}>Quy trình làm việc của chúng tôi</Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center" paddingTop={8}>
      <Grid item xs={2}>
        <Step1 />
      </Grid>
      <Grid item xs={2}>
        <Step2 />
      </Grid>
      <Grid item xs={2}>
        <Step3 />
      </Grid>
      <Grid item xs={2}>
        <Step4 />
      </Grid>
      <Grid item xs={2}>
        <Step5 />
      </Grid>
    </Grid>
    <Grid container spacing={2} alignItems="center" justifyContent="center" >
      <Grid item xs={2}>
        <Typography sx={{fontWeight:'bold'}}>Step1</Typography>
        <Typography>CHOOSE A DESIGN</Typography>
      </Grid>
      <Grid item xs={2}>
      <Typography sx={{fontWeight:'bold'}}>Step2</Typography>
      <Typography>DESIGN CONSULTANCY</Typography>
      </Grid>
      <Grid item xs={2}>
      <Typography sx={{fontWeight:'bold'}}>Step3</Typography>
      <Typography>GET QUOTE</Typography>
      </Grid>
      <Grid item xs={2}>
      <Typography sx={{fontWeight:'bold'}}>Step4</Typography>
      <Typography>START CONSTRUCTION</Typography>
      </Grid>
      <Grid item xs={2}>
      <Typography sx={{fontWeight:'bold'}}>Step5</Typography>
      <Typography>ACCEPTANCE AND WARRANTY</Typography>
      </Grid>
    </Grid>
    </Box>

    )
}
