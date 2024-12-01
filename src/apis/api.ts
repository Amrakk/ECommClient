import axios, { isAxiosError } from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/v1",
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isAxiosError(error)) {
            if (!error.response) {
                return Promise.reject({
                    code: 500,
                    message: "Unable to connect to the server. Please check your internet connection.",
                });
            }
            if (error.code === "ECONNABORTED") {
                return Promise.reject({
                    code: 408,
                    message: "Request timed out. Please try again.",
                });
            }
            const isAdminURL = error.response.config.url?.includes("/admin");
            if (error.response.status === 401 && isAdminURL) {
                window.location.href = "/home";
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject({
            code: 500,
            message: "An unexpected error occurred. Please try again.",
        });
    }
);
