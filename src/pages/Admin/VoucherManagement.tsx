import React, { useState } from 'react';
import Header from '../../layouts/Header.tsx';


export default function Voucher() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucherData, setvoucherData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    detailed: '',
    voucher_review: '',
    voucher_avatar: '',
  });

  // Function to handle form data change
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = element.target;
    setvoucherData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Function to handle form submission
  const handleSave = () => {
    // Logic to save voucher data goes here
    console.log("voucher data saved:", voucherData);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <Header />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          
          <div className="flex items-center space-x-3">
            <img
              src="src/assets/EComm.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
           
          </div>
        </header>

        {/* Filter and Add voucher Section */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <div className="flex items-center space-x-2">
          
            <input
              type="text"
              placeholder="Search by name, id, ..."
              className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-gray-500"
            />
             <button className="bg-black text-white px-4 py-2 rounded">Search</button>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add voucher
          </button>
        </div>

        {/* voucher Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Review</th>
              </tr>
            </thead>
            <tbody>
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

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add new voucher</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={voucherData.name}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    name="Price"
                    value={voucherData.price}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Category</label>
                  <input
                    type="text"
                    name="Category"
                    value={voucherData.category}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="text"
                    name="Quantity"
                    value={voucherData.quantity}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">voucher's Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 w-full rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
