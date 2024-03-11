import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const RoomAreaForm = ( props ) => {
  const [area, setArea] = useState('');

  const onFinish = async () => {
    try {
      console.log(props)
      const response = await fetch('https://furniture-quote.azurewebsites.net/quote/createQuoteForProject?status=NEW', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        body: JSON.stringify({
          projectId: props.projectId,
          area: area,
          roomId:props.roomId
        }),
      });

      if (response.ok) {
        message.success('Area submitted successfully');
        // Additional logic if needed after successful submission
      } else {
        message.error('Failed to submit area');
      }
    } catch (error) {
      console.error('Error submitting area:', error);
      message.error('Failed to submit area');
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
        label="Area"
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoomAreaForm;
