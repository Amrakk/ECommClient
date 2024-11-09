import React, { useState } from 'react';
import Header from '../../layouts/Header.tsx';


export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setproductData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    detailed: '',
    product_review: '',
    product_avatar: '',
  });

  // Function to handle form data change
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = element.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Function to handle form submission
  const handleSave = () => {
    // Logic to save product data goes here
    console.log("product data saved:", productData);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <Header />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          
          <div className="flex items-center space-x-3">
            <img
              src="/assets/admin.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Admin</span>
          </div>
        </header>

        {/* Filter and Add product Section */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <div className="flex items-center space-x-2">
          
            <input
              type="text"
              placeholder="Search by name, id, ..."
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
             <button className="bg-gray-700 text-white px-4 py-2 rounded">Search</button>
          </div>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add product
          </button>
        </div>

        {/* product Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Review</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 bg-gray-100"></td>
                  <td className="px-4 py-3 bg-gray-100"></td>
                  <td className="px-4 py-3 bg-gray-100"></td>
                  <td className="px-4 py-3 bg-gray-100"></td>
                  <td className="px-4 py-3 bg-gray-100"></td>
                  <td className="px-4 py-3 bg-gray-100"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add new Product</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    name="Price"
                    value={productData.price}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Category</label>
                  <input
                    type="text"
                    name="Category"
                    value={productData.category}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="text"
                    name="Quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Product's Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
