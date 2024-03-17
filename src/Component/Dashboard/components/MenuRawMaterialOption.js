import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";

export default function MenuActionOfRawMaterial({
  setOpen,
  rawMaterial,
  setSelectedRawMaterial,
  fetchRawMaterials
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdate = () => {
    setAnchorEl(null);
    setSelectedRawMaterial(rawMaterial);
    setOpen(true);
  };
  const handleDelete = (status) => {
    setAnchorEl(null);
    const confirmed = window.confirm(
      status === "ACTIVE"
        ? `Do you want to delete ${rawMaterial?.name} ?`
        : `Do you want to Active Raw Material: ${rawMaterial?.name} ? `
    );
    const callAPIDelete = async () => {
      try {
        await axiosClient.delete(
          `/rawMaterial/deleteRawMaterial?id=${rawMaterial.id}&status=${status}`
        );
        toast.success(status === "ACTIVE" ? "ACTIVE Raw Material successfully" : "Delete Raw Material successfully");
        fetchRawMaterials()
      } catch (error) {
        console.log("error delete: ", error);
        toast.error(status === "ACTIVE" ? "ACTIVE Raw Material failed!" : "Delete Raw Material failed!");
      }
    };
    if (confirmed) {
      callAPIDelete();
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
        <MenuItem onClick={() => handleUpdate()}>
          <EditIcon sx={{ mr: "4px" }} color="info" />
          <span>Update</span>
        </MenuItem>
        {rawMaterial?.status === "ACTIVE" && (
          <MenuItem onClick={() => handleDelete("INACTIVE")}>
            <DeleteForeverIcon sx={{ mr: "4px" }} color="error" />
            <span>Delete</span>
          </MenuItem>
        )}
        {rawMaterial?.status === "INACTIVE" && (
          <MenuItem onClick={() => handleDelete("ACTIVE")}>
            <CheckCircleOutlineIcon sx={{ mr: "4px" }} color="success" />
            <span>ACTIVE</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
