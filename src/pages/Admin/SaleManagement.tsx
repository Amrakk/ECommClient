import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header.tsx";
import Sidebar from "../../layouts/Sidebar.tsx";

type Address = {
  street: string;
  ward: {
    code: string;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  province: {
    id: number;
    name: string;
  };
  contactInfo: string;
};

type Item = {
  OrderId: string;
  variantId: string;
  quantity: number;
};

type Sale = {
  userId: string;
  items: Item[];
  loyaltyPointsDiscount: number;
  isPaid: boolean;
  shippingAddress: Address;
  status: string;
  date: string; // Added date field
};

// Mock sales with date
const mockSales: Sale[] = [
  {
    userId: "1",
    items: [{ OrderId: "67184af312b13e784a0570b6", variantId: "variant_011", quantity: 1 }],
    loyaltyPointsDiscount: 0,
    isPaid: false,
    shippingAddress: {
      street: "57 To Hien Thanh",
      ward: { code: "21013", name: "Phường 13" },
      district: { id: 1452, name: "Quận 10" },
      province: { id: 202, name: "Hồ Chí Minh" },
      contactInfo: "0123456789",
    },
    status: "pending",
    date: "2024-11-15", // Example date
  },
  {
    userId: "2",
    items: [{ OrderId: "1234567890abcdef12345678", variantId: "variant_002", quantity: 2 }],
    loyaltyPointsDiscount: 10,
    isPaid: true,
    shippingAddress: {
      street: "123 Nguyen Trai",
      ward: { code: "21014", name: "Phường 14" },
      district: { id: 1453, name: "Quận 11" },
      province: { id: 202, name: "Hồ Chí Minh" },
      contactInfo: "0987654321",
    },
    status: "completed",
    date: "2024-11-14", // Example date
  },
  {
    userId: "3",
    items: [{ OrderId: "abcdef1234567890abcdef12", variantId: "variant_003", quantity: 3 }],
    loyaltyPointsDiscount: 5,
    isPaid: false,
    shippingAddress: {
      street: "456 Le Lai",
      ward: { code: "21015", name: "Phường 15" },
      district: { id: 1454, name: "Quận 12" },
      province: { id: 202, name: "Hồ Chí Minh" },
      contactInfo: "0912345678",
    },
    status: "pending",
    date: "2024-11-13", // Example date
  },
];

export default function SaleManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 5;

  const handleRowClick = (sale: Sale) => {
    navigate(`/admin/sale/${sale.userId}`, {
      state: { ...sale },
    });
  };

  const currentSales = mockSales.slice((currentPage - 1) * salesPerPage, currentPage * salesPerPage);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>
      <div className="flex-1 p-6">
        <Header />
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">User ID</th>
                <th className="px-4 py-2 text-center">Items</th>
                <th className="px-4 py-2 text-center">Is Paid</th>
              </tr>
            </thead>
            <tbody>
              {currentSales.map((sale) => (
                <tr
                  key={sale.userId}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(sale)}
                >
                  <td className="px-4 py-3 text-center">{sale.date}</td>
                  <td className="px-4 py-3 text-center">{sale.userId}</td>
                  <td className="px-4 py-3 text-center">
                    {sale.items.map((item) => (
                      <div key={item.OrderId}>
                        {item.variantId} (Qty: {item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-center">{sale.isPaid ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {Math.ceil(mockSales.length / salesPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * salesPerPage >= mockSales.length}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}