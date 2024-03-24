import React, { useContext, useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import axios from 'axios';
import { QuoteContext } from '../../../Context/QuoteContext';

const CreateSampleRoom = (props) => {
    const [imageSrc, setImageSrc] = useState(null)
  const [area, setArea] = useState('');
  const [roomId, setRoomId] = useState(null);
  const {quoteId, setQuoteId} = useContext(QuoteContext);
  const onFinish = async () => {

    if (roomId == null || roomId !== props.roomId) {
      try {
        console.log(props)
        const response = await axios.post(`https://furniture-quote.azurewebsites.net/quote/createQuoteForProjectSample?projectId=${props.projectId}&roomId=${props.roomId}&area=${area}&status=ACTIVE`,
          {
            fileImg: imageSrc,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              
            },

          });
          
        if (response.status === 200) {
          message.success(` Phòng Đã Được Lưu`);
          console.log(response.data.data);
          setRoomId(props.roomId);
          setQuoteId(response.data.data)
          
          //lưu quote id chỗ này
        } else {
          message.error('Failed to submit area');
        }
      } catch (error) {
        message.error('Failed to submit area');
      }

    } else {
      message.error('Đã Lưu Phòng Này Rồi !')
    }


  };
  const handleBeforeUpload = (file) => {
    // Check if the file is an image
    console.log(file)
    setImageSrc(file)

};
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <>
    <Upload.Dragger
                accept='.png,.jpeg,.doc'
                beforeUpload={(file) => handleBeforeUpload(file)}
                maxCount={1}
                style={{marginBottom:'50px'}}
            >
                Ảnh của phòng cho dự án mẫu <br/>
                <Button>Click to upload</Button>
            </Upload.Dragger>
        <Form
          name="roomAreaForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="inline"
        >
          <Form.Item
            name="area"
            label="Diện Tích Phòng (m2): "
            rules={[
              {
                required: true,
                message: 'Please input the area of the room!',
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter area"
              onChange={(e) => setArea(e.target.value)}
            />
          </Form.Item>
          
          
          <Form.Item>
            
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default CreateSampleRoom;
