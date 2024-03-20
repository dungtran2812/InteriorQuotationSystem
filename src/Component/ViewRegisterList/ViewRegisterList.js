import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
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
import { format } from "date-fns";
import * as React from "react";
import { useEffect, useState } from "react";
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

const MenuFilterType = ({filterObject, setFilterObject}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleTypeHeaderClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [dataFilter, setDataFilter] = useState([])
  useEffect(()=>{
   const fetchAllDataType = async ()=>{
    
    try {
      const response = await axiosClient.get(`/type/getAllType`)
      setDataFilter(response?.data?.data ?? [])
    } catch (error) {
      console.log(error);
    }
   }
   fetchAllDataType()
  },[])
  const handleFilter = async(id)=>{
    setFilterObject({...filterObject, type: id === -1 ? null : id})
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
          <MenuItem onClick={()=>handleFilter(t?.id)} key={t?.id}>{t?.name}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MenuFilterDesignStyle = ({filterObject, setFilterObject}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const handleTypeHeaderClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [dataFilter, setDataFilter] = useState([])
  useEffect(()=>{
   const fetchAllDataType = async ()=>{
    
    try {
      const response = await axiosClient.get(`/designStyle/getAllDesign`)
      setDataFilter(response?.data?.data ?? [])
    } catch (error) {
      console.log(error);
    }
   }
   fetchAllDataType()
  },[])
  const handleFilter = async(id)=>{
    setFilterObject({...filterObject, designStyleId: id === -1 ? null : id})
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
          <MenuItem onClick={()=>handleFilter(t?.id)} key={t?.id}>{t?.name}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default function ViewRegisterList() {
  // const navigate = useNavigate();

  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterObject, setFilterObject] = useState({
    page: 0,
    size: 10,
    sort: ["id"],
    status: "NEW",
    type: null,
    designStyleId: null
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
        const params = filterObject;
        const response = await axiosClient.get(
          "/project/getAllPageProjectByStatusOrDesignStyleOrType",
          {
            params,
            paramsSerializer: {
              indexes: null, // by default: false
            },
          }
        );
        console.log(response.data);
        setProject(response?.data?.data?.content ?? []);
        setPagination({
          page: response.data?.data?.pageable?.pageNumber,
          size: response.data?.data?.pageable?.pageSize,
          total: response.data?.data?.totalElements,
        });
      } catch (error) {
        console.error("There was a problem with the request:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListRegisters();
  }, [filterObject]);
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
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Danh sách dự án
        </Typography>
        <Loading isLoading={isLoading} />
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Tên dự án</StyledTableCell>
                <StyledTableCell align="center"  
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  Phong cách <MenuFilterDesignStyle filterObject={filterObject} setFilterObject={setFilterObject}/>
                </StyledTableCell>
                <StyledTableCell align="center">Người tạo</StyledTableCell>
                <StyledTableCell align="center">Thời gian tạo</StyledTableCell>
                <StyledTableCell align="center">Địa điểm</StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Loại dự án <MenuFilterType filterObject={filterObject} setFilterObject={setFilterObject}/>
                </StyledTableCell>
                <StyledTableCell align="center">Thao tác</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {isLoading === false &&
                project?.map((row, index) => (
                  <StyledTableRow key={row?.id}>
                    <StyledTableCell align="center">
                      {index + 1 + pagination?.size * pagination?.page}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.designStyleName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar
                          src={row?.userDetailDTO?.avt}
                          alt="avatar user"
                        />
                        <Typography align="left">
                          {row?.userDetailDTO?.fullName}
                        </Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(new Date(row?.createdAt), "dd/MM/yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.location}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <MenuActionRegisterList data={row} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {isLoading &&
                Array.from({ length: 10 }).map((index) => (
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
                        <Skeleton
                          variant="rectangular"
                          width={300}
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
        <Divider />
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
