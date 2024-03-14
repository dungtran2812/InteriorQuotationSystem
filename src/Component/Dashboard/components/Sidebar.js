// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChairIcon from '@mui/icons-material/Chair';
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "./theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        className="pro-inner-item"
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
    
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-menu-button:hover": {
          backgroundColor: `#151A2D`,
        },
        "& .pro-sidebar-inner": {
          backgroundColor: `red`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 0px !important",
          color: "white",
        },
        "& .pro-inner-item:hover": {
          color: "#000",
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          padding: `0px`,
        }}
      >
        <Menu
          iconShape="square"
          style={{
            backgroundColor: `#FF7000`,
            height: `100vh`,
            overflowY: `auto`,
            paddingLeft: `0px`,
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon color="#fff" /> : undefined}
            style={{
              margin: "8px 0 8px 0",
              color: "#fff",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="4px"
              >
                <Typography variant="h5" color={"#fff"} >ADMIN</Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  color={"#fff"}
                >
                  <MenuOutlinedIcon
                    style={{
                      color: `#fff`,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={"#fff"}
                  fontWeight="bold"
                  sx={{ m: "30px 0 0 0" }}
                >

                </Typography>
                <Typography variant="p" color={colors.grey[900]}>

                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Product"
              to="/manage-product"
              icon={<ChairIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={"#eee"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Add Staff"
              to="/staff/add"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Staff Team"
              to="/staff"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Staff Information"
              to="/staff/information"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
