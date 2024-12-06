import axios, { AxiosResponse, AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";
const TOKEN = import.meta.env.VITE_READ_ACCESS_TOKEN || "";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (req) => {
    if (TOKEN && req.headers) {
      req.headers.Authorization = `Bearer ${TOKEN}`;
    }
    console.log("Start request", req);
    return req;
  },
  (err: AxiosError) => {
    console.log("Request Error", err);
    return Promise.reject(err.response?.data || err.message);
  }
);

apiService.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err: AxiosError) => {
    console.log("Response Error", err);
    return Promise.reject(err.response?.data || err.message);
  }
);

export { apiService };
