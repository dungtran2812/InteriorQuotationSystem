import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Select, Table, Popconfirm, Typography, Input } from 'antd';
import axios from 'axios';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router';

const ProductStaffQuote = () => {
  const [furniture, setFurniture] = useState([]);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      Furniture: 'Bàn',
      Length: '12',
      Width: '32',
      Height: '43',
      Unit: 'M2',
      Quantity: 2, // Default quantity set to 1
      UnitPrice: 23000,
      TotalCost: 46000,
      Note:'Ban khong gi',
    },
  ]);
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
  };

  const columns = [
    {
      title: 'Nội Thất',
      dataIndex: 'Furniture',
      width: '10%',
    },
    { title: 'Dài', dataIndex: 'Length', width: '5%', 
    render: (__, record) => (
      <Input
        placeholder="10"
        value={record.Length}
        onChange={(e) =>{
          handleSave({ ...record, Length: e.target.value })
        }}
      />
    ),
  },
    { title: 'Rộng', dataIndex: 'Width', width: '5%',
    render: (__, record) => (
      <Input
        placeholder="10"
        value={record.Width}
        onChange={(e) =>{
          handleSave({ ...record, Width: e.target.value })
        }}
      />
    )

  },
    { title: 'Cao', dataIndex: 'Height', width: '5%',
    render: (__, record) => (
      <Input
        placeholder="10"
        value={record.Height}
        onChange={(e) =>{
          handleSave({ ...record, Height: e.target.value })
        }}
      />
    )
  },
    { title: 'Đơn Vị', dataIndex: 'Unit', width: '5%',
    render: (text) => (
      <span>{text}</span>
    ),
  },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      width: '5%',
      render: (text, record) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'Note',
      width: '20%',
      render: (_, record) => (
        // <Input 
        // placeholder="Ghi Chú"
        // onChange={(value) => handleSave({ ...record, Note: value })} />
        <span>
          {record.Note}
        </span>
      ),
    },
    
    { 
      title: 'Đơn Giá', 
      dataIndex: 'UnitPrice', 
      width: '10%',
      render: (text) => (
        
        <span>{text} VND</span>
      ),
    },
    { 
    title: 'Tổng Tiền', 
    dataIndex: 'TotalCost', 
    width: '10%',
    render: (_, record) => (
      <span>{parseInt(
        (record.Quantity || 0) * (record.UnitPrice || 0) * (record.Length || 0) * (record.Width || 0) * (record.Height || 0)
      ).toLocaleString('vi-VN')} VND</span>
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

  return (
    <div className='table-container'>
      <div className='quotetable-title'>
        <Title level={2}>Bảng Tạm Tính Giá Phần Nội Thất</Title>
        {/* <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Thêm Sản Phẩm
        </Button> */}
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

export default ProductStaffQuote;