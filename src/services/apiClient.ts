import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAppStore } from "../store/useAppStore";

const BASE_URL = "https://api.pinotconsultores.cl/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAppStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (useAppStore.getState().token) {
        console.log(
          "Token expirado o inválido. Cerrando sesión automáticamente."
        );
        useAppStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
