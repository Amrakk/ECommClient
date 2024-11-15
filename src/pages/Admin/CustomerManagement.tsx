import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layouts/Header.tsx';
import Sidebar from '../../layouts/Sidebar.tsx';

type Customer = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  orders: number;
  totalSpent: string;
  dateOfBirth: string;
  address: string;
  customerReview? : string;
};

const mockCustomers: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', orders: 5, totalSpent: '$500', dateOfBirth: '03/10/1985', address: '1 Lu Gia P15 Q11', customerReview: 'Good shop' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '234-567-8901', orders: 3, totalSpent: '$300', dateOfBirth: '12/05/1992', address: '123 Main St, City A' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '345-678-9012', orders: 8, totalSpent: '$800', dateOfBirth: '07/14/1988', address: '456 Oak St, City B' },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', phoneNumber: '456-789-0123', orders: 1, totalSpent: '$100', dateOfBirth: '01/20/1995', address: '789 Pine St, City C', customerReview: 'Excellent service' },
    { id: 5, name: 'Emily Davis', email: 'emily@example.com', phoneNumber: '567-890-1234', orders: 2, totalSpent: '$200', dateOfBirth: '11/30/1980', address: '321 Maple St, City D' },
    { id: 6, name: 'Chris Wilson', email: 'chris@example.com', phoneNumber: '678-901-2345', orders: 4, totalSpent: '$400', dateOfBirth: '04/11/1990', address: '654 Birch St, City E' },
    { id: 7, name: 'Jessica Taylor', email: 'jessica@example.com', phoneNumber: '789-012-3456', orders: 6, totalSpent: '$600', dateOfBirth: '09/17/1987', address: '987 Cedar St, City F', customerReview: 'Highly recommend' },
    { id: 8, name: 'Daniel Martinez', email: 'daniel@example.com', phoneNumber: '890-123-4567', orders: 7, totalSpent: '$700', dateOfBirth: '05/22/1993', address: '135 Elm St, City G' },
    { id: 9, name: 'Sophia Garcia', email: 'sophia@example.com', phoneNumber: '901-234-5678', orders: 9, totalSpent: '$900', dateOfBirth: '10/04/1982', address: '246 Spruce St, City H' },
    { id: 10, name: 'James Anderson', email: 'james@example.com', phoneNumber: '012-345-6789', orders: 10, totalSpent: '$1000', dateOfBirth: '08/15/1975', address: '357 Fir St, City I', customerReview: 'Will buy again' }
  
];

export default function Customer() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortCustomer, setSortCustomer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const filteredCustomers = mockCustomers.filter((customer) => {
    const searchKey =
      filterCategory === 'order' ? customer.orders.toString() :
      filterCategory === 'totalSpent' ? customer.totalSpent :
      customer[filterCategory as keyof Customer]?.toString().toLowerCase() || '';
    return searchKey.includes(searchTerm.toLowerCase());
  });

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortCustomer === 'nameAZ') {
      return a.name.localeCompare(b.name);
    } else if (sortCustomer === 'nameZA') {
      return b.name.localeCompare(a.name);
    } else if (sortCustomer === 'ordersLowHigh') {
      return a.orders - b.orders;
    } else if (sortCustomer === 'ordersHighLow') {
      return b.orders - a.orders;
    } else if (sortCustomer === 'totalSpentLowHigh') {
      return parseInt(a.totalSpent.replace('$', '')) - parseInt(b.totalSpent.replace('$', ''));
    } else if (sortCustomer === 'totalSpentHighLow') {
      return parseInt(b.totalSpent.replace('$', '')) - parseInt(a.totalSpent.replace('$', ''));
    }
    return 0;
  });

  const currentCustomers = sortedCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const handleRowClick = (customer: Customer) => {
    navigate(`/admin/customer/${customer.id}`, {
      state: { ...customer },
    });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    setSearchTerm(''); 
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
                filterCategory === 'name' ? "Search by name" :
                filterCategory === 'order' ? "Search by order count" :
                filterCategory === 'totalSpent' ? "Search by total spent" :
                filterCategory === 'email' ? "Search by email" :
                "Search..."
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
              <option value="">All Customers</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="order">Orders</option>
              <option value="totalSpent">Total Spent</option>
            </select>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
          </div>
          <select
            value={sortCustomer}
            onChange={(e) => setSortCustomer(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-48 focus:outline-none focus:border-gray-500"
          >
            <option value="">Sort By</option>
            <option value="nameAZ">Name A-Z</option>
            <option value="nameZA">Name Z-A</option>
            <option value="ordersLowHigh">Orders (Low to High)</option>
            <option value="ordersHighLow">Orders (High to Low)</option>
            <option value="totalSpentLowHigh">Total Spent (Low to High)</option>
            <option value="totalSpentHighLow">Total Spent (High to Low)</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Phone Number</th>
                <th className="px-4 py-2 text-center">Orders</th>
                <th className="px-4 py-2 text-center">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(customer)}
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

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {Math.ceil(filteredCustomers.length / customersPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * customersPerPage >= filteredCustomers.length}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
