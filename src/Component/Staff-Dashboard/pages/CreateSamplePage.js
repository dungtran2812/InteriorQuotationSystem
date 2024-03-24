import React, { useState } from 'react'
import SidebarComponent from '../components/Sidebar'
import Topbar from '../components/Topbar';
import CreateSampleStep from './CreateSampleStep';

export default function CreateSamplePage() {
    const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="dashboard-page">

      <SidebarComponent isSidebar={isSidebar} />
     
      <main className="content" style={{
        backgroundColor: "#f5f5f5"      }}>
        <Topbar />
        <CreateSampleStep/>
      </main>
    </div>
  )
}
