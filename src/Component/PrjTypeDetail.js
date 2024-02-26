import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Sampledesigndata } from '../Shared/ListOfSample'
import { Link } from 'react-router-dom'

export default function PrjTypeDetail() {
  return (
    //project detail page: quote table, sample of project. Using project category to render quote section
    <div className='container'>
      
        <Typography variant='h4' sx={{backgroundColor:'rgba(255,200,20,0.5)', textAlign:'center'}}>Dự án chung cư</Typography>
        <strong >Báo giá thi công nội thất chung cư trọn gói</strong>
        <p className='quote-title'>Để có thông tin chi tiết và báo giá phù hợp với căn hộ của bạn, chúng tôi đề xuất bạn liên hệ trực tiếp với chúng tôi. Chi phí hoàn thiện phần thô thực tế phụ thuộc vào nhiều yếu tố như mặt bằng công trình, yêu cầu cụ thể của khách hàng về mẫu mã, chất liệu, kích thước và các yếu tố khác. Chúng tôi sẽ cung cấp thông tin chi tiết và tư vấn cho bạn để đảm bảo rằng dự án của bạn được thực hiện đúng theo mong muốn và ngân sách của bạn. Đừng ngần ngại liên hệ với chúng tôi để biết thêm thông tin.</p>
        <strong>Báo giá hoàn thiện phần thô chung cư</strong> <br/>
        <p>Dịch vụ này bao gồm việc hoàn thiện những phần cơ bản của căn hộ, tạo nền móng cho các công đoạn hoàn thiện nội thất và tiện nghi.</p>
        <img className='quote-image' src='../images/Quoteraw.jpg' alt=''/><br/>
        
        <strong>Báo giá hoàn thiện nội thất căn hộ chung cư</strong>
        <p>Dịch vụ này bao gồm việc tạo ra không gian sống tiện nghi, thoải mái và thẩm mỹ bằng cách lắp đặt và hoàn thiện các thành phần nội thất từ phòng khách, phòng ngủ, nhà bếp đến nhà tắm.</p><br/>
        <img className='quote-image' src='../images/furniture1bedroom.png' alt=''/> <br/>
        
        <strong>Báo giá nội thất căn hộ 1 phòng ngủ</strong>
        <p>Báo giá chi tiết cho việc hoàn thiện nội thất cho căn hộ 1 phòng ngủ của quý vị. Dịch vụ này nhằm mục đích tạo ra một không gian sống thoải mái, tiện nghi và thẩm mỹ cho gia đình bạn.</p><br/>
        <img className='quote-image' src='../images/furniture1bedroom-part2.png' alt=''/> <br/>
        <Container sx={{ paddingTop: 6 }}>
        <Typography variant='h5' sx={{backgroundColor:'rgba(255,200,20,0.5)', textAlign:'center', marginBottom:'20px'}}>Những dự án chung cư tiêu biểu</Typography>
        <Grid container spacing={2}>
          
          {Sampledesigndata.map((sample) => (
            <Grid item key={sample.id} xs={12} lg={4}>
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
    </div>
  )
}
