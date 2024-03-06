import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import LineChart from './LineGraph';
import { tokens } from "./theme";

export default function StatGraphList({
  revenueGenerated,
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            mt={"20px"}
        >
        <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
    >
        <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
        >
        <Box>
            <Typography
            variant="p"
            fontWeight="600"
            color={colors.grey[100]}
            >
            Revenue Generated
            </Typography>
            <Typography
            variant="h5"
            fontWeight="bold"
            color={colors.greenAccent[500]}
            >
            ${revenueGenerated.value}
            </Typography>
        </Box>
        </Box>
            <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={revenueGenerated.data}/>
            </Box>
        </Box>
        
    </Box>
  )
}
