import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { tokens } from "./theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="p" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="p"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[500] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
