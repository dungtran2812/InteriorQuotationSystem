import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../api/axiosClients";
import Loading from "../../Loading";
import SidebarComponent from "../components/Sidebar";
import TableRawMaterial from "../components/Tables/TableRawMaterial";
import ModalCreateRawMaterial from "../components/CreateRawMaterial";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function RawMaterialListPage() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [filterObject, setFilterObject] = useState({
    page: 0,
    size: 10,
    sort: ["id"]
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 10,
  });

  const fetchRawMaterials = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = filterObject;
      const response = await axiosClient.get("/rawMaterial/getAllRawMaterial", {
        params,
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });
      setRawMaterials(response?.data?.data?.content ?? []);
      setPagination({
        page: response.data?.data.number,
        size: response.data?.data.size,
        total: response.data?.data.totalElements,
      });
    } catch (error) {
      console.log("Error fetching rawMaterials:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterObject]);

  useEffect(() => {
    fetchRawMaterials();
  }, [fetchRawMaterials]);

  return (
    <div className="dashboard-page">
      <Loading isLoading={isLoading} />
      <SidebarComponent />
      <div
        style={{ display: "block", width: "100%", backgroundColor: "#F2F5F8" }}
      >
        <Typography variant="h5" sx={{ m: 3 }}>
          Danh sách nguyên liệu thô
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display={"flex"} justifyContent={"flex-end"} width={"100%"} mb={2}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            size="small"
            sx={{
              mr: 3,
              color: "black",
              backgroundImage: `linear-gradient(to right top, #ffab91, #ffb793, #ffc497, #ffd09d, #ffdca5, #f7e3a6, #eeebaa, #e3f2b1, #c8f6b8, #aaf9c6, #87fbd9, #5ffbf1)`,
            }}
            onClick={() => setShowModalCreate(true)}
          >
            Thêm mới nguyên liệu
          </Button>
        </Box>

        <TableRawMaterial
          rawMaterials={rawMaterials}
          pagination={pagination}
          filterObject={filterObject}
          setFilterObject={setFilterObject}
          fetchRawMaterials={fetchRawMaterials}
          loading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      {showModalCreate && (
        <ModalCreateRawMaterial
          setIsLoading={setIsLoading}
          open={showModalCreate}
          setOpen={setShowModalCreate}
          fetchRawMaterials={fetchRawMaterials}
        />
      )}
    </div>
  );
}
