import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../api/axiosClients";
import Loading from "../../Loading";
import ModalCreateProduct from "../components/CreateProduct";
import SidebarComponent from "../components/Sidebar";
import TableProducts from "../components/Tables/TableProduct";

const { Option } = Select;
//
export default function ProductListPage() {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [filterObject, setFilterObject] = useState({
    page: 0,
    size: 10,
    sort: ["id"],
    type: null,
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 10,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = filterObject;
      const response = await axiosClient.get(
        "/product/getAllPageProductByType",
        {
          params,
          paramsSerializer: {
            indexes: null, // by default: false
          },
        }
      );
      setProducts(response?.data?.data?.content ?? []);
      setPagination({
        page: response.data?.data.number,
        size: response.data?.data.size,
        total: response.data?.data.totalElements,
      });
      console.log("zo đây ???");
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filterObject]);
  useEffect(() => {
    // Fetch list types of products
    const fetchProductTypes = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/product/getAllType");
        setProductTypes(response.data.data ?? []);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };
    fetchProducts();
    fetchProductTypes();
  }, [fetchProducts]);

  // useEffect(() => {
  //   // Fetch products by type when selectedType changes
  //   const fetchProductsByType = async () => {
  //     try {
  //       if (selectedType) {
  //         setIsLoading(true);
  //         const response = await axiosClient.get(
  //           `/product/getAllProductByType?type=${selectedType}`
  //         );
  //         setProducts(response.data.data ?? []);
  //         setPagination(null);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products by type:", error);
  //       setIsLoading(false);
  //     }
  //   };
  //   selectedType === null ? fetchProducts() : fetchProductsByType();
  // }, [selectedType, fetchProducts]);

  const handleTypeChange = (value) => {
    if (value) setFilterObject({ ...filterObject, type: value });
    else setFilterObject({ ...filterObject, type: null });
  };

  return (
    <div className="dashboard-page">
      <Loading isLoading={isLoading} />
      <SidebarComponent />
      <div
        style={{ display: "block", width: "100%", backgroundColor: "#F2F5F8" }}
      >
        <Typography variant="h5" sx={{ m: 3 }}>
          List Product
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack
          direction={"row"}
          minWidth={"80vw"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={3}
        >
          <div style={{ marginLeft: "16px" }}>
            <label
              htmlFor="productType"
              style={{ fontWeight: 600, marginRight: "5px" }}
            >
              Filter by type:
            </label>
            <Select
              id="productType"
              value={filterObject.type}
              onChange={handleTypeChange}
              style={{ width: 200 }}
            >
              <Option value="">All</Option>
              {productTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>
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
            Create Product
          </Button>
        </Stack>
        {showModalCreate && (
          <ModalCreateProduct
            setIsLoading={setIsLoading}
            open={showModalCreate}
            setOpen={setShowModalCreate}
            fetchProducts={fetchProducts}
          />
        )}
        <TableProducts
          products={products}
          pagination={pagination}
          filterObject={filterObject}
          setFilterObject={setFilterObject}
          fetchProducts={fetchProducts}
          loading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
