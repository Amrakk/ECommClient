import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';

export default function CustomerDetailed() {
  const location = useLocation();
  const customer = location.state;

  const [isBanned, setIsBanned] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false); 

 
  const purchaseHistory = [
    { date: '2023-10-15', products: 'Product A, Product B', amount: '$200' },
    { date: '2023-10-20', products: 'Product C', amount: '$150' },
   
  ];

  const handleBanToggle = () => {
    setShowConfirm(true);
  };

  const confirmBanToggle = () => {
    setIsBanned(!isBanned);
    setShowConfirm(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      <div className="flex-1 p-6 space-y-6">
        <Header />

        <div className="flex gap-6 bg-white shadow rounded-lg p-6">
          <div className="bg-gray-300 flex items-center justify-center w-64 h-64 rounded-lg overflow-hidden">
            <span className="text-gray-700 font-semibold text-xl">Customer's Avatar</span>
          </div>

          <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Information</h2>
            <p className="text-gray-600 mb-1"><span className="font-semibold">ID:</span> {customer?.id}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Name:</span> {customer?.name}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Email:</span> {customer?.email}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Phone Number:</span> {customer?.phoneNumber}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Date of Birth:</span> {customer?.dateOfBirth}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Address:</span> {customer?.address}</p>
            <div className="mt-6 flex space-x-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg shadow transition">
                Update
              </button>
              <button
                className={`px-6 py-2 rounded-lg shadow transition ${isBanned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                onClick={handleBanToggle}
              >
                {isBanned ? 'Activate' : 'Ban'}
              </button>
            </div>
          </div>

          <div className="w-64 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="font-semibold text-xl text-gray-800 mb-4">Customer's Review</h2>
            <p className="text-gray-600">{customer?.customerReview}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchase History</h2>
          <div className="flex font-semibold text-gray-700 border-b border-gray-300 pb-2">
            <span className="w-1/3">Date</span>
            <span className="w-1/3">Products</span>
            <span className="w-1/3">Total Amount</span>
          </div>
          {purchaseHistory.map((purchase, index) => (
            <div key={index} className="flex mt-4 text-gray-600">
              <span className="w-1/3">{purchase.date}</span>
              <span className="w-1/3">{purchase.products}</span>
              <span className="w-1/3">{purchase.amount}</span>
            </div>
          ))}
        </div>


        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-800 text-lg mb-4">
                Are you sure you want to {isBanned ? 'activate' : 'ban'} this customer?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded ${isBanned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  onClick={confirmBanToggle}
                >
                  {isBanned ? 'Activate' : 'Ban'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
