export default function OrderTable() {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchase History</h2>
            <div className="flex font-semibold text-gray-700 border-b border-gray-300 pb-2">
                <span className="w-1/3">Date</span>
                <span className="w-1/3">Products</span>
                <span className="w-1/3">Total Amount</span>
            </div>
            {/* {purchaseHistory.map((purchase, index) => (
            <div key={index} className="flex mt-4 text-gray-600">
              <span className="w-1/3">{purchase.date}</span>
              <span className="w-1/3">{purchase.products}</span>
              <span className="w-1/3">{purchase.amount}</span>
            </div>
          ))} */}
        </div>
    );
}
