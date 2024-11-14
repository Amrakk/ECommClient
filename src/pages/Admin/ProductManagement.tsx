import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header.tsx";
import Sidebar from '../../layouts/Sidebar.tsx';
import { getProducts } from "../../apis/api.ts";

interface Product {
  _id: number;
  name: string;
  category: string;
  brand: string;
}

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  
  // Define filter states
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    brand: "",
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    limit: 10,
    page: 1,
  });

  // Fetch products with the filters applied
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(filters);
      console.log("Fetched Products:", data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "" ? undefined : value,
    }));
  };

  const handleRowClick = (id: number) => {
    navigate(`/admin/product/${id}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      <div className="flex-1 p-6">
        <header>
          <Header />
        </header>

        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, id, ..."
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="border border-gray-300 px-4 py-2 rounded w-48"
            >
              <option value="">All Categories</option>
              <option value="home">Home</option>
              <option value="electronics">Electronics</option>
              <option value="office">Office</option>
            </select>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="border border-gray-300 px-4 py-2 rounded w-48"
            >
              <option value="">All Brands</option>
              <option value="ComfortSeating">ComfortSeating</option>
              <option value="LG">LG</option>
              <option value="Samsung">Samsung</option>
            </select>
            <button className="bg-black text-white px-4 py-2 rounded">Search</button>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            // onClick={() => setIsModalOpen(true)}
          >
            Add product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Category</th>
                <th className="px-4 py-2 text-center">Brand</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(product._id)}
                  >
                    <td className="px-4 py-3 bg-gray-100">{product._id}</td>
                    <td className="px-4 py-3 bg-gray-100">{product.name}</td>
                    <td className="px-4 py-3 bg-gray-100">{product.category}</td>
                    <td className="px-4 py-3 bg-gray-100">{product.brand}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
