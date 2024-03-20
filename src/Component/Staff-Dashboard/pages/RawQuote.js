import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TextField,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";
import useMoneyFormatter from "../../../hooks/useMoneyFormatter";
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
const RawMaterialStaffQuote = ({ data, qoutePrice, area, quoteId }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [areaInfo, setAreaInfo] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  // const navigate = useNavigate()
  useEffect(() => {
    setAreaInfo(area);
  }, [area]);
  const handleUpdateArea = async () => {
    if (errorMsg) return;
    try {
      const response = await axiosClient.put(
        `quoteDetail/rawMaterial/updateQuoteDetail?quoteDetailId=${quoteId}&area=${areaInfo}&rawMaterialId=${data?.id}`
      );
      console.log(response);
      toast.success("Update success!");
      setIsUpdate(false);
      // navigate(0)
    } catch (error) {
      console.log("Error update", error);
      toast.error("Update error!");
    }
  };
  //Format Money
  const [formatMoney] = useMoneyFormatter();
  return (
    <Box>
      <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ mb: 1 }}>
        <Typography>Vật liệu thô: {data?.name}</Typography>
        <Box>|</Box>
        {isUpdate ? (
          <Stack direction={"row"} spacing={1}>
            <TextField
              size="small"
              placeholder="Area"
              label="Area"
              type="number"
              error={errorMsg ? true : false}
              helperText={errorMsg && errorMsg}
              onChange={(e) => {
                if (e.target.value <= 0) {
                  setErrorMsg("Diện tích phải lớn hơn 0!");
                } else {
                  setErrorMsg("");
                }
                setAreaInfo(e.target.value);
              }}
              value={areaInfo}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
                inputProps: {
                  style: { textAlign: "center" },
                },
              }}
            />
            <IconButton
              aria-label="submit"
              disabled={errorMsg ? true : false}
              onClick={handleUpdateArea}
            >
              <CheckCircleOutlineOutlinedIcon
                color={`${errorMsg ? "" : "success"}`}
              />
            </IconButton>
            <IconButton aria-label="cancel" onClick={() => setIsUpdate(false)}>
              <CancelOutlinedIcon color="error" />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography>Diện tích: {areaInfo} m²</Typography>
            <IconButton aria-label="update" onClick={() => setIsUpdate(true)}>
              <ModeEditOutlineOutlinedIcon color="info" />
            </IconButton>
          </Stack>
        )}
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

export default RawMaterialStaffQuote;
