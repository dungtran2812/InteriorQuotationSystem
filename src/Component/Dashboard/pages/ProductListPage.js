import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import SidebarComponent from '../components/Sidebar';

const { Option } = Select;
const { confirm } = Modal;

export default function ProductListPage() {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch product types
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/product/getAllType', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setProductTypes(response.data.data);
        } else {
          throw new Error('Failed to fetch product types');
        }
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    // Fetch products by type when selectedType changes
    const fetchProductsByType = async () => {
      try {
        if (selectedType) {
          const response = await axios.get(`https://furniture-quote.azurewebsites.net/product/getAllProductByType?type=${selectedType}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
          });
          if (response.status === 200) {
            setProducts(response.data.data);
          } else {
            throw new Error('Failed to fetch products by type');
          }
        }
      } catch (error) {
        console.error('Error fetching products by type:', error);
      }
    };

    fetchProductsByType();
  }, [selectedType]);

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleUpdate = (record) => {
    form.setFieldsValue({
      ...record,
      productId: record.id // Assuming the productId is stored in the 'id' field of the record
    });
    confirm({
      title: 'Update Product',
      content: (
        <Form
          form={form}
          layout="vertical"
          onFinish={updateProduct}
        >
          <Form.Item name="productId" noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="height" label="Height" rules={[{ required: true, message: 'Please enter the height' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="length" label="Length" rules={[{ required: true, message: 'Please enter the length' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="width" label="Width" rules={[{ required: true, message: 'Please enter the width' }]}>
            <InputNumber />
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      )
    });
  };

  const updateProduct = async (values) => {
    try {
        console.log(values)
      const response = await axios.put(`https://furniture-quote.azurewebsites.net/product/updateProduct`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.status === 200) {
        const updatedProducts = products.map(product => {
          if (product.id === values.productId) {
            return { ...product, ...values };
          }
          return product;
        });
        setProducts(updatedProducts);
        Modal.success({
          title: 'Success',
          content: 'Product updated successfully',
        });
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Modal.error({
        title: 'Error',
        content: 'Failed to update product',
      });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
      },
      {
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
      },
      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
      },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
      ),
    },
  ];

  return (
    <div className='dashboard-page'>
      <SidebarComponent />
      <div style={{ display: 'block' }}>
        <h2>Product List</h2>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="productType">Chọn Loại Sản Phẩm:</label>
          <Select id="productType" value={selectedType} onChange={handleTypeChange} style={{ width: 200 }}>
            <Option value="">-- Select Type --</Option>
            {productTypes.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </div>
        <Table columns={columns} dataSource={products} />
      </div>
    </div>
  );
}
