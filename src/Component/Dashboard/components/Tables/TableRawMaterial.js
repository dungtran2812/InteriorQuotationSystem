import {
  Card,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Stack,
  TablePagination,
  Typography
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
import MenuActionOfRawMaterial from "../MenuRawMaterialOption";
import ModalUpdateRawMaterial from "../UpdateRawMaterial";
// import ModalUpdateuser from "../Updateuser";

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

export default function TableRawMaterial({
  rawMaterials,
  pagination,
  filterObject,
  setFilterObject,
  fetchRawMaterials,
  loading,
  setIsLoading
}) {
  const [open, setOpen] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState();
  const handleChangePage = (event, newPage) => {
    setFilterObject({ ...filterObject, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilterObject({ ...filterObject, page: 0, size: +event.target.value });
  };

  return (
    <Paper sx={{ mr: 3, ml: 2, mb: 5 }}>
      <TableContainer>
        <Table sx={{ minWidth: 1200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading === false &&
              rawMaterials?.map((rawMaterial, index) => (
                <StyledTableRow key={rawMaterial?.id}>
                  <StyledTableCell align="center">
                    {index + 1 + pagination?.size * pagination?.page}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Typography align="left">{rawMaterial.name}</Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {rawMaterial?.img ? (
                      <Card>
                        <CardMedia
                          component="img"
                          height="80"
                          image={rawMaterial?.img}
                          alt="Raw Material Image"
                        />
                      </Card>
                    ) : (
                      "-"
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {rawMaterial?.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {rawMaterial?.type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {rawMaterial?.pricePerM2}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <Chip sx={{p:2}} label={rawMaterial?.status} color={rawMaterial?.status === "ACTIVE" ? "success" : "error"}/>
                  </StyledTableCell>
                  <StyledTableCell align="center">             
                  <MenuActionOfRawMaterial  fetchRawMaterials={fetchRawMaterials} setOpen={setOpen} rawMaterial={rawMaterial} setSelectedRawMaterial={setSelectedRawMaterial}/>
                </StyledTableCell>
                </StyledTableRow>
              ))}
            {rawMaterials?.length === 0 && loading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="left">
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
      {selectedRawMaterial && (
        <ModalUpdateRawMaterial
          rawMaterial={selectedRawMaterial}
          open={open}
          setOpen={setOpen}
          fetchRawMaterials={fetchRawMaterials}
          setIsLoading={setIsLoading}
        />
      )}
    </Paper>
  );
}
