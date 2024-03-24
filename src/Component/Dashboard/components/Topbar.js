import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {auth, setAuth} = useAuth()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfor");
    setAuth({})
    window.location.href = "/login";
  }

  return (
    <Box display="flex" justifyContent="space-between" pt={2}>
      {/* SEARCH BAR */}
      <Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
      
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={auth?.avt} sx={{width:"30px", height:"30px"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >              
                <MenuItem onClick={()=>{
                  handleClose()
                  navigate('/admin-manage-profile')
                  }}>Thông tin tài khoản</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </div>
         
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
