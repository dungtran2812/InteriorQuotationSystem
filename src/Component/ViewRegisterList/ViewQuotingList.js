import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";


export default function ViewQuotingList() {
  const navigate = useNavigate()
  const [project, setProject] = React.useState([])

  React.useEffect(() => {
    axios.get("https://furniture-quote.azurewebsites.net/project/getAllProjectByStatus?status=QUOTING")
    .then((response) => {
      console.log(response?.data?.data)
      setProject(response?.data?.data)
    })
    .catch((error) => {
      console.error('There was a problem with the request:', error);
    })

  }, [])
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "1200px",
        margin: "auto",
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
                  <Button variant="contained" color="primary" onClick={() => {
                    navigate('/staff-dashboard/quotePage')
                  }}>
                    Xem Bảng Báo Giá
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
