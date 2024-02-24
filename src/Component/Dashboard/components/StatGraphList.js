import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import BarChart from "./BarChart";
import GeographyChart from "./GeographyChart";
import LineChart from './LineGraph';
import ProgressCircle from "./ProgressCircle";
import { tokens } from "./theme";

export default function StatGraphList({
  revenueGenerated,
  recentTransactions,
  campaign,
  salesQuantity,
  trafficGeo
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
        <Box>
            <IconButton>
            <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
            </IconButton>
        </Box>
        </Box>
            <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={revenueGenerated.data}/>
            </Box>
        </Box>
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            >
            <Typography color={colors.grey[100]} variant="p" fontWeight="600">
                Recent Transactions
            </Typography>
            </Box>
            {recentTransactions.map((transaction, i) => (
            <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
            >
                <Box>
                <Typography
                    color={colors.greenAccent[500]}
                    variant="p"
                    fontWeight="600"
                >
                    {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                    {transaction.user}
                </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                >
                ${transaction.cost}
                </Box>
            </Box>
            ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="p" fontWeight="600" color="#fff">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={campaign.progress} />
            <Typography
              variant="p"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${campaign.value} revenue generated
            </Typography>
            <Typography color={"white"}>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="p"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px", mb: "-25px", display: "block"}}
            color={colors.grey[100]}
          >
            Sales Quantity
          </Typography>
          <Box height="250px">
            <BarChart isDashboard={true} data={salesQuantity}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="p"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
            color={"white"}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} data={trafficGeo}/>
          </Box>
        </Box>
    </Box>
  )
}
