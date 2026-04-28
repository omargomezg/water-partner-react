import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:8080"

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
