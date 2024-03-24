import { Avatar, Box, Button, Stack, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/axiosClients";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
export default function UserProfile() {
  const { auth } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "Trịnh Bình Minh",
    phone: "0888666888",
    address: "Thủ Đức",
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const params = {
          id: auth?.id,
        };
        const response = await axiosClient.get("/user/getUserById", {
          params,
        });
        setProfileData({
          ...profileData,
          name: response.data?.data?.fullName,
          email: response.data?.data?.email ? response.data?.data?.email : "",
          phone: response.data?.data?.phone ? response.data?.data?.phone : "",
          address: response.data?.data?.address
            ? response.data?.data?.address
            : "",
        });
        setImgSrc(response.data?.data?.avt ? response.data?.data?.avt : "");
      } catch (error) {
        console.log("Error fetching profileData:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const fileSubmit = new FormData();
      fileSubmit.append("fileImg", profileData.imageFile);
      const response = await axiosClient.put(
        `/user/updateUser?userId=${auth?.id}&fullName=${profileData.name}&phone=${profileData.phone}&address=${profileData.address}`,
        fileSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      toast.success("Update profile data successfully");
    } catch (error) {
      console.log("Update profile data failed", error);
      toast.error("Update profile data failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Loading isLoading={isLoading} />

      <div
        style={{ display: "block", width: "100%", backgroundColor: "white" }}
      >
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
            mb: 5,
          }}
        >
          <Card
            sx={{
              height: "600px",
              width: "600px",
              backgroundImage: `linear-gradient(to right top, #ffab91, #ffb793, #ffc497, #ffd09d, #ffdca5, #f7e3a6, #eeebaa, #e3f2b1, #c8f6b8, #aaf9c6, #87fbd9, #5ffbf1)`,
              //</Box>backgroundImage: `linear-gradient(to left bottom, #e0acca, #dbb3d4, #d6badd, #d0c0e3, #ccc7e8, #c5cdf1, #bdd3f8, #b3d9fe, #9be2ff, #80ebff, #68f4ff, #5ffbf1)`
            }}
          >
            <CardContent>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar
                  src={imgSrc}
                  sx={{ width: "180px", height: "180px", border: "1px solid" }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    component="label"
                    color="success"
                    variant="outlined"
                    htmlFor="fileImg"
                  >
                   Chọn ảnh
                    <input
                      hidden
                      multiple
                      type="file"
                      id="fileImg"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const reader = new FileReader();
                        const files = event.currentTarget.files;
                        if (files && files.length !== 0) {
                          reader.onload = () => setImgSrc(reader.result);
                          reader.readAsDataURL(files[0]);
                        }
                        setProfileData({
                          ...profileData,
                          imageFile: event.target.files[0],
                        });
                      }}
                    />
                  </Button>
                </Box>
              </Stack>
              <Box mb={3}>
                <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Họ và tên:
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Input your name here..."
                  fullWidth
                  autoComplete="off"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Số điện thoại:
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Input your phone number here..."
                  fullWidth
                  autoComplete="off"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Địa chỉ:
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Input your address here..."
                  fullWidth
                  autoComplete="off"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                />
              </Box>

              <Button
                fullWidth
                color="info"
                variant="contained"
                sx={{ mt: 5 }}
                onClick={handleUpdateProfile}
              >
                Cập nhật
              </Button>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}
