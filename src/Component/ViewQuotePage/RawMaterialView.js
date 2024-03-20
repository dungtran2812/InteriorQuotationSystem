import {
    Box,
    Card,
    CardMedia,
    Divider,
    Stack,
    Table,
    Typography
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React from "react";
import useMoneyFormatter from "../../hooks/useMoneyFormatter";
// import { useNavigate } from "react-router-dom";

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
const RawMaterialView = ({ data, qoutePrice, area, quoteId }) => {
  //Format Money
  const [formatMoney] = useMoneyFormatter();
  return (
    <Box>
      <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ mb: 1 }}>
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
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card sx={{ width: 100 }}>
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
                {formatMoney(data?.pricePerM2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {formatMoney(qoutePrice)}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default RawMaterialView;
