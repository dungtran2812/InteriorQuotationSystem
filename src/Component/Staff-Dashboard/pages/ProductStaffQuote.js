import { Box, Card, CardMedia, Table, Typography } from "@mui/material";
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
const ProductStaffQuote = ({ data, quantity, qoutePrice, note }) => {
  return (
    <Box>
      <Typography>Sản phẩm: {data?.name}</Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Nội Thất</StyledTableCell>
            <StyledTableCell align="center">Ảnh</StyledTableCell>
            <StyledTableCell align="center">Dài </StyledTableCell>
            <StyledTableCell align="center">Rộng</StyledTableCell>
            <StyledTableCell align="center">Cao</StyledTableCell>
            <StyledTableCell align="center">Đơn vị</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Ghi Chú</StyledTableCell>
            <StyledTableCell align="center">Đơn Giá Thay Đổi</StyledTableCell>
            <StyledTableCell align="center">Tổng Tiền</StyledTableCell>
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
            <StyledTableCell align="center">{data?.length}</StyledTableCell>
            <StyledTableCell align="center"> {data?.width}</StyledTableCell>
            <StyledTableCell align="center"> {data?.height}</StyledTableCell>
            <StyledTableCell align="center"> m²</StyledTableCell>
            <StyledTableCell align="center"> {quantity}</StyledTableCell>
            <StyledTableCell align="center"> {note}</StyledTableCell>
            <StyledTableCell align="center"> {qoutePrice} VNĐ</StyledTableCell>
            <StyledTableCell align="center">
              {" "}
              {quantity * qoutePrice} VNĐ
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default ProductStaffQuote;
