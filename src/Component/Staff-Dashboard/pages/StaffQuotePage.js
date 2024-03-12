import { Button } from 'antd/es/radio';
import React, { useState } from 'react';
import SidebarComponent from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProductStaffQuote from './ProductStaffQuote';
import RawMaterialQuote from './RawQuote';
import { useNavigate } from 'react-router';

export default function StaffQuotePage() {
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <SidebarComponent isSidebar={isSidebar} />
      <main className="content " style={{
        backgroundColor: "#f5f5f5"      }}>
        <Topbar />
        <h1>Staff Quote Page</h1>

        <div>
            <ProductStaffQuote />
            <RawMaterialQuote />
        </div>
        <div className='w-full flex justify-end '>
          <Button onClick={() => navigate("/staff-dashboard/viewRegisterList")}>
            Save
          </Button>
        </div>  
        
      </main>
    </div>
  )
}
