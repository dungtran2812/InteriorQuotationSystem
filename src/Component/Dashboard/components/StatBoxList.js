import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import { Box, useTheme } from "@mui/material";
import React from "react";
import StatBox from "./StatBox";
import { tokens } from "./theme";

const StatBoxList = ({ totalEmail, totalSales, totalUsers, totalTraffic }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      {/* ROW 1 */}
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          subtitle="Emails Sent"
          title={totalEmail.value}
          progress={totalEmail.progress}
          increase={totalEmail.increase}
          icon={
            <EmailIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          subtitle="Sales Obtained"
          title={totalSales.value}
          progress={totalSales.progress}
          increase={totalSales.increase}
          icon={
            <PointOfSaleIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          subtitle="New Clients"
          title={totalUsers.value}
          progress={totalUsers.progress}
          increase={totalUsers.increase}
          icon={
            <PersonAddIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          subtitle="Traffic Received"
          title={totalTraffic.value}
          progress={totalTraffic.progress}
          increase={totalTraffic.increase}
          icon={
            <TrafficIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

      {/* Graph */}
    </Box>
  );
};

export default StatBoxList;
