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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";
import useMoneyFormatter from "../../../hooks/useMoneyFormatter";

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
const ProductStaffQuote = ({ data, quantity, qoutePrice, note, quoteId, totalPrice }) => {
  const navigate = useNavigate()
  const [isUpdate, setIsUpdate] = useState(false);
  const [quantityInfo, setQuantityInfo] = useState(1);
  const [noteInfo, setNoteInfo] = useState("");
  const [qoutePriceInfo, setQoutePriceInfo] = useState(0);
  const [errorMsg, setErrorMsg] = useState({
    quantityMsg: "",
    noteMsg: "",
    qoutePriceMsg: "",
  });
  useEffect(() => {
    
    if (isUpdate === false) {
      setQuantityInfo(quantity);
      setNoteInfo(note);
      setQoutePriceInfo(qoutePrice);
    }
    if (!note) {
      setErrorMsg({ ...errorMsg, noteMsg: "Ghi chú là bắt buộc" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, qoutePrice, note, isUpdate]);

  const handleUpdate = async () => {
    try {
      await axiosClient.put(
        `/quoteDetail/product/updateQuoteDetail?quoteDetailId=${quoteId}&productId=${data?.id}&quantity=${quantityInfo}&note=${noteInfo}&price=${qoutePriceInfo}`
      );
      toast.success("Update success!");
      // navigate(0)
    } catch (error) {
      console.log("Error update", error);
      toast.error("Update error!");
    }
  };
  //Format money
  const [formatMoney] = useMoneyFormatter();
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
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Ghi Chú</StyledTableCell>
              <StyledTableCell align="center">Đơn Giá Thay Đổi</StyledTableCell>
              <StyledTableCell align="center">Tổng Tiền</StyledTableCell>
              <StyledTableCell align="center">Cập nhật</StyledTableCell>
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
              <StyledTableCell align="center">{data?.length}</StyledTableCell>
              <StyledTableCell align="center"> {data?.width}</StyledTableCell>
              <StyledTableCell align="center"> {data?.height}</StyledTableCell>          
              <StyledTableCell align="center">
                {isUpdate ? (
                  <TextField
                    size="small"
                    placeholder="Số lượng"
                    label="Số lượng"
                    type="number"
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center" },
                      },
                    }}
                    error={errorMsg?.quantityMsg ? true : false}
                    helperText={
                      errorMsg?.quantityMsg !== "" ? errorMsg?.quantityMsg : ""
                    }
                    onChange={(e) => {
                      if (e.target.value <= 0) {
                        setErrorMsg({
                          ...errorMsg,
                          quantityMsg: "Số lượng phải lớn hơn 0!",
                        });
                      } else {
                        setErrorMsg({ ...errorMsg, quantityMsg: "" });
                      }
                      setQuantityInfo(e.target.value);
                    }}
                    value={quantityInfo}
                  />
                ) : (
                  quantityInfo
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isUpdate ? (
                  <TextField
                    size="small"
                    placeholder="Note"
                    label="Note"
                    multiline
                    minRows={2}
                    sx={{ minWidth: "160px" }}
                    error={errorMsg?.noteMsg ? true : false}
                    helperText={
                      errorMsg?.noteMsg !== "" ? errorMsg?.noteMsg : ""
                    }
                    onChange={(e) => {
                      if (!e.target.value) {
                        setErrorMsg({
                          ...errorMsg,
                          noteMsg: "Ghi chú là bắt buộc!",
                        });
                      } else {
                        setErrorMsg({ ...errorMsg, noteMsg: "" });
                      }
                      setNoteInfo(e.target.value);
                    }}
                    value={noteInfo}
                  />
                ) : (
                  noteInfo
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isUpdate ? (
                  <TextField
                    size="small"
                    placeholder="Đơn giá"
                    label="Đơn giá"
                    type="number"
                    sx={{ minWidth: "180px" }}
                    error={errorMsg?.qoutePriceMsg ? true : false}
                    helperText={
                      errorMsg?.qoutePriceMsg !== ""
                        ? errorMsg?.qoutePriceMsg
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">VNĐ</InputAdornment>
                      ),
                      inputProps: {
                        style: { textAlign: "center" },
                      },
                    }}
                    onChange={(e) => {
                      if (e.target.value <= 0) {
                        setErrorMsg({
                          ...errorMsg,
                          qoutePriceMsg: "Đơn giá phải lớn hơn 0!",
                        });
                      } else {
                        setErrorMsg({ ...errorMsg, qoutePriceMsg: "" });
                      }
                      setQoutePriceInfo(e.target.value);
                    }}
                    value={qoutePriceInfo}
                  />
                ) : (
                  formatMoney(qoutePriceInfo)
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {qoutePriceInfo === 0 ? totalPrice : formatMoney(quantityInfo * qoutePriceInfo)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isUpdate ? (
                  <Stack direction={"row"} spacing={1}>
                    <IconButton
                      aria-label="submit"
                      disabled={
                        !errorMsg?.noteMsg &&
                        !errorMsg?.qoutePriceMsg &&
                        !errorMsg?.quantityMsg
                          ? false
                          : true
                      }
                      onClick={handleUpdate}
                    >
                      <CheckCircleOutlineOutlinedIcon
                        color={`${
                          !errorMsg?.noteMsg &&
                          !errorMsg?.qoutePriceMsg &&
                          !errorMsg?.quantityMsg
                            ? "success"
                            : ""
                        }`}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="cancel"
                      onClick={() => setIsUpdate(false)}
                    >
                      <CancelOutlinedIcon color="error" />
                    </IconButton>
                  </Stack>
                ) : (
                  <IconButton
                    aria-label="update"
                    onClick={() => setIsUpdate(true)}
                  >
                    <ModeEditOutlineOutlinedIcon color="info" />
                  </IconButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default ProductStaffQuote;
