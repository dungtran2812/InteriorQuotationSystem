import { Typography, Box, useTheme, Divider } from "@mui/material";
import { tokens } from "./theme";

const Header = ({ title, subtitle }) => {


  return (
    <Box mb="30px" width={"100%"}>
      <Typography
        variant="h4"
        color={"#00e5ff"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", minWidth:"100%" }}
      >
        {title}
      </Typography>
      <Divider/>
      <Typography variant="h6" color={"#ef6c00"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
