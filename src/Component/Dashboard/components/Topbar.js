import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "./theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        color="#fff"
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" style={{color:"#fff"}}/>
        <IconButton type="button" sx={{ p: 1 }} style={{color:"#fff"}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon style={{
                color: "#fff"
            }} />
          ) : (
            <LightModeOutlinedIcon style={{
                color: "#fff"
            }} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon style={{
            color: "#fff"
          }} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon style={{
            color: "#fff"
          }} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon style={{
            color: "#fff"
          }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;