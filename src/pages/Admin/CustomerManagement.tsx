import React, { useState } from 'react';
import Header from '../../layouts/Header.tsx';
import { FaSearch } from "react-icons/fa";

export default function Customer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    avatar: '',
  });

  // Function to handle form data change
  const handleChange = (element) => {
    const { name, value, files } = element.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Function to handle form submission
  const handleSave = () => {
    // Logic to save customer data goes here
    console.log("Customer data saved:", customerData);
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
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 w-1/2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <img
              src="/assets/admin.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Admin</span>
          </div>
        </header>

        {/* Filter and Add Customer Section */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-700 text-white px-4 py-2 rounded">Filter options</button>
            <input
              type="text"
              placeholder="Search by name, id, ..."
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add customer
          </button>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone number</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Total spent</th>
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
              <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Avatar</label>
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
