import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Regist Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Quote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row) => (
              <TableRow key={row.customerName}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.registDate}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <Button variant="contained" color="primary">
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
