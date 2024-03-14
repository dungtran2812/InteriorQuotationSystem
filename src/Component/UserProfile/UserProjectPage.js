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
import { Typography } from "@mui/material";


export default function UserProjectPage() {
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
    <div className="container">
        <Typography variant="h4" sx={{marginBottom:'30px'}}>Dự Án Của Tôi</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1200px",
            margin: "auto",
            paddingBottom:'30px'
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
    </div>
  );
}
