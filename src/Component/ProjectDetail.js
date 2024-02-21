import React from 'react'
import { Sampledesigndata } from '../Shared/ListOfSample';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function ProjectDetail() {
    const prjName = useParams();
    const prj = Sampledesigndata.find(obj => {
        return obj.id === prjName.id;  
    });
  return (
    <>
    <Typography variant='h4' sx={{backgroundColor:'rgba(255,200,20,0.5)'}}>{prj.name}</Typography>
    <div>
      <nav>
        <ul>
          <li><a href="#section1">Section 1</a></li>
          <li><a href="#section2">Section 2</a></li>
          <li><a href="#section3">Section 3</a></li>
        </ul>
      </nav>

      <section id="section1">
        <h2>Section 1</h2>
        <p>This is the content of section 1.</p>
      </section>

      <section id="section2">
        <h2>Section 2</h2>
        <p>This is the content of section 2.</p>
      </section>

      <section id="section3">
        <h2>Section 3</h2>
        <p>This is the content of section 3.</p>
      </section>
    </div>
    </>
    
  )
}
