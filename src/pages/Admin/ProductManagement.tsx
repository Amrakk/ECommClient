// Customer.tsx
import React from 'react';
import Header from '../../layouts/Header.tsx';

export default function Customer() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <Header />
      <div className="bg-gray-200 text-center p-4 mb-6">
        <h1 className="text-xl font-semibold">Search bar customer</h1>
      </div>

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
        <button className="bg-gray-700 text-white px-4 py-2 rounded">Add customer</button>
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
            {/* Placeholder rows for data */}
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
    </div>
  );
}
