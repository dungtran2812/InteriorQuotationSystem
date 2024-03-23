import { Typography, Button, Form, Input, Select, message } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuoteContext } from '../Context/QuoteContext';

const { TextArea } = Input;

function BookingForm({setLoadAgain}) {
  const {projectId, setProjectId} = useContext(QuoteContext);
  const [projectType, setProjectType] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const userId = localStorage.getItem('userId');
  const initialValues = {
    projectName: '',
    location: '',
    type: '',
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
          console.log('cai nay la style',response)
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
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/type/getAllType', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          console.log('cai nay la type',response)
          setProjectType(response.data?.data); // Set styles with the array of style objects
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
            typeId: selectedType,
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
          
          setProjectId(response.data?.data);
          setLoadAgain(true)
          console.log('cai nay la project id',response.data?.data)
          
          message.success('Tạo Dự Án Thành Công')
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
    <div className='container' style={{ width: '79%' , marginBottom:'40px'}}>
      <Typography.Title level={4} style={{ marginBottom: '16px' }}>
        Đăng kí dự án mới
      </Typography.Title>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
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
              <Select
                showSearch
                placeholder="Chọn Loại Dự Án"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={projectType.map(option => ({ value: option.id, label: option.name }))}
                onChange={(value) => {
                  console.log("value: " , value);
                   setSelectedType(value); 
                  }} // Handle select change
                value={selectedType} // Set selected value
              />
            </Form.Item>
            
            <Form.Item label="Phong Cách Thiết Kế" required>
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
            <Button type="primary" htmlType="submit" onClick={formikProps.handleSubmit}>Tạo Dự Án</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BookingForm;
