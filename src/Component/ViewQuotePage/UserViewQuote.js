import { CheckOutlined } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router";
import { toast } from "react-toastify";
import ProductView from "./ProductView";
import RawMaterialView from "./RawMaterialView";
import useMoneyFormatter from "../../hooks/useMoneyFormatter";
import { axiosClient } from "../../api/axiosClients";
import Loading from "../Loading";
export default function UserViewQuote() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetch, setDataFetch] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(
          `quote/getAllQuoteByProjectId?projectId=${id}`
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
  //format money
  const [formatMoney] = useMoneyFormatter();
  
  return (
    <div>
      <Loading isLoading={isLoading} />
        <Typography sx={{ m: 2 }} variant="h5">
          Xem báo giá
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
              <Typography variant="body2" color="text.secondary">
                Giá thi công loại thiết kế: {formatMoney(dataFetch?.constructionPriceType)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giá thi công loại dự án: {formatMoney(dataFetch?.constructionPriceDesign)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng giá tiền: {formatMoney(dataFetch?.totalPrice)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{
                  color: "black",
                  backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
                }}
                fullWidth
                onClick={()=>{navigate(-1)}}
                variant="contained"
              >
                Trở về
              </Button>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ p: 3 }}>
          {dataFetch?.withAllQuoteDetailDTOList &&
            dataFetch?.withAllQuoteDetailDTOList?.map((q, index) => (
              <Box key={index} sx={{mb: 2}}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{
                      backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
                    }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography>Tên phòng: {q.roomName}</Typography>
                      <Typography>Diện tích: {q.area} m²</Typography>
                      <Typography>
                        Tổng giá tiền: {formatMoney(q.total)}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {q.quoteDetailDTOS &&
                      q.quoteDetailDTOS?.map((qd, index2) => {
                        if (qd?.product) {
                          return (
                            <ProductView
                              data={qd?.product}
                              quantity={qd?.quantity}
                              qoutePrice={qd?.priceChange}
                              note={qd?.note}
                              quoteId={qd?.id}
                              key={index2}
                            />
                          );
                        }
                        if (qd?.rawMaterial) {
                          return (
                            <>
                              <Box mb={2}></Box>
                              <RawMaterialView
                                data={qd?.rawMaterial}
                                qoutePrice={qd?.totalPrice}
                                area={qd?.area}
                                quoteId={qd?.id}
                                key={index2}
                              />
                            </>
                          );
                        }
                        return <></>;
                      })}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
        </Box>
    </div>
  );
}
