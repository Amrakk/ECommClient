import axios from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/v1",
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
