import React, { useState, useEffect, useContext } from 'react';
import { Button, Steps, message, Dropdown, Menu } from 'antd';
import ProductQuotePage from './ProductQuotePage';
import RawMaterialQuotePage from './RawMaterialQuotePage';
import BookingForm from './BookingForm';
import RoomAreaForm from './RoomAreaForm';
import axios from 'axios';
import { QuoteContext } from '../Context/QuoteContext';

const QuoteStep = () => {
  const { quoteId, setQuoteId } = useContext(QuoteContext);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'Nhập Thông Tin Dự Án',
      content: <BookingForm setProjectId={setProjectId} />,
    },
  ]);
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const [roomsCreated, setRoomsCreated] = useState(0);

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
  }, []);

  useEffect(() => {
    if (projectId !== null && roomId !== null && roomName !== null) {
      addStep(roomId, roomName);
    }
  }, [projectId, roomId, roomName]);

  const handleRoomSelection = (id, name) => {
    setRoomId(id);
    setRoomName(name);
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
    setSteps([...steps, newStep]); // Append the new step
    setRoomsCreated(prev => prev + 1); // Increment rooms created count
  };

  const resetSteps = () => {
    setSteps([
      {
        title: 'Nhập Thông Tin Dự Án',
        content: <BookingForm setProjectId={setProjectId} />,
      },
    ]);
    setCurrent(0); // Reset current step index
    setRoomsCreated(0); // Reset rooms created count
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
        {roomsCreated > 0 && current === steps.length - 1 && (
          <Button style={{ margin: '8px 8px' }} type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '8px 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {dropdownMenu && (
          <Dropdown overlay={dropdownMenu}>
            <Button style={{ margin: '8px 8px' }}>Tạo Thêm Phòng</Button>
          </Dropdown>
        )}
        <Button style={{ margin: '8px 8px' }} onClick={resetSteps}>Tạo Lại</Button>
      </div>
    </div>
  );
};

export default QuoteStep;
