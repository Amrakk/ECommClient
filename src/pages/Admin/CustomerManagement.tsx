import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layouts/Header.tsx';
import Sidebar from '../../layouts/Sidebar.tsx';

export default function Customer() {
  const navigate = useNavigate();
  
  

  const mockCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', orders: 5, totalSpent: '$500' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '234-567-8901', orders: 3, totalSpent: '$300' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '345-678-9012', orders: 8, totalSpent: '$800' },
    // Add more customers as needed
  ];

  

  const handleRowClick = (id: number ) => {
    navigate(`/admin/customer/${id}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      <div className="flex-1 p-6">
        <header >
         <Header/>
        </header>

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

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Phone number</th>
                <th className="px-4 py-2 text-center">Orders</th>
                <th className="px-4 py-2 text-center">Total spent</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(customer.id)}
                >
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.id}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.name}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.email}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.phoneNumber}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.orders}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{customer.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
}
