import axios from "axios";


export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/v1",
    withCredentials: true,
});


API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


export const fetchProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    console.error(`Error fetching products: `, error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
    try {
        const response = await API.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};
