import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "./theme";
import { AccountCircle } from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = React.useContext(ColorModeContext);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={"#F5F6F8"}
        color="#000"
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          style={{ color: "#000" }}
        />
        <IconButton type="button" sx={{ p: 1 }} style={{ color: "#000" }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon
              style={{
                color: "#000",
              }}
            />
          ) : (
            <LightModeOutlinedIcon
              style={{
                color: "#000",
              }}
            />
          )}
        </IconButton>
        <IconButton   onClick={handleToggle}>
          <div className="relative">
            <NotificationsOutlinedIcon
              style={{
                color: "#000",
              }}
            />
            {
            open && (
              <div className="absolute p-4 bg-white rounded-md right-0 z-40 w-[400px]">
                <span className="flex gap-2 text-base ">
                  <NotificationsOutlinedIcon/>
                  Notification
                </span>
                <div>
                  <span className="text-sm">You have 3 new notifications</span>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-4 items-center ">
                      <PersonOutlinedIcon/>
                      <span className="text-sm flex flex-col items-start">
                        New user registered
                        <span>11/4/2003</span>
                      </span>
                    </div>

                    <div className="flex gap-4 items-center ">
                      <PersonOutlinedIcon/>
                      <span className="text-sm flex flex-col items-start">
                        New user registered
                        <span>11/4/2003</span>
                      </span>
                    </div>

                    <div className="flex gap-4 items-center ">
                      <PersonOutlinedIcon/>
                      <span className="text-sm flex flex-col items-start">
                        New user registered
                        <span>11/4/2003</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          </div>
          
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon
            style={{
              color: "#000",
            }}
          />
        </IconButton>
        <IconButton>
        {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
