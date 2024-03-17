import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axiosClients";

export default function MenuActionRegisterList({data}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = () => {
    setAnchorEl(null);
    navigate(`/staff-dashboard/quotePage/${data?.id}`)
  };
  const handleConfirm = () => {
    setAnchorEl(null);
    const confirmed = window.confirm(`Do you want to confirm ?`);
    const callAPIConfirm = async () => {
      try {
        await axiosClient.put(`/product`);
        toast.success("Confirmed successfully");

      } catch (error) {
        console.log("error delete: ", error);
        toast.error("Confirm failed!");
      }
    };
    if (confirmed) {
      callAPIConfirm();
    }
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "20px" }}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleView()}>
          <VisibilityOutlinedIcon sx={{ mr: "4px" }} color="info" />
          <span>Xem bảng báo giá</span>
        </MenuItem>

        <MenuItem onClick={() => handleConfirm()}>
          <CheckCircleOutlineIcon sx={{ mr: "4px" }} color="success" />
          <span>Xác nhận báo giá</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
