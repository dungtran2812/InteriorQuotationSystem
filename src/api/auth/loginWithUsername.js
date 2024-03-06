import axios from "axios";
import { BASE_URL } from "../config";

export const loginWithUserName = async (userName, password) => {
  try {
    
    const response = await axios.post(`${BASE_URL}/login/signin?username=${userName}&password=${password}`);
    localStorage.setItem("token", response.data.data?.accessToken);
    console.log(response.data.data);
    return {
      data: response.data.data,
      error: null,
    }
  } catch (error) {
    console.log("Error signing in with Google:", error);
    return {
      data: null,
      error: error,
    }
  }
};
