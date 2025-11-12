import axios, {AxiosError, AxiosInstance} from "axios";
import {useAuthStore} from "../store/AuthStore";

let isRedirecting = false
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status: undefined | number = error.response?.status;
        const originalRequest = error.config;
        if (status === 401 && originalRequest && !isRedirecting) {
            isRedirecting = false
            window.location.href = '/login'
        }
        isRedirecting = false
        return Promise.reject(error)
    }
)

export default axiosInstance;
