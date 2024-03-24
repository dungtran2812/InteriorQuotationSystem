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
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import ProductView from "./ProductView";
import RawMaterialView from "./RawMaterialView";
import useMoneyFormatter from "../../hooks/useMoneyFormatter";
import { axiosClient } from "../../api/axiosClients";
import Loading from "../Loading";
import useAuth from "../../hooks/useAuth";
export default function UserViewQuote() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetch, setDataFetch] = useState({});
  const { id } = useParams();
  const {auth} =useAuth()
  const location = useLocation()
  const [isCreate, setIsCreate] = useState(false)
  const [projectName, setProjectName] = useState("Tên dự án")
  const [addressUser, setAddressUser] = useState("Hồ Chí Minh")
  const [errorMsg, setErrorMsg] = useState({
    nameMsg: "",
   addressMsg: "", 
  });
  useEffect(()=>{
   if(location.state?.isCreateNewProjectBasedOnSample){
    setIsCreate(true)
    setProjectName(dataFetch?.projectDTO?.name ?? "Tên dự án")
   }
  },[location.state, dataFetch])
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
  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post(
        `/project/createSampleProject`,{
          projectSampleId: id,
  userId: auth?.id,
  name: projectName,
  location: addressUser
        }
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
  const handleUpdateTotalQuote = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.put(`/quote/updateTotalQuote?projectId=${id}`);
      const response2 = await axiosClient.put(`/project/updateProjectByStatus?projectId=${id}&status=COMPLETED`)
      console.log(response, response2);
      toast.success("Xác nhận thành công")
      navigate('/user-project')
    } catch (error) {
      console.log("error getting quote", error);
      toast.error("Xác nhận thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Loading isLoading={isLoading} />
        <Typography sx={{ m: 2 }} variant="h5">
          Xem thông tin giá
        </Typography>
        <Divider />
        <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={3}>
          <Card sx={{ width: 300 }}>
            <CardContent>
            {isCreate ? (                       
                  <TextField                        
                    size="small"
                    label="Tên dự án"   
                    fullWidth                                                              
                    value={projectName}
                    error={errorMsg?.nameMsg ? true : false}
                    helperText={
                      errorMsg?.nameMsg !== "" ? errorMsg?.nameMsg : ""
                    }
                    onChange={(e) => {
                      if (!e.target.value) {
                        setErrorMsg({
                          ...errorMsg,
                          nameMsg: "Tên dự án là bắt buộc!",
                        });
                      } else {
                        setErrorMsg({ ...errorMsg, nameMsg: "" });
                      }
                      setProjectName(e.target.value);
                    }}
                    sx={{mb: 2}}
                  />
                  
                ) : (
                  <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="div"
                sx={{mb: 1}}
              >
                {dataFetch?.projectDTO?.name}
              </Typography>
                )} 
              {isCreate ? (                       
                  <TextField                        
                    size="small"
                    label="Địa chỉ"   
                    placeholder="Vui lòng nhập địa chỉ"
                    fullWidth     
                    error={errorMsg?.addressMsg ? true : false}
                    helperText={
                      errorMsg?.addressMsg !== "" ? errorMsg?.addressMsg : ""
                    }                                                       
                    onChange={(e) => {
                      if (!e.target.value) {
                        setErrorMsg({
                          ...errorMsg,
                          addressMsg: "Địa chỉ là bắt buộc!",
                        });
                      } else {
                        setErrorMsg({ ...errorMsg, addressMsg: "" });
                      }
                      setAddressUser(e.target.value);
                    }}
                    value={addressUser}
                    sx={{mb: 2}}
                  />
                  
                ) : (
                <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Địa chỉ: {dataFetch?.projectDTO?.location}
              </Typography>
                )}
                  <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Loại: {dataFetch?.projectDTO?.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Phong cách: {dataFetch?.projectDTO?.designStyleName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Giá thi công loại thiết kế: {formatMoney(dataFetch?.constructionPriceType)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                Giá thi công loại dự án: {formatMoney(dataFetch?.constructionPriceDesign)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng giá tiền: {formatMoney(dataFetch?.totalPrice)}
              </Typography>
            </CardContent>
            <CardActions>
              {isCreate ?  <Button
                size="small"
                sx={{
                  color: "black",
                  backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
                }}
                fullWidth
                onClick={handleConfirm}
                variant="contained"
                disabled={
                  !errorMsg?.nameMsg &&
                  !errorMsg?.addressMsg           
                    ? false
                    : true
                }
              >
                Xác nhận
              </Button> :  (<>
               {dataFetch?.projectDTO?.status === "QUOTING" &&  <Button
                size="small"
                sx={{
                  color: "black",
                  backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
                }}
                fullWidth
                onClick={handleUpdateTotalQuote}
                variant="contained"
                disabled={
                  !errorMsg?.nameMsg &&
                  !errorMsg?.addressMsg           
                    ? false
                    : true
                }
              >
                Xác nhận
              </Button>}
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
              </Button></>)}
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
                              note={qd?.note}
                              quoteId={qd?.id}
                              key={index2}
                              totalPrice = {qd?.totalPrice}
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
