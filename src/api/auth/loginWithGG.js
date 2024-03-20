import axios from "axios";
import { BASE_URL } from "../config";

export const loginWithGG = async (accessToken) => {
  console.log('cái này là token gg gửi về', accessToken)
  try {
    const response = await axios.post(
      `${BASE_URL}/login/signin/gmail?accessToken=${accessToken}`
    );
    localStorage.setItem("token", response.data.data.accessToken);
    localStorage.setItem("userId", response.data.data.id);
    localStorage.setItem("userInfor", JSON.stringify(response.data?.data));
    console.log(localStorage.getItem("userId"));
    console.log(localStorage.getItem("token"));
    console.log(response.data.data);
    return response.data?.data
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    return {}
  }
};
