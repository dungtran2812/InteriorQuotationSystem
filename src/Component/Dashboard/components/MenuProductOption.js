import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";

export default function MenuActionOfProduct({
  setOpen,
  product,
  setSelectedProduct,
  fetchProducts
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
    console.log("product", product);
    setAnchorEl(null);
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleDelete = (status) => {
    setAnchorEl(null);
    const confirmed = window.confirm(
      status === "ACTIVE"
        ? `Do you want to delete ${product?.name} ?`
        : `Do you want to active product: ${product?.name} ? `
    );
    const callAPIDelete = async () => {
      try {
        await axiosClient.delete(
          `/product/deleteProduct?id=${product.id}&status=${status}`
        );
        toast.success(
          status === "ACTIVE"
            ? "ACTIVE product successfully"
            : "Delete product successfully"
        );
        fetchProducts()
      } catch (error) {
        console.log("error delete: ", error);
        toast.error(
          status === "ACTIVE"
            ? "ACTIVE product failed!"
            : "Delete product failed!"
        );
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
          <span>Cập nhật</span>
        </MenuItem>
        {product?.status === "ACTIVE" && (
          <MenuItem onClick={() => handleDelete("INACTIVE")}>
            <DeleteForeverIcon sx={{ mr: "4px" }} color="error" />
            <span>Xóa</span>
          </MenuItem>
        )}
        {product?.status === "INACTIVE" && (
          <MenuItem onClick={() => handleDelete("ACTIVE")}>
            <CheckCircleOutlineIcon sx={{ mr: "4px" }} color="success" />
            <span>Kích hoạt</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
