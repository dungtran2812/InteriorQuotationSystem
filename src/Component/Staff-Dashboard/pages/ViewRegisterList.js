import { useState } from "react";
import ViewRegisterList from "../../ViewRegisterList/ViewRegisterList";
import SidebarComponent from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { tokens, useMode } from "../components/theme";
import "../dashboard.css";
function ViewRegisterListPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const colors = tokens(theme.palette.mode);


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
