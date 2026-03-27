import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5008/api",
  // baseURL: "https://api.drankushgarg.com/api", // Production URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
