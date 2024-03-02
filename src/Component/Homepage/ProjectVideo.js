import { Box, Typography } from '@mui/material'
import React from 'react'

export default function ProjectVideo() {
    return (
        <div className='container'>
            
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <Typography variant='h4' sx={{paddingBottom:5, fontWeight:'bold'}}> Video Thi Công</Typography>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/yzpcyGJ2wD0?si=thLhvLBk1F8vN58w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Box>
        </div>
    )
}
