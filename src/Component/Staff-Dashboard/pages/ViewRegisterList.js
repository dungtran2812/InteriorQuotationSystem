import { useState } from "react";
import ViewRegisterList from "../../ViewRegisterList/ViewRegisterList";
import SidebarComponent from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { tokens, useMode } from "../components/theme";
import "../dashboard.css";
import ViewQuotingList from "../../ViewRegisterList/ViewQuotingList";
import { Typography } from "antd";

function ViewRegisterListPage() {
  
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);

  return (
    <div className={`dashboard-page ${isSidebar ? 'with-sidebar' : 'without-sidebar'}`}>
      <SidebarComponent isSidebar={isSidebar} />
      <main className="content" style={{ backgroundColor: "#f5f5f5" }}>
        <Topbar />
        <div className="page-content">
          <div className="section">
            <Typography.Title level={3}>Đơn Báo Giá Mới</Typography.Title>
            <ViewRegisterList />
          </div>
          <div className="section">
            <Typography.Title level={3}>Đơn Báo Giá Đã Xác Nhận</Typography.Title>
            <ViewQuotingList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewRegisterListPage;
