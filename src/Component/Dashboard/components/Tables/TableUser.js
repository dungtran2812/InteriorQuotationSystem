import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  TablePagination,
  Tooltip,
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
import { useEffect, useState } from "react";
import { axiosClient } from "../../../../api/axiosClients";
import ConfirmActionUser from "../ModalConfirmUser";

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

const MenuFilter = ({filterObject, setFilterObject}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleTypeHeaderClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [dataFilter, setDataFilter] = useState([])
  useEffect(()=>{
   const fetchAllDataType = async ()=>{
    
    try {
      const response = await axiosClient.get(`role/getAllRole`)
      setDataFilter(response?.data?.data ?? [])
    } catch (error) {
      console.log(error);
    }
   }
   fetchAllDataType()
  },[])
  const handleFilter = async(id)=>{
    setFilterObject({...filterObject, roleId : id === -1 ? null : id})
    setAnchorEl(false)
  }
  return (
    <>
      <IconButton onClick={handleTypeHeaderClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={() => setAnchorEl(false)}
        anchorOrigin={{
          horizontal: "center",
          vertical: "center",
        }}
      >
        <MenuItem onClick={() => {handleFilter(-1)}}>Tất cả</MenuItem>
        {dataFilter?.map((t)=>(
          <MenuItem onClick={()=>handleFilter(t?.id)} key={t?.id}>{t?.name && t?.name === "ROLE_STAFF"
          ? "Nhân Viên"
          : t?.name === "ROLE_ADMIN"
          ? "Quản trị viên"
          : t?.name === "ROLE_USER"
          ? "Khách hàng"
          : t?.name}</MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default function TableUsers({
  users,
  pagination,
  filterObject,
  setFilterObject,
  fetchUsers,
  loading,
  setIsLoading,
}) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const handleChangePage = (event, newPage) => {
    setFilterObject({ ...filterObject, page: newPage });
  };
  const handleChangeRowsPerPage = (event) => {
    setFilterObject({ ...filterObject, page: 0, size: +event.target.value });
  };
  return (
    <>
      <Paper sx={{ mr: 3, ml: 2, mb: 5 }}>
        <TableContainer>
          <Table sx={{ minWidth: 1200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Họ tên</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                <StyledTableCell
                  align="center"                
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Vai trò <MenuFilter filterObject={filterObject} setFilterObject={setFilterObject}/>
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading === false &&
                users?.map((user, index) => (
                    <StyledTableRow key={user?.id}>
                      <StyledTableCell align="center">
                        {index + 1 + pagination?.size * pagination?.page}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ maxWidth: 160 }}
                      >
                        <Stack
                          direction={"row"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Avatar src={user.avt} alt="avatar user" />
                          <Typography align="left">{user.fullName}</Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.email ? user.email : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.phone ? user.phone : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.address ? user.address : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.role && user?.role === "ROLE_STAFF"
                          ? "Nhân Viên"
                          : user?.role === "ROLE_ADMIN"
                          ? "Quản trị viên"
                          : user?.role === "ROLE_USER"
                          ? "Khách hàng"
                          : user?.role}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.status === "ACTIVE" ? (
                          <Tooltip title={`Ban User: ${user?.fullName}`}>
                            <IconButton
                              color="error"
                              aria-label="add an alarm"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpen(true);
                              }}
                              disabled={
                                user?.role === "ROLE_ADMIN" ? true : false
                              }
                            >
                              <NotInterestedIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title={`Active User: ${user?.fullName}`}>
                            <IconButton
                              color="success"
                              aria-label="add an alarm"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpen(true);
                              }}
                              disabled={
                                user?.role === "ROLE_ADMIN" ? true : false
                              }
                            >
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              {users?.length === 0 && loading === false && (
                <StyledTableRow>
                  <StyledTableCell colSpan={7} align="left">
                    <Typography align="center">Dữ liệu trống!</Typography>
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
                      <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="rectangular"
                          width={200}
                          height={20}
                        />
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
        {selectedUser && (
          <ConfirmActionUser
            user={selectedUser}
            open={open}
            setOpen={setOpen}
            fetchUsers={fetchUsers}
            setIsLoading={setIsLoading}
          />
        )}
      </Paper>
    </>
  );
}
