// Header.tsx
import React from 'react';
import adminImage from '@/assets/error/sad.png';
// import { Link } from 'react-router-dom';
// import ecommImage from '@/assets/EComm.png';
// import { FaChartPie, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 mb-4">
          
    <div className="w-10 h-10 rounded-full bg-gray-400 ml-auto">
    <img
              src= {adminImage}
           
              className="rounded-full"
            />
    </div>
    </div>
  );
}
