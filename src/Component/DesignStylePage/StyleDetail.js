import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function StyleDetail() {
    const [styleDetail, setStyleDetail] = useState(null);
    const designStyle = useParams();
  useEffect(() => {
   
    fetch(`https://furniture-quote.azurewebsites.net/designStyle/getAllDesign/${designStyle.id}`, {
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
    console.log(styleDetail)
  )
}
