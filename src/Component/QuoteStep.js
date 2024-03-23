import React, { useState, useEffect, useContext } from 'react';
import { Button, Steps, message, Dropdown, Menu } from 'antd';
import ProductQuotePage from './ProductQuotePage';
import RawMaterialQuotePage from './RawMaterialQuotePage';
import BookingForm from './BookingForm';
import RoomAreaForm from './RoomAreaForm';
import axios from 'axios';
import { QuoteContext } from '../Context/QuoteContext';
import { useNavigate } from 'react-router-dom';

const QuoteStep = () => {
  const navigate = useNavigate();
  const { quoteId, projectId, setQuoteId, setProjectId} = useContext(QuoteContext);
  const [loadAgain, setLoadAgain] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'Nhập Thông Tin Dự Án',
      content: <BookingForm setLoadAgain={setLoadAgain}/>,
    },
  ]);
  const [dropdownMenu, setDropdownMenu] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/room/getAllRoom', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.status === 200) {
          const rooms = response.data.data;
          const menuItems = rooms.map(room => (
            <Menu.Item key={room.id} onClick={() => handleRoomSelection(room.id, room.name)}>
              {room.name}
            </Menu.Item>
          ));
          const menu = <Menu>{menuItems}</Menu>;
          setDropdownMenu(menu);
        } else {
          throw new Error('Failed to fetch rooms');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [loadAgain]);

  
  const handleDoneAllStep = () => {
   if (projectId && quoteId) {
    message.success('Hoàn Thành Gửi Yêu Cầu!')
    navigate('/');
    setQuoteId(null);
    setProjectId(null);

   }
   else if (!projectId) {
    message.error('Chưa Tạo Dự Án')
    
   }
    else {
      message.error('Tạo ít nhất 1 phòng trong dự án')
   }
  }
  const handleRoomSelection = (id, name) => {
    if (projectId) {
      setRoomId(id);
      setRoomName(name);
      message.success('Tạo Phòng Thành Công !');
      addStep(id, name)
      console.log(projectId)
    } else {
      console.log(projectId)
      message.error('Chưa Tạo dự án !')
      console.log(loadAgain)
    }


  };

  const addStep = (roomId, roomName) => {
    const newStep = {
      title: roomName,
      content: (
        <>
          <RoomAreaForm projectId={projectId} roomId={roomId} />
          <ProductQuotePage roomId={roomId} quoteId={quoteId} />
          <RawMaterialQuotePage roomId={roomId} quoteId={quoteId} />
        </>
      ),
    };
    setSteps([steps[0], newStep]); // Append the new step
  };

  const resetSteps = () => {
    setSteps([
      {
        title: 'Nhập Thông Tin Dự Án',
        content: <BookingForm setLoadAgain={setLoadAgain}/>,
      },
    ]);
    setCurrent(0); // Reset current step index
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
  };
  

  return (
    <div className='container'>
      
      <Steps current={current} items={steps.map(step => ({ key: step.title, title: step.title }))} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div className='quotestep-operation'>
        {current < steps.length - 1 && (
          <Button style={{ margin: '8px 8px' }} type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button style={{ margin: '8px 8px' }} type="primary" onClick={handleDoneAllStep}>
            Hoàn Thành Đăng Kí
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '8px 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {dropdownMenu && (
          <Dropdown overlay={dropdownMenu}>
            <Button style={{ margin: '8px 8px' }}>Thêm Phòng</Button>
          </Dropdown>

        )}

        <Button style={{ margin: '8px 8px' }} onClick={resetSteps}>Tạo Lại</Button>
      </div>
    </div>
  );
};

export default QuoteStep;
