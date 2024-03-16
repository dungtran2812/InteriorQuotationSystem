import axios from "axios";
import { BASE_URL } from "../config";

export const loginWithGG = async (accessToken) => {
  try {
    axios.post(
      `${BASE_URL}/login/signin/gmail?accessToken=${accessToken}`
    )
    .then(res => {
      console.log(res?.data?.data?.accessToken)
      localStorage.setItem("token", res?.data?.data?.accessToken);
      return res;
    })
    .catch(err => {
      console.log(err);
      return err
    })
    // localStorage.setItem("token", response.data.data.accessToken);
    localStorage.setItem("userId", response.data.data.id);
    console.log(localStorage.getItem("userId"));
    // console.log(localStorage.getItem("token"));
    console.log(response.data.data);
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};
