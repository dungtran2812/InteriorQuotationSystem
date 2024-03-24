import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axiosClients";
import useAuth from "../../hooks/useAuth"

export default function MenuActionRegisterList({data}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {auth} = useAuth()
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
    const confirmed = window.confirm(`Bạn có muốn xác nhận báo giá ?`);
    const callAPIConfirm = async () => {
      try {
        await axiosClient.put(`/project/updateProjectByStatus?projectId=${data?.id}&status=QUOTING&userId=${auth?.id}`)
        toast.success("Xác nhận báo giá thành công")
        navigate(0)
      } catch (err) {
        console.log(err);
        toast.error("Xác nhận báo giá thất bại !")
      }
    };
    if (confirmed) {
      callAPIConfirm();
    }
  };
  const handleReject = () => {
    setAnchorEl(null);
    const confirmed = window.confirm(`Bạn có muốn từ chối báo giá ?`);
    const callAPIReject = async () => {
      try {
        await axiosClient.put(`/project/updateProjectByStatus?projectId=${data?.id}&status=REJECTED&userId=${auth?.id}`)
        toast.success("Từ Chối báo giá thành công")
        navigate(0)
      } catch (err) {
        console.log(err);
        toast.error("Từ Chối báo giá thất bại !")
      }
    };
    if (confirmed) {
      callAPIReject();
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

        <MenuItem onClick={() => handleReject()}>
          <CancelIcon sx={{ mr: "4px" }} color="error" />
          <span>Từ Chối báo giá</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
