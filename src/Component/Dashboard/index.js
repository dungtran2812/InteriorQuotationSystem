import { Box } from "@mui/material";
import { useEffect } from "react";
import { axiosClient } from "../../api/axiosClients";
import Header from "./components/Header";
import SidebarComponent from "./components/Sidebar";
import StatBoxList from "./components/StatBoxList";
import Topbar from "./components/Topbar";
import "./dashboard.css";
import { useState } from "react";
import Loading from "../../Component/Loading";

function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalRaws, setTotalRaws] = useState();
  const [totalProjects, setTotalProjects] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const [statusUser, setStatusUser] = useState('ACTIVE');
  const [statusProject, setStatusProject] = useState('ACTIVE');
  const [statusProduct, setStatusProduct] = useState('ACTIVE');
  const [statusRaw, setStatusRaw] = useState('ACTIVE');
  const [isLoading, setIsLoading] = useState(false)
  //call api
  useEffect(()=>{
   const fetchTotalUsers = async()=>{
    try {
      setIsLoading(true)
      const response = await axiosClient.get(`/dashboard/getTotalUserByStatus?status=${statusUser}`)
      setTotalUsers(response?.data?.data)
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
   }
   fetchTotalUsers()
  },[statusUser])
  useEffect(()=>{
    const fetchTotalProducts = async()=>{
     try {
      setIsLoading(true)
       const response = await axiosClient.get(`/dashboard/getTotalProductByStatus?status=${statusProduct}`)
       setTotalProducts(response?.data?.data)
     } catch (error) {
       console.log(error);
     }
     finally{
      setIsLoading(false)
    }
    }
    fetchTotalProducts()
   },[statusProduct])
   useEffect(()=>{
    const fetchTotalProjects = async()=>{
     try {
      setIsLoading(true)
       const response = await axiosClient.get(`/dashboard/getTotalProjectByStatus?status=${statusProject}`)
       setTotalProjects(response?.data?.data)
     } catch (error) {
       console.log(error);
     }
     finally{
      setIsLoading(false)
    }
    }
    fetchTotalProjects()
   },[statusProject])
   useEffect(()=>{
    const fetchTotalRaws = async()=>{
     try {
      setIsLoading(true)
       const response = await axiosClient.get(`/dashboard/getTotalRawByStatus?status=${statusRaw}`)
       setTotalRaws(response?.data?.data)
     } catch (error) {
       console.log(error);
     }
     finally{
      setIsLoading(false)
    }
    }
    fetchTotalRaws()
   },[statusRaw])

  return (
    <div className="dashboard-page">
      <SidebarComponent isSidebar={true} />
      <main className="content" 
      style={{
        backgroundColor: "#f5f5f5"      
      }}
        >
        <Topbar /> 
        <Loading isLoading={isLoading}/>
        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Thống kê các số liệu hệ thống" />
          </Box>
          <Box>
            <StatBoxList
              totalUsers={totalUsers}
              totalProducts={totalProducts}
              totalProjects={totalProjects}
              totalRaws={totalRaws}
              statusProduct={statusProduct}
              statusProject={statusProject}
              statusUser={statusUser}
              statusRaw={statusRaw}
              setStatusProduct={setStatusProduct}
              setStatusRaw={setStatusRaw}
              setStatusProject={setStatusProject}
              setStatusUser={setStatusUser}
            />
          </Box>
        </Box>
      </main>
    </div>
  );
}

export default DashboardPage;
