import { Avatar, Divider, Skeleton, Stack, TablePagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axiosClients";
import Loading from "../Loading";
import MenuActionRegisterList from "./MenuActionRegisterList";

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

export default function ViewRegisterList() {
  const navigate = useNavigate()
  const [project, setProject] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [filterObject, setFilterObject] = useState({
    page: 0,
    size: 10,
    sort: ["id"],
    status:"New"
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 10,
  });
  useEffect(() => {
    const fetchListRegisters = async () => {
     setIsLoading(true);
      try {
        const params = filterObject
        const response = await axiosClient.get("/project/getAllPageProjectByStatus",{
          params,
          paramsSerializer: {
            indexes: null, // by default: false
          },
        })
        console.log(response.data);
        setProject(response?.data?.data?.content ?? [])
        setPagination({
          page: response.data?.data?.pageable?.pageNumber,
          size: response.data?.data?.pageable?.pageSize,
          total: response.data?.data?.totalElements
        });
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }finally{
      setIsLoading(false)
    }
  }
    fetchListRegisters()
  }, [filterObject])
  const handleChangePage = (event, newPage) => {
    setFilterObject({ ...filterObject, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilterObject({ ...filterObject, page: 0, size: +event.target.value });
  };

  return (
    <>
    <Paper
      sx={{
        p: 3
      }}
    >
      <Typography variant="h6" sx={{mb:2}}>Register List</Typography>
      <Loading isLoading={isLoading} />
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
            <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">Design Style Name</StyledTableCell>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading === false && project?.map((row, index) => (
              <StyledTableRow key={row?.id}>
                 <StyledTableCell align="center">
                    {index + 1 + pagination?.size * pagination?.page}
                  </StyledTableCell>
                <StyledTableCell align="center">{row?.name}</StyledTableCell>
                <StyledTableCell align="center">{row?.designStyleName}</StyledTableCell>
                <StyledTableCell align="center" >             
                  <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Avatar src={row?.userDetailDTO?.avt} alt="avatar user" />
                      <Typography align="left">{row?.userDetailDTO?.fullName}</Typography>
                    </Stack>
                  </StyledTableCell>
                <StyledTableCell align="center">{format(new Date(row?.createdAt), "dd/mm/yyyy")}</StyledTableCell>
                <StyledTableCell align="center">{row?.location}</StyledTableCell>
                <StyledTableCell align="center">{row?.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <MenuActionRegisterList data={row}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {isLoading &&
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
                  <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={300} height={20} />
                    </Stack>
                   
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
            {project?.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="left">
                  <Typography align="center">Data Empty!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider/>
      <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.size}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    </>
  );
}
