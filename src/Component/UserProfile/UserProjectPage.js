import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { format } from "date-fns";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axiosClients";
import { toast } from "react-toastify";
import { message } from "antd";

export default function UserProjectPage() {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [project, setProject] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 10,
    total: 0
  });
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate()
  const fetchProjects = async (page, size) => {
    try {
      const response = await axios.get(`https://furniture-quote.azurewebsites.net/project/getAllPageProjectByStatusAndUserId?page=${page}&size=${size}&sort=id&userId=${userId}`);
      const { content, totalElements } = response?.data?.data;
      setProject(content);
      setPagination({
        page,
        size,
        total: totalElements
      });
    } catch (error) {
      console.error('There was a problem with the request:', error);
    }
  };
const handleConfirmQuote = (id, status) => {
  if (status !== 'NEW') {
    setAnchorEl(null);
    const confirmed = window.confirm(`Bạn có muốn xác nhận báo giá ?`);
    const callAPIConfirm = async () => {
      try {
        await axiosClient.put(`/project/updateProjectByStatus?projectId=${id}&status=COMPLETED`)
        toast.success(" Đồng Ý Báo Giá Thành Công")
        navigate(0)
      } catch (err) {
        console.log(err);
        toast.error("Đồng Ý Báo Giá thất bại !")
      }
    };
    if (confirmed) {
      callAPIConfirm();
    }
  } else {
    message.error('Đơn Báo Giá Chưa Được Xác Nhận')
  }
    
  };
  React.useEffect(() => {
    fetchProjects(0, pagination.size);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    fetchProjects(newPage, pagination.size);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    fetchProjects(0, newSize);
  };

  return (
    
    <div className="container">
      <Typography variant="h4" sx={{ marginBottom: '30px', ml: 3 }}>Dự Án Của Tôi</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "1200px",
          margin: "auto",
          paddingBottom: '30px'
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên dự án</TableCell>
                <TableCell>Phong cách</TableCell>
                <TableCell>Người dùng</TableCell>
                <TableCell>Tạo lúc</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Báo giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell>{row?.designStyleName}</TableCell>
                  <TableCell>{row?.userDetailDTO?.fullName}</TableCell>
                  <TableCell>{format(new Date(row?.createdAt), "PPP")}</TableCell>
                  <TableCell>{row?.status}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained" size="small" color="success" onClick={()=>{navigate(`/quotepage/${row?.id}`)}}>
                      Xem bảng báo giá
                    </Button>
                    <Button variant="contained" size="small" color="warning" onClick={()=>{handleConfirmQuote(row?.id, row?.status)}}>
                      Đồng Ý báo giá
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[6, 10, 20]}
            component="div"
            count={pagination.total}
            rowsPerPage={pagination.size}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}
