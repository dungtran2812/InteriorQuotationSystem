import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";

export default function ConfirmActionUser({ open, setOpen, user, fetchUsers, setIsLoading }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleBanUser = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.delete(
        `/user/deleteUser?id=${user?.id}&status=${user?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}`
      );
      console.log(response);
      toast.success(user?.status === "ACTIVE" ?`Ban User ${user?.fullName} Completed !`: `ACTIVE User ${user?.fullName} Completed !`);
      fetchUsers();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(`Ban User ${user?.fullName} Failed !`);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h5">
            CONFIRM TO {user?.status === "ACTIVE" ? "BAN" : "ACTIVE"} USER
          </Typography>
          <Divider />
          {user?.status === "ACTIVE" ? (
            <Typography sx={{ mt: 3 }}>
              {" "}
              Do you want to <strong style={{ color: "red" }}>
                BAN
              </strong> user:{" "}
              <span style={{ color: "blue" }}>{user?.fullName}</span>. After
              BANNED, this user cannot be access to the system until you UNBAN!{" "}
            </Typography>
          ) : (
            <Typography sx={{ mt: 3 }}>
              {" "}
              Do you want to <strong style={{ color: "green" }}>
                UNBAN
              </strong>{" "}
              user: <span style={{ color: "blue" }}>{user?.fullName}</span>.
              After UNBAN, this user can be access to the system.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ width: "120px" }}
            color="info"
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            variant="contained"
            sx={{ width: "120px" }}
            color={user?.status === "ACTIVE" ? "error" : "success"}
            onClick={handleBanUser}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
