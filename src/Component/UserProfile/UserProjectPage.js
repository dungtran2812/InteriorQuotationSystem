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

export default function UserProjectPage() {
  // const navigate = useNavigate();
  const [project, setProject] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 6,
    total: 0
  });
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate()
  const fetchProjects = async (page, size) => {
    try {
      const response = await axios.get(`https://furniture-quote.azurewebsites.net/project/getAllPageProjectByStatusAndUserId?page=${page}&size=${size}&sort=id&userId=${userId}&status=NEW`);
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
      <Typography variant="h4" sx={{ marginBottom: '30px' }}>Dự Án Của Tôi</Typography>
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
                <TableCell>Project Name</TableCell>
                <TableCell>Design Style Name</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Quote</TableCell>
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
                    }}
                  >
                    <Button variant="contained" color="error" onClick={()=>{navigate(`/quotepage/${row?.id}`)}}>
                      Xem bảng báo giá
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
