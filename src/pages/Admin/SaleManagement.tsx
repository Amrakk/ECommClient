import React from 'react';
import Header from '../../layouts/Header.tsx';
import Sidebar from '../../layouts/Sidebar.tsx';

export default function Sale() {


  

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Section */}
        <header>
          <Header/>
        </header>

        {/* Filter and Add product Section */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <div className="flex items-center space-x-2">
          
            <input
              type="text"
              placeholder="Search by name, id, ..."
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
             <button className="bg-black text-white px-4 py-2 rounded">Search</button>
          </div>
          
        </div>

        {/* product Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Category</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Review</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                  <td className="px-4 py-3 bg-gray-100 text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        
      </div>
    </div>
  );
}
