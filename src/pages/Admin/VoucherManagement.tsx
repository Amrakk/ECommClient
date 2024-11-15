import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header.tsx";
import Sidebar from "../../layouts/Sidebar.tsx";

type Discount = {
  type: 'percent' | 'amount';
  value: number;
};

type Voucher = {
  code: string;
  discount: Discount;
  expirationDate: string; // ISO 8601 format
};

const mockVouchers: Voucher[] = [
  {
    code: "MYCODE-C332-060A-4E4F-BF1B-9ECB",
    discount: {
      type: "percent",
      value: 10,
    },
    expirationDate: "2024-10-19T19:20:00.000Z",
  },
  {
    code: "SAVE20-4A3B-9C1D-8E7F-GH6J-KL5M",
    discount: {
      type: "amount",
      value: 20,
    },
    expirationDate: "2025-05-15T12:00:00.000Z",
  },
  {
    code: "WELCOME-NEW-USER-123",
    discount: {
      type: "percent",
      value: 15,
    },
    expirationDate: "2024-12-31T23:59:59.000Z",
  },
];

export default function Voucher() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const VouchersPerPage = 5;

  const [newVoucher, setNewVoucher] = useState<Voucher>({
    code: "",
    discount: { type: "percent", value: 0 },
    expirationDate: "",
  });

  
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewVoucher({
      ...newVoucher,
      discount: {
        ...newVoucher.discount,
        type: value as 'percent' | 'amount',
      },
    });
  };

  const handleVoucherSubmit = () => {
    // Here, you can push the new voucher to your mockVouchers or make an API call to save it
    mockVouchers.push(newVoucher);
    alert("Voucher Created!");
    // Optionally, navigate back to the voucher list page
    navigate("/admin/voucher");
  };

  const filteredVouchers = mockVouchers.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentVouchers = filteredVouchers.slice(
    (currentPage - 1) * VouchersPerPage,
    currentPage * VouchersPerPage
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>
      <div className="flex-1 p-6">
        <Header />
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create Voucher</h2>
          <div className="bg-white shadow-md p-6 rounded-md">
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-gray-700">Voucher Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newVoucher.code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="discount" className="block text-gray-700">Discount Type</label>
                <select
                  id="discount"
                  name="discountType"
                  value={newVoucher.discount.type}
                  onChange={handleDiscountTypeChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="percent">Percent</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <div>
                <label htmlFor="value" className="block text-gray-700">Discount Value</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={newVoucher.discount.value}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="expirationDate" className="block text-gray-700">Expiration Date</label>
                <input
                  type="datetime-local"
                  id="expirationDate"
                  name="expirationDate"
                  value={newVoucher.expirationDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleVoucherSubmit}
                  className="px-6 py-2 bg-black text-white rounded-md"
                >
                  Create Voucher
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher List Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-center">Code</th>
                <th className="px-4 py-2 text-center">Discount Type</th>
                <th className="px-4 py-2 text-center">Discount Value</th>
                <th className="px-4 py-2 text-center">Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {currentVouchers.map((voucher) => (
                <tr
                  key={voucher.code}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                 
                >
                  <td className="px-4 py-3 bg-gray-100 text-center">{voucher.code}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{voucher.discount.type}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{voucher.discount.value}</td>
                  <td className="px-4 py-3 bg-gray-100 text-center">{new Date(voucher.expirationDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {Math.ceil(filteredVouchers.length / VouchersPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * VouchersPerPage >= filteredVouchers.length}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
