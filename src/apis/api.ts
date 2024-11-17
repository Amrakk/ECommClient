import axios, { isAxiosError } from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/v1",
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                window.location.href = "/home";
            }

            return Promise.reject(error.response.data);
        }

        throw error;
    }
);
