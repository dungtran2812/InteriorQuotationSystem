import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Button } from "antd/es/radio";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { axiosClient } from "../../../api/axiosClients";
import Loading from "../../Loading";
import SidebarComponent from "../components/Sidebar";
import ProductStaffQuote from "./ProductStaffQuote";
import RawMaterialStaffQuote from "./RawQuote";
export default function StaffQuotePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetch, setDataFetch] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(
          `project/getAllQuoteByProjectId?projectId=${id}`
        );
        console.log(response.data?.data);
        setDataFetch(response.data?.data);
      } catch (error) {
        console.log("error getting quote", error);
        toast.error("Một số lỗi đã xảy ra, vui lòng thử lại sau!");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);
  console.log("dataFetch", dataFetch);
  return (
    <div className="dashboard-page">
      <Loading isLoading={isLoading} />
      <SidebarComponent />
      <main
        className="content "
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography sx={{ m: 2 }} variant="h5">
          Staff Quote Page
        </Typography>
        <Divider />
        <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={3}>
          <Card sx={{ width: 200 }}>
            {/* <CardMedia
              sx={{ height: 300, width: 300 }}
              image={dataFetch?.projectDTO?.img}
              title="main img"
            /> */}
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="div"
              >
                {dataFetch?.projectDTO?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Loại: {dataFetch?.projectDTO?.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Địa chỉ: {dataFetch?.projectDTO?.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phong cách: {dataFetch?.projectDTO?.designStyleName}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ p: 3 }}>
          {dataFetch?.withAllQuoteDetailDTOList &&
            dataFetch?.withAllQuoteDetailDTOList?.map((q, index) => (
              <Box key={index}>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,}}
                  >
                    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
                    <Typography>Tên phòng: {q.roomName}</Typography>
                    <Typography>Tổng giá tiền: {q.total}</Typography>
                    </Stack>
                   
                  </AccordionSummary>
                  <AccordionDetails>
                    {q.quoteDetailDTOS &&
                      q.quoteDetailDTOS?.map((qd, index) => {
                        if (qd?.product) {
                          return (
                            <ProductStaffQuote
                              data={qd?.product}
                              quantity={qd?.quantity}
                              qoutePrice={qd?.price}
                              note={qd?.note}
                              key={index}
                            />
                          );
                        } else if (qd?.rawMaterial) {
                          return (
                            <>
                              <Box mb={2}></Box>
                              <RawMaterialStaffQuote
                                data={qd?.rawMaterial}
                                qoutePrice={qd?.price}
                                area={qd?.area}
                                key={index}
                              />
                            </>
                          );
                        } else return <></>;
                      })}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
        </Box>
      </main>
    </div>
  );
}
