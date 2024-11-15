import { useLocation} from 'react-router-dom';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';

export default function SaleOrderDetailed() {
  const location = useLocation();

  const sale = location.state;
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <Sidebar />
      </aside>

      <div className="flex-1 p-6 space-y-6">
        <Header />

        <div className="flex gap-6 bg-white shadow rounded-lg p-6">
          <div className="bg-gray-300 flex items-center justify-center w-64 h-64 rounded-lg overflow-hidden">
            <span className="text-gray-700 font-semibold text-xl">Sale Order Avatar</span>
          </div>

          <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sale Order Information</h2>
            <p className="text-gray-600 mb-1"><span className="font-semibold">User ID:</span> {sale?.userId}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Items:</span></p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Is Paid:</span> {sale?.isPaid ? "Yes" : "No"}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Shipping Address:</span></p>
            <p className="text-gray-600 mb-1">{sale?.shippingAddress.street}, {sale?.shippingAddress.ward.name}, {sale?.shippingAddress.district.name}, {sale?.shippingAddress.province.name}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Contact:</span> {sale?.shippingAddress.contactInfo}</p>

           
          </div>

        
        </div>

      </div>
    </div>
  );
}