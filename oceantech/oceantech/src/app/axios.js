import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use((response) => response);

export default axiosInstance;
