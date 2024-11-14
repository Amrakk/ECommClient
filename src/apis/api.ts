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

interface ProductFilters {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  limit?: number;
  page?: number;
}



export const getProducts = async (filters: ProductFilters = {}) => {
  try {
    const response = await API.get("/products", {
      params: { ...filters, isDeleted: false },
    });
    console.log("API response:", response.data);  // Add logging to inspect the API response
    return response.data;  // Ensure the response is returned in the correct format
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // Fallback to an empty array in case of error
  }
};
  
// Function to get a product by ID
export const getProductById = async (id: string) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
};