import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RoomAreaForm = (props) => {
  const [area, setArea] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [quoteId, setQuoteId] = useState(null);
  const onFinish = async () => {

    if (roomId == null || roomId !== props.roomId) {
      try {
        console.log(props)
        const response = await axios.post('https://furniture-quote.azurewebsites.net/quote/createQuoteForProject?status=NEW',
          {
            projectId: props.projectId,
            area: area,
            roomId: props.roomId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },

          });

        if (response.status === 200) {
          message.success(`Diện Tích Phòng Đã Được Lưu`);
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
      message.error('Đã Lưu Diện Tích Phòng Này Rồi !')
    }


  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <Form
      name="roomAreaForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline"
    >
      <Form.Item
        name="area"
        label="Diện Tích Phòng"
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
  );
};

export default RoomAreaForm;
