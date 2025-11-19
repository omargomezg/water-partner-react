import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {appStore} from "../store/appStore";

const BASE_URL = 'http://localhost:8080/api/v1';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { token } = appStore.getState();
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
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            if (appStore.getState().token) {
                console.log('Token expirado o inválido. Cerrando sesión automáticamente.');
                appStore.getState().logout();
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;