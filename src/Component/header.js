import AccountCircle from "@mui/icons-material/AccountCircle";
import ChairIcon from "@mui/icons-material/Chair";
import ConstructionIcon from "@mui/icons-material/Construction";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

import { signInWithGoogle } from "../service/firebase";
import LoginWithGG from "./LoginWithGG";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to='/user-project'>Dự Án Của Tôi</Link></MenuItem>
      {user || localStorageUser ? (
        <MenuItem
          onClick={() => {
            setUser(null);
            localStorage.removeItem("user");
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      ) : (
        <MenuItem>Sign in</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem  onClick={() => setOpen(!open)}>
        <IconButton
          size="large"
          aria-label="show 3 new notifications"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <div className="relative z-50 bg-red-300">
            {
            open && (
              <div className="absolute p-4 bg-white rounded-md right-0 z-40 w-[400px] top-16 shadow-sm">
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
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
          <p>Profile</p>
          <img
            src={user?.photoURL || localStorageUser?.photoURL || ""}
            alt="user"
            style={{ borderRadius: "50%", width: "30px" }}
          />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleNavigate = () => {
    navigate(`./../../sampleprojectpage/${searchText}`);
  };



  return (
    <Box paddingBottom={10}>
      <AppBar
        sx={{
          display: "flex",
          alignItems: "space-between",
          justifyContent: "center",
          backgroundImage:
            "url('https://st.depositphotos.com/18313948/58554/i/450/depositphotos_585548880-stock-photo-website-header-banner-design-abstract.jpg')",
          color: "black",
          height: 60,
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img
              src="https://www.interiordesignshop.net/wp-content/themes/beyond-magazine/img/interior-design-shop-logo.png"
              alt="Logo"
              style={{ height: "38px" }}
            />
          </Link>

          <Search
            sx={{

              marginLeft: 0,
              border: "1px solid #ccc", // Add a border
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Set a semi-transparent white background
              borderRadius: 5, // Add border-radius for rounded corners
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)", // Change background color on hover

              },
            }}
          >

            <StyledInputBase

              placeholder="Tìm dự án mẫu..."
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleInputChange}
            />
            <button className="search-icon" onClick={() => handleNavigate()}><SearchIcon /></button>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              aria-label="show 3 new notifications"
              color="inherit"
              onClick={() => setOpen(!open)}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
              
            </IconButton>
            <div className="relative z-50 bg-red-300">
            {
            open && (
              <div className="absolute p-4 bg-white rounded-md right-0 z-40 w-[400px] top-16 shadow-sm">
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
            {user || localStorageUser ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img
                  src={user?.photoURL || localStorageUser?.photoURL || ""}
                  alt="user"
                  style={{ borderRadius: "50%", width: "30px" }}
                />
              </IconButton>
            ) : (
              // <LoginWithGG setUser={setUser} />
              <Link to="/login">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem onClick={handleDrawerClose}>
            <Link to="/">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
            </Link>
            <Link to="/">
              <ListItemText primary="About Us" />
            </Link>
          </ListItem>
          <ListItem onClick={handleDrawerClose}>
            <Link to="/">
              <ListItemIcon>
                <DesignServicesIcon />
              </ListItemIcon>
            </Link>
            <Link to="/">
              <ListItemText primary="Interior design" />
            </Link>
          </ListItem>
          <ListItem onClick={handleDrawerClose}>
            <ListItemIcon>
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary="Interior construction" />
          </ListItem>
          <ListItem onClick={handleDrawerClose}>
            <ListItemIcon>
              <ChairIcon />
            </ListItemIcon>
            <ListItemText primary="Furniture" />
          </ListItem>
          <ListItem onClick={handleDrawerClose}>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}