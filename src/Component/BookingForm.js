import { Typography, Button, Form, Input, Select } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;

function BookingForm() {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const userId = localStorage.getItem('userId');
  const initialValues = {
    projectName: '',
    location: '',
    type:'',
    additionalRequests: ''
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    additionalRequests: Yup.string()
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/designStyle/getAllDesign', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setStyles(response.data?.data); // Set styles with the array of style objects
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values.location)
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://furniture-quote.azurewebsites.net/project/createProject?userId=${userId}&status=NEW`, 
        {
          name: values.projectName,
          location: values.location,
          type: values.type,
          designStyleId: selectedStyle, // You need to set this value to the selectedStyle state
          sample: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          // setStyles(response.data?.data); // Set styles with the array of style objects
          console.log(response?.data)
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };
    fetchData();
  };

  return (
    <div className='container'>
      <Typography.Title level={4} style={{ marginBottom: '16px' }}>
        Đăng kí mẫu thiết kế
      </Typography.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formikProps => (
          <Form onSubmit={formikProps.handleSubmit}>
            <Form.Item label="Tên Dự Án" required>
              <Input
                name="projectName"
                value={formikProps.values.projectName}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              {formikProps.errors.projectName && formikProps.touched.projectName && (
                <div style={{ color: 'red' }}>{formikProps.errors.projectName}</div>
              )}
            </Form.Item>
            <Form.Item label="Địa Điểm" required>
              <Input
                name="location"
                value={formikProps.values.location}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              {formikProps.errors.location && formikProps.touched.location && (
                <div style={{ color: 'red' }}>{formikProps.errors.location}</div>
              )}
            </Form.Item>
            <Form.Item label="Loại Dự Án" required>
            <Input
                name="type"
                value={formikProps.values.type}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              {formikProps.errors.type && formikProps.touched.type && (
                <div style={{ color: 'red' }}>{formikProps.errors.type}</div>
              )}
            </Form.Item>
            <Form.Item label="Ghi Chú (Thông tin ngôi nhà, ngân sách, ...)">
              <TextArea
                name="additionalRequests"
                value={formikProps.values.additionalRequests}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                placeholder="Chọn Phong Cách Thiết Kế"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={styles.map(option => ({ value: option.id, label: option.name }))}
                onChange={(value) => { setSelectedStyle(value); }} // Handle select change
                value={selectedStyle} // Set selected value
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" onClick={formikProps.handleSubmit}>Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookingForm;
