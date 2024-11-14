import React from 'react';
// import Header from '../../layouts/Header.tsx';
import Sidebar from  '../../layouts/Sidebar.tsx';
import { useParams } from 'react-router-dom';

export default function CustomerDetailed() {
  const { id} = useParams();
  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 mb-4">
          
          <div className="w-10 h-10 rounded-full bg-gray-400 ml-auto"></div>
        </div>

        {/* Customer Information Section */}
        <div className="flex gap-4">
          {/* Customer's Avatar */}
          <div className="bg-green-400 flex items-center justify-center w-64 h-64">
            <span>Customer's avatar</span>
          </div>

          {/* Customer's Info */}
          <div className="flex-1 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-2">Customer's information</h2>
            <p>ID: {id}</p>
            <p>Name:</p>
            <p>Email:</p>
            <p>Phone number:</p>
            <p>Date of birth:</p>
            <p>Address:</p>
            <div className="mt-4 flex space-x-2">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded">Update</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>

          {/* Customer's Review */}
          <div className="w-64 bg-gray-300 p-4">
            <h2 className="font-semibold">Customer's review</h2>
          </div>
        </div>

        {/* Purchase History Section */}
        <div className="mt-4 bg-gray-100 p-4">
          <h2 className="font-semibold mb-2">Purchase history</h2>
          <div className="flex justify-between font-semibold border-b border-gray-300 pb-2">
            <span>Date</span>
            <span>Products</span>
            <span>Total amount</span>
          </div>
          {/* Example row */}
          <div className="flex justify-between mt-2">
            <span>2023-10-15</span>
            <span>Product A, Product B</span>
            <span>$200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
