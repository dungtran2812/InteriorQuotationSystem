import axios from "axios";
import { BASE_URL } from "../config";

export const loginWithGG = async (accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login/signin/gmail?accessToken=${accessToken}`
    );
    localStorage.setItem("token", response.data.data.accessToken);
    console.log(localStorage.getItem("token"));
    console.log(response.data.data);
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};
