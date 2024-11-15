import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';

export default function ProductDetailed() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [showConfirm, setShowConfirm] = useState(false); // Show confirmation modal


  const handleDeleteToggle = () => {
    setShowConfirm(true);
  };

  
  const confirmDelete = () => {
 
    console.log(`Product with ID ${product?.id} deleted`);

    setShowConfirm(false); 


    navigate('/admin/product-management');
  };


  const handleCancel = () => {
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
            <span className="text-gray-700 font-semibold text-xl">Product's Avatar</span>
          </div>

          <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Information</h2>
            <p className="text-gray-600 mb-1"><span className="font-semibold">ID:</span> {product?.id}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Name:</span> {product?.name}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {product?.category}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Brand:</span> {product?.brand}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Ratings:</span> {product?.ratings}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Description:</span> {product?.description}</p>
            <div className="mt-6 flex space-x-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg shadow transition">
                Update
              </button>
              <button
                className="px-6 py-2 rounded-lg shadow transition bg-red-500 text-white"
                onClick={handleDeleteToggle}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="w-64 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="font-semibold text-xl text-gray-800 mb-4">Product's Review</h2>
            <p className="text-gray-600">{product?.productReview}</p>
          </div>
        </div>

      

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-800 text-lg mb-4">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
