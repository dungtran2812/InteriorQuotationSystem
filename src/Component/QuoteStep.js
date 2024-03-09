import React, { useState } from 'react';
import { Button, Steps, message, Dropdown, Menu, theme } from 'antd';
import ProductQuotePage from './ProductQuotePage';
import RawMaterialQuotePage from './RawMaterialQuotePage';
import BookingForm from './BookingForm';

const QuoteStep = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'Nhập Thông Tin Dự Án',
      content: <BookingForm />,
    },
    {
      title: 'Phòng Khách',
      content: (
        <>
          <ProductQuotePage />
          <RawMaterialQuotePage />
        </>
      ),
    },
    {
      title: 'Phòng Ngủ',
      content: (
        <>
          <ProductQuotePage />
          <RawMaterialQuotePage />
        </>
      ),
    },
    {
      title: 'Phòng Bếp',
      content: (
        <>
          <ProductQuotePage />
          <RawMaterialQuotePage />
        </>
      ),
    },
  ]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const addStep = (roomName) => {
    const newStep = {
      title: roomName,
      content: (
        <>
          <ProductQuotePage />
          <RawMaterialQuotePage />
        </>
      ),
    };
    setSteps([...steps, newStep]);
  };

  const handleMenuClick = (e) => {
    const roomName = e.key;
    addStep(roomName);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      
      <Menu.Item key="Phòng khách">Phòng khách</Menu.Item>
      <Menu.Item key="Phòng ngủ">Phòng ngủ</Menu.Item>
      <Menu.Item key="Phòng bếp">Phòng bếp</Menu.Item>
    </Menu>
  );

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        <Dropdown overlay={menu}>
          <Button>Thêm Phòng</Button>
        </Dropdown>
      </div>
    </>
  );
};

export default QuoteStep;
