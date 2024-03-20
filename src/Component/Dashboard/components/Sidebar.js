// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ChairIcon from "@mui/icons-material/Chair";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
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
          color: "black",
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
          height: "100%",
        }}
      >
        <Menu
          iconShape="square"
          style={{
            // backgroundColor: `#00e5ff`,
            backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
            height: `100vh`,
            minHeight: "100%",
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
              color: "#455a64",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="4px"
              >
                <Typography variant="h6">TRANG QUẢN LÝ</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{
                      color: `#0091F2`,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
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
          )} */}
          <Typography
            sx={{ ml: "25px", fontSize: 16, fontWeight: "bold", color: "grey" }}
          >
            Bảng chính
          </Typography>
          <Box>
            <Item
              title="Bảng điều khiển"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{
                ml: "25px",
                fontSize: 16,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Quản lý
            </Typography>
            <Item
              title="Sản phẩm"
              to="/admin-manage-product"
              icon={<ChairIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Người dùng"
              to="/admin-manage-user"
              icon={<PeopleAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nguyên liệu"
              to="/admin-manage-rawMaterial"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{
                ml: "25px",
                fontSize: 16,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Cá nhân
            </Typography>
            <Item
              title="Hồ sơ cá nhân"
              to="/admin-manage-profile"
              icon={<AccountBoxOutlinedIcon />}
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
