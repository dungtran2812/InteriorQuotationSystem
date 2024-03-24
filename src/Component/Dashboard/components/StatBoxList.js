import { Grid } from "@mui/material";
import React from "react";
import StatBox from "./StatBox";
import SelectStatus from "./SelectComponent";

const StatBoxList = ({
  totalUsers,
  totalProducts,
  totalProjects,
  totalRaws,
  statusProduct,
  statusProject,
  statusUser,
  statusRaw,
  setStatusProduct,
  setStatusRaw,
  setStatusProject,
  setStatusUser,
}) => {
  const listStatusCommon = [
    {
      id: 1,
      value: "ACTIVE",
      name: "Đang hoạt động",
    },
    {
      id: 2,
      value: "INACTIVE",
      name: "Ngừng hoạt động",
    },
  ];
  const listStatusProject = [
    {
      id: 1,
      value: "ACTIVE",
      name: "Đang hoạt động",
    },
    {
      id: 2,
      value: "NEW",
      name: "Dự án mới",
    },
    {
      id: 3,
      value: "QUOTING",
      name: "Đang báo giá",
    },
    {
      id: 4,
      value: "REJECTED",
      name: "Đã bị từ chối",
    },
    {
      id: 5,
      value: "COMPLETED",
      name: "Đã hoàn thành",
    },
  ];

  return (
    <Grid container spacing={8} pl={10} pr={10}>
      <Grid item xs={12} md={6}>
        <SelectStatus
          dataOptions={listStatusCommon}
          dataSelected={statusUser}
          setDataSelected={setStatusUser}
          label={"Trạng thái người dùng"}
        />
        <StatBox 
        data={totalUsers} 
        title={"Tổng số người dùng"}
       imageSrc={"https://truongthang.vn/wp-content/uploads/2023/08/truong-thang-showroom-noi-that-la-gi-va-nhung-mon-do-noi-that-pho-bien.jpg"}
        />
      </Grid>
      <Grid item xs={12} md={6}>
         <SelectStatus
          dataOptions={listStatusProject}
          dataSelected={statusProject}
          setDataSelected={setStatusProject}
          label={"Trạng thái dự án"}
        />
        <StatBox data={totalProjects} title={"Tổng số dự án"} 
        imageSrc={"https://nycdecor.vn/wp-content/uploads/2023/08/1-Khach-bep-4.jpg"}
       />
      </Grid>
      <Grid item xs={12} md={6}>
         <SelectStatus
          dataOptions={listStatusCommon}
          dataSelected={statusProduct}
          setDataSelected={setStatusProduct}
          label={"Trạng thái sản phẩm"}
        />
        <StatBox data={totalProducts} title={"Tổng số sản phẩm"} 
         imageSrc={"https://jysk.vn/img/3602023_5.jpg"}
        />
      </Grid>
      <Grid item xs={12} md={6}>
         <SelectStatus
          dataOptions={listStatusCommon}
          dataSelected={statusRaw}
          setDataSelected={setStatusRaw}
          label={"Trạng thái vật liệu"}
        />
        <StatBox data={totalRaws}  imageSrc={"https://vatlieuxdtoanquoc.com/upload/news/vl-tho-toanquoc-2164.jpg"} title={"Tổng số vật liệu"} />
      </Grid>
    </Grid>
  );
};

export default StatBoxList;
