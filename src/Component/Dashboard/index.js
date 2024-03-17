import { DownloadOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SidebarComponent from "./components/Sidebar";
import StatBoxList from "./components/StatBoxList";
import StatGraphList from "./components/StatGraphList";
import Topbar from "./components/Topbar";
import { tokens, useMode } from "./components/theme";
import "./dashboard.css";
import {
  mockBarData,
  mockGeographyData,
  mockLineData,
  mockTransactions,
} from "./data/mock-data";
import { geoFeatures } from "./data/mockGeoFeatures";

function DashboardPage() {
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
      <main className="content" 
      style={{
        backgroundColor: "#f5f5f5"      
      }}
        >
        <Topbar />
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Dữ liệu về báo cáo nội thất" />
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <DownloadOutlined sx={{ mr: "10px" }} />
                Download Reports
              </Button>
            </Box>
          </Box>

          {/* GRID & CHARTS */}

          <div
            style={{
              maxHeight: "calc(100vh - 220px)",
              overflowY: "auto",
            }}
            className="hidden-scrollbar"
          >
            <StatBoxList
              totalEmail={dashboardData.totalEmail}
              totalSales={dashboardData.totalSales}
              totalUsers={dashboardData.totalUsers}
              totalTraffic={dashboardData.totalTraffic}
            />
            <StatGraphList
              revenueGenerated={dashboardData.revenueGenerated}
              recentTransactions={dashboardData.recentTransactions}
              campaign={dashboardData.campaign}
              salesQuantity={dashboardData.salesQuantity}
              trafficGeo={dashboardData.trafficGeo}
            />
          </div>
        </Box>
      </main>
    </div>
  );
}

export default DashboardPage;
