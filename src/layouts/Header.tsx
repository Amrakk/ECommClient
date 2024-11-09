// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

export default function Header() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaChartPie className="text-lg" />
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaUsers className="text-lg" />
          <Link to="/admin/customer">Customers</Link>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaShoppingCart className="text-lg" />
          <Link to="/admin/salemanagement">Sales Management</Link>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaDollarSign className="text-lg" />
          <Link to="/admin/product">Product Management</Link>
        </li>
        <li className="flex items-center space-x-3 cursor-pointer hover:text-white text-gray-400">
          <FaChartPie className="text-lg" />
          <Link to="/admin/report">Report & Analytics</Link>
        </li>
      </ul>
    </div>
  );
}
