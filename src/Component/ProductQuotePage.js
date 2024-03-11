import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Select, Table, Popconfirm, Typography, Input } from 'antd';
import axios from 'axios';
import Title from 'antd/es/typography/Title';

const ProductQuotePage = (resetData) => {
  const [furniture, setFurniture] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/product/getAllProduct?page=0&size=30&sort=id', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setFurniture(response.data.data.content);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      id:'',
      Furniture: '',
      Length: '',
      Width: '',
      Height: '',
      Unit: 'Cm',
      Quantity: 1, // Default quantity set to 1
      UnitPrice: '',
      TotalCost: '',
      Note:'',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = dataSource.map((item) => {
      if (item.key === row.key) {
        const totalCost = (row.Quantity || 0) * (row.UnitPrice || 0);
        return { ...item, ...row, TotalCost: totalCost };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleFurnitureChange = (value, key) => {
    const newData = dataSource.map((item) => {
      
      if (item.key === key) {
        const selectedFurniture = furniture.find(f => f.name === value);
        const totalCost = (item.Quantity || 0) * (selectedFurniture?.price || 0);
        return {
          ...item,
          id: selectedFurniture.id,
          Furniture: value,
          Length: selectedFurniture?.length || '',
          Width: selectedFurniture?.width || '',
          Height: selectedFurniture?.height || '',
          UnitPrice: selectedFurniture?.price || '',
          TotalCost: totalCost,
        };
      }
      return item;
    });
    setDataSource(newData);
    console.log(newData)
  };

  const columns = [
    {
      title: 'Nội Thất',
      dataIndex: 'Furniture',
      width: '10%',
      render: (_, record) => (
        <Select
          showSearch
          placeholder="Select a Furniture"
          optionFilterProp="children"
          onChange={(value) => handleFurnitureChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={furniture.map(option => ({ value: option.name, label: option.name }))}
        />
      ),
    },
    { title: 'Dài', dataIndex: 'Length', width: '5%' },
    { title: 'Rộng', dataIndex: 'Width', width: '5%' },
    { title: 'Cao', dataIndex: 'Height', width: '5%' },
    { title: 'Đơn Vị', dataIndex: 'Unit', width: '5%' },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      width: '5%',
      render: (_, record) => (
        <InputNumber
          min={1}
          defaultValue={record.Quantity}
          onChange={(value) => handleSave({ ...record, Quantity: value })}
        />
      ),
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'Note',
      width: '20%',
      render: (_, record) => (
        <Input 
        placeholder="Ghi Chú"
        onChange={(value) => handleSave({ ...record, Note: value })} />
      ),
    },
    
    { 
      title: 'Đơn Giá', 
      dataIndex: 'UnitPrice', 
      width: '10%',
      render: (text) => (
        
        <span>{parseInt(text).toLocaleString('vi-VN')} VND</span>
      ),
    },
    { 
    title: 'Tổng Tiền', 
    dataIndex: 'TotalCost', 
    width: '10%',
    render: (text) => (
      
      <span>{parseInt(text).toLocaleString('vi-VN')} VND</span>
    ),
  },
    {
      title: 'Chức Năng',
      dataIndex: 'operation',
      render: (_, record) => (
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            Delete
          </Popconfirm>
        ) : null
      ),
    },
  ];
  useEffect(() => {
    if (resetData) {
      setDataSource([]);
      setCount(0);
    }
  }, [resetData]);

  return (
    <div className='table-container'>
      <div className='quotetable-title'>
        <Title level={2}>Bảng Tạm Tính Giá Phần Nội Thất</Title>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Thêm Sản Phẩm
        </Button>
      </div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default ProductQuotePage;
