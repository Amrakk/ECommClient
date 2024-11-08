// Header.tsx
import React from 'react';
import { FaChartPie, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

export default function Header() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaChartPie className="text-lg" /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaUsers className="text-lg" /> <span>Customers</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaShoppingCart className="text-lg" /> <span>Sales Management</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaDollarSign className="text-lg" /> <span>Product Management</span>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaChartPie className="text-lg" /> <span>Report & Analytics</span>
        </li>
      </ul>
    </div>
  );
}
