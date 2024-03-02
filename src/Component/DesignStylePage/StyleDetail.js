import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function StyleDetail() {
  const [styleDetail, setStyleDetail] = useState(null);
  const designStyle = useParams();
  useEffect(() => {

    fetch(`https://furniture-quote.azurewebsites.net/designStyle/getDesignById?id=${designStyle.id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

    }).then(data => {
      setStyleDetail(data.data)

    }).catch(error => {
      console.log(error);
    })
  }, [])
  if (!styleDetail) return null;
  return (
    <div className='container'>
      <Typography variant='h4' sx={{ backgroundColor: 'rgba(255,200,20,0.5)', textAlign: 'center' }}>{styleDetail.name}</Typography>
      <strong>Tổng quan về thiết kế :</strong>
      <Typography>{styleDetail.description}</Typography>
      <p>&gt;&gt; Xem thêm:</p>
      <ul>
        <li> Các Mẫu Thiết Kế Nội Thất Nhà Phố Đẹp {styleDetail.name}</li>
        <li> Các Mẫu Thiết Kế Nội Thất Chung Cư Đẹp {styleDetail.name}</li>
      </ul>
      <img className='img-sample' src="https://i.pinimg.com/originals/bc/9e/b6/bc9eb68653d62ce7b5ee018c6ffc1796.jpg" />

    </div>

  )
}
