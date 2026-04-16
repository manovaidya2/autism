import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5008/api",
  //  baseURL: "https://autismapi.manovaidya.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
