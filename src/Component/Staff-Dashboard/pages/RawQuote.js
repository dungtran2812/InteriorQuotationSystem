import { Box, Card, CardMedia, Stack, Table, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffa000",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const RawMaterialStaffQuote = ({ data, qoutePrice, area}) => {
  return (
    <Box>
      <Stack direction={"row"} spacing={2}>
      <Typography>Vật liệu thô: {data?.name}</Typography>
      <Box>|</Box>
      <Typography>Diện tích: {area} m²</Typography>
      </Stack>
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Tên</StyledTableCell>
            <StyledTableCell align="center">Ảnh </StyledTableCell>
            <StyledTableCell align="center">Loại</StyledTableCell>
            <StyledTableCell align="center">Giá theo m²</StyledTableCell>
            <StyledTableCell align="center">Giá</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">{data?.name}</StyledTableCell>
            <StyledTableCell align="center">
              <Box sx={{display:"flex", justifyContent:"center"}}>
              <Card sx={{width:100}}>
                <CardMedia
                  sx={{ height: 100 }}
                  image={data?.img}
                  title="img"              
                />
              </Card>
              </Box>
            </StyledTableCell>
            <StyledTableCell align="center"> {data?.type}</StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {data?.pricePerM2} VNĐ
            </StyledTableCell>
            <StyledTableCell align="center"> {qoutePrice} VNĐ</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default RawMaterialStaffQuote;
