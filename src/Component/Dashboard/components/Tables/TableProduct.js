import {
  Chip,
  Divider,
  Skeleton,
  TablePagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import MenuActionOfProduct from "../MenuProductOption";
import ModalUpdateProduct from "../UpdateProduct";

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

export default function TableProducts({
  products,
  pagination,
  filterObject,
  setFilterObject,
  fetchProducts,
  loading,
  setIsLoading,
}) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const handleChangePage = (event, newPage) => {
    setFilterObject({ ...filterObject, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilterObject({ ...filterObject, page: 0, size: +event.target.value });
  };

  return (
    <Paper sx={{ mr: 3, ml: 2, mb: 5 }}>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Tên</StyledTableCell>
              <StyledTableCell align="center">Mô tả</StyledTableCell>
              <StyledTableCell align="center">Cao</StyledTableCell>
              <StyledTableCell align="center">Dài</StyledTableCell>
              <StyledTableCell align="center">Rộng</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading === false &&
              products?.map((product, index) => (
                <StyledTableRow key={product?.id}>
                  <StyledTableCell align="center">
                    {index + 1 + pagination?.size * pagination?.page}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "250px",
                    }}
                  >
                    {product?.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product?.height}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product?.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product?.width}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      sx={{ p: 2 }}
                      label={product?.status}
                      color={product?.status === "ACTIVE" ? "success" : "error"}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <MenuActionOfProduct
                      fetchProducts={fetchProducts}
                      setOpen={setOpen}
                      product={product}
                      setSelectedProduct={setSelectedProduct}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {products?.length === 0 && loading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="left">
                  <Typography align="center">Data Empty!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {loading &&
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.size}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {selectedProduct && (
        <ModalUpdateProduct
          setIsLoading={setIsLoading}
          product={selectedProduct}
          open={open}
          setOpen={setOpen}
          fetchProducts={fetchProducts}
        />
      )}
    </Paper>
  );
}
