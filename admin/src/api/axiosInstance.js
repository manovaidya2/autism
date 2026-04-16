import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "http://localhost:5008/api",
  //  baseURL: "https://autismapi.manovaidya.com/api",
  // remove withCredentials if you don't need cookies/auth
});

export default axiosInstance;