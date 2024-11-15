import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header.tsx";
import Sidebar from "../../layouts/Sidebar.tsx";

type ProductVariant = {
  quantity: number;
  importPrice: number;
  retailPrice: number;
  details: {
    color: string;
    material: string;
    adjustable: string;
  };
};

type ProductDetails = {
  weightCapacity: string;
  swivel: string;
  wheels: string;
};

type Product = {
  id: number;
  name: string;
  images: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  brand: string;
  relevantProducts: string;
  details: ProductDetails;
  ratings: number;

};

const mockProducts = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    images: "image1.jpg",
    description: "A comfortable ergonomic chair for long hours of work.",
    category: "Office Furniture",
    variants: [
      {
        id: "v1",
        quantity: 50,
        importPrice: 80,
        retailPrice: 150,
        details: {
          color: "Black",
          material: "Mesh",
          adjustable: "Yes",
        },
      },
      {
        id: "v2",
        quantity: 30,
        importPrice: 90,
        retailPrice: 160,
        details: {
          color: "Gray",
          material: "Fabric",
          adjustable: "Yes",
        },
      },
    ],
    brand: "OfficePro",
    relevantProducts: "1",
    details: {
      weightCapacity: "300 lbs",
      swivel: "360-degree",
      wheels: "Yes",
    },
    ratings: 4.5,
   
  },
  {
    id: 2,
    name: "Standing Desk",
    images: "image2.jpg",
    description: "A height-adjustable standing desk for better posture.",
    category: "Office Furniture",
    variants: [
      {
        id: "v1",
        quantity: 25,
        importPrice: 150,
        retailPrice: 250,
        details: {
          color: "Brown",
          material: "Wood",
          adjustable: "Yes",
        },
      },
    ],
    brand: "DeskMasters",
    relevantProducts: "2",
    details: {
      weightCapacity: "200 lbs",
      swivel: "No",
      wheels: "No",
    },
    ratings: 4.0,
   
  },
  {
    id:3,
    name: "Gaming Chair",
    images: "image3.jpg",
    description: "A stylish gaming chair designed for maximum comfort.",
    category: "Gaming",
    variants: [
      {
        id: "v1",
        quantity: 40,
        importPrice: 100,
        retailPrice: 200,
        details: {
          color: "Red",
          material: "Leather",
          adjustable: "Yes",
        },
      },
    ],
    brand: "GameZone",
    relevantProducts: "3",
    details: {
      weightCapacity: "250 lbs",
      swivel: "Yes",
      wheels: "Yes",
    },
    ratings: 4.8,
 
  },
  {
    id: 4,
    name: "Office Desk Organizer",
    images: "image4.jpg",
    description: "Keep your desk tidy with this stylish organizer.",
    category: "Office Supplies",
    variants: [
      {
        id: "v1",
        quantity: 100,
        importPrice: 20,
        retailPrice: 35,
        details: {
          color: "Black",
          material: "Plastic",
          adjustable: "No",
        },
      },
    ],
    brand: "OrganizeIt",
    relevantProducts: "4",
    details: {
      weightCapacity: "10 lbs",
      swivel: "No",
      wheels: "No",
    },
    ratings: 4.2,

  },
  {
    id: 5,
    name: "Wireless Mouse",
    images: "image5.jpg",
    description: "A sleek wireless mouse with ergonomic design.",
    category: "Computer Accessories",
    variants: [
      {
        id: "v1",
        quantity: 200,
        importPrice: 15,
        retailPrice: 25,
        details: {
          color: "Black",
          material: "Plastic",
          adjustable: "No",
        },
      },
    ],
    brand: "TechGadgets",
    relevantProducts: "5",
    details: {
      weightCapacity: "N/A",
      swivel: "No",
      wheels: "No",
    },
    ratings: 4.6,

  },
  {
    id: 6,
    name: "Bluetooth Keyboard",
    images: "image6.jpg",
    description: "A compact Bluetooth keyboard for easy typing.",
    category: "Computer Accessories",
    variants: [
      {
        id: "v1",
        quantity: 150,
        importPrice: 30,
        retailPrice: 50,
        details: {
          color: "White",
          material: "Plastic",
          adjustable: "No",
        },
      },
    ],
    ratings: 4.0,
    brand: "KeyTech",
    relevantProducts: "6",
    details: {
      weightCapacity: "N/A",
      swivel: "No",
      wheels: "No",
    },
  },
];

export default function Product() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortProducts, setsortProducts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const filteredProducts = mockProducts.filter((product) => {
    const searchKey =
      filterCategory === "ratings"
        ? product.ratings.toString()
        : filterCategory === "brand"
        ? product.brand
         : filterCategory === "name"
        ? product.name :
        filterCategory === "category"
        ? product.category
        : product[filterCategory as keyof Product]?.toString().toLowerCase() ||
          "";
    return searchKey.includes(searchTerm.toLowerCase());
  });

  const sortedProduct = filteredProducts.sort((a, b) => {
    if (sortProducts === 'nameAZ') {
      return a.name.localeCompare(b.name);
    } else if (sortProducts === 'nameZA') {
      return b.name.localeCompare(a.name);
    } else if (sortProducts === 'ordersLowHigh') {
      return a.ratings - b.ratings;
    } else if (sortProducts === 'ordersHighLow') {
      return b.ratings - a.ratings;
    } else  if (sortProducts === 'brandAZ') {
      return a.brand.localeCompare(b.brand);
    } else if (sortProducts === 'brandZA') {
      return b.brand.localeCompare(a.brand);
    }
    else  if (sortProducts === 'categoryAZ') {
      return a.category.localeCompare(b.category);
    } else if (sortProducts === 'categoryZA') {
      return b.category.localeCompare(a.category);
    }

    return 0;
  });
  const currentproducts = sortedProduct.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleRowClick = (product: Product) => {
    navigate(`/admin/product/${product.id}`, {
      state: { ...product },
    });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    setSearchTerm("");
  };
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>
      <div className="flex-1 p-6">
        <Header />
        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4 rounded-md space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={
                filterCategory === "name"
                  ? "Search by name"
                  : filterCategory === "category"
                  ? "Search by Category"
                  : filterCategory === "brand"
                  ? "Search by Brand"
                  : filterCategory === "ratings"
                  ? "Search by Ratings"
                  : "Search..."
              }
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="border border-gray-300 px-4 py-2 rounded w-48 focus:outline-none focus:border-gray-500"
            >
              <option value="">All products</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="brand">Brand</option>
              <option value="ratings">Ratings</option>
            </select>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </div>
          <select
            value={sortProducts}
            onChange={(e) => setsortProducts(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-48 focus:outline-none focus:border-gray-500"
          >
            <option value="">Sort By</option>
            <option value="nameAZ">Name A-Z</option>
            <option value="nameZA">Name Z-A</option>
            <option value="categoryAZ">Category A-Z</option>
            <option value="categoryZA">Category Z-A</option>
            <option value="brandAZ">Brand A-Z</option>
            <option value="brandZA">Brand Z-A</option>
            <option value="ordersLowHigh">Ratings (Low to High)</option>
            <option value="ordersHighLow">Ratings (High to Low)</option>
           \
     
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Category</th>
                <th className="px-4 py-2 text-center">Brand</th>
                <th className="px-4 py-2 text-center">Ratings</th>
              
              </tr>
            </thead>
            <tbody>
              {currentproducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(product)}
                >
                  <td className="px-4 py-3 bg-gray-100 text-center">
                    {product.id}
                  </td>
                  <td className="px-4 py-3 bg-gray-100 text-center">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 bg-gray-100 text-center">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 bg-gray-100 text-center">
                    {product.brand}
                  </td>
                  <td className="px-4 py-3 bg-gray-100 text-center">
                    {product.ratings}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of{" "}
            {Math.ceil(filteredProducts.length / productsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * productsPerPage >= filteredProducts.length}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
