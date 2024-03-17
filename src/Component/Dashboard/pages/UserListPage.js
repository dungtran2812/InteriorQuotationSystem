import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Divider, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../api/axiosClients";
import Loading from "../../Loading";
import SidebarComponent from "../components/Sidebar";
import TableUsers from "../components/Tables/TableUser";

export default function UserListPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterObject, setFilterObject] = useState({
    page: 0,
    size: 10,
    sort: ["id"],
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 10,
  });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = filterObject;
      const response = await axiosClient.get("/user/getAllUser", {
        params,
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });    
      setUsers(response?.data?.data?.content ?? []);
      setPagination({
        page: response.data?.data.number,
        size: response.data?.data.size,
        total: response.data?.data.totalElements,
      });
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterObject]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    // Fetch users by User when selectedUser changes
    const fetchUsersByEmail = async () => {
      try {
        setIsLoading(true);
        if (selectedUser) {
          const response = await axiosClient.get(
            `/user/getUserByEmail?email=${selectedUser}`
          );
          setUsers([response.data?.data] ?? []);
          setPagination(null);
        }
      } catch (error) {
        console.error("Error fetching products by User:", error);
      } finally {
        setIsLoading(false);
      }
    };
    selectedUser ? fetchUsersByEmail() : fetchUsers();
  }, [selectedUser, fetchUsers]);

  const handleTextChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="dashboard-page">
      <Loading isLoading={isLoading} />
      <SidebarComponent />
      <div style={{ display: "block",width:"100%",backgroundColor:"#F2F5F8" }}>
        <Typography variant="h5" sx={{m: 3}}>List User</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          size="small"
          placeholder="Input email here ..."
          label="Search User(s) by email"
          onBlur={handleTextChange}
          sx={{ mt: 2, mb: 3, ml: 3, width: "345px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableUsers
          users={users}
          pagination={pagination}
          filterObject={filterObject}
          setFilterObject={setFilterObject}
          fetchUsers={fetchUsers}
          loading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
