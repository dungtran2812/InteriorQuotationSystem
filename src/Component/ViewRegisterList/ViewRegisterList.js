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

const sampleData = [
  {
    customerName: "John Doe",
    email: "johndoe@example.com",
    phone: "555-555-5555",
    registDate: "2022-01-01",
    note: "Some note about this customer",
  },
  {
    customerName: "Jane Doe",
    email: "janedoe@example.com",
    phone: "555-555-5556",
    registDate: "2022-01-02",
    note: "Some note about this customer",
  },
  {
    customerName: "Bob Smith",
    email: "bobsmith@example.com",
    phone: "555-555-5557",
    registDate: "2022-01-03",
    note: "Some note about this customer",
  },
];

export default function ViewRegisterList() {
  const navigate = useNavigate()
  const [project, setProject] = React.useState([])

  React.useEffect(() => {
    axios.get("https://furniture-quote.azurewebsites.net/project/getAllProjectByStatus?status=NEW")
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
                    Tạo bảng báo giá mới
                  </Button>
                  <Button variant="contained" color="error">
                    Xem bảng báo giá
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
