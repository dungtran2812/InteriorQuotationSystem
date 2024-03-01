import { DownloadOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SidebarComponent from "../components/Sidebar";
import StatBoxList from "../components/StatBoxList";
import StatGraphList from "../components/StatGraphList";
import Topbar from "../components/Topbar";
import { tokens, useMode } from "../components/theme";
import "../dashboard.css";
import {
  mockBarData,
  mockGeographyData,
  mockLineData,
  mockTransactions,
} from "../data/mock-data";
import { geoFeatures } from "../data/mockGeoFeatures";
import ViewRegisterList from "../../ViewRegisterList/ViewRegisterList";
function ViewRegisterListPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);

  const [dashboardData, setDashboardData] = useState({
    totalEmail: {
      value: 43243,
      increase: "+12%",
      progress: 0.75,
    },
    totalSales: {
      value: 4123,
      increase: "+54%",
      progress: 0.35,
    },
    totalUsers: {
      value: 3123,
      increase: "+16%",
      progress: 0.45,
    },
    totalTraffic: {
      value: 1234553,
      increase: "+34%",
      progress: 0.65,
    },
    revenueGenerated: {
      value: 59342.32,
      data: mockLineData,
    },
    recentTransactions: mockTransactions,
    campaign: {
      progress: 0.65,
      value: 38.456,
    },
    salesQuantity: mockBarData,
    trafficGeo: mockGeographyData,
  });

  //call api
  useEffect(() => {
    const init = () => {
      // call api
      // ...
      // setState
    };
    init();
  }, []);

  return (
    <div className="dashboard-page">
      <SidebarComponent isSidebar={isSidebar} />
      <main className="content" style={{
        backgroundColor: "#f5f5f5"      }}>
        <Topbar />
        <ViewRegisterList />
      </main>
    </div>
  );
}

export default ViewRegisterListPage;
