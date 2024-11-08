import {
  FaUsers,
  FaDollarSign,
  
  FaChartPie,
  FaSearch,
} from "react-icons/fa";

import Header from '../../layouts/Header.tsx';

// Define type for the pie chart data structure
interface PieChartData {
  name: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const pieChartData: PieChartData[] = [
    { name: "Product A", color: "bg-purple-500" },
    { name: "Product B", color: "bg-blue-500" },
    { name: "Product C", color: "bg-green-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
       <Header />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 w-1/2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <img
              src="/admin.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Admin</span>
          </div>
        </header>

        {/* Dashboard Metrics and Layout */}
        <div className="flex space-x-6">
          {/* Metrics Section */}
          <div className="grid grid-cols-2 gap-6 w-2/3">
            <div className="flex items-center p-6 bg-white rounded-lg shadow-lg">
              <FaUsers className="text-blue-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">1,200</p>
              </div>
            </div>
            <div className="flex items-center p-6 bg-white rounded-lg shadow-lg">
              <FaDollarSign className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Monthly Revenue</h3>
                <p className="text-2xl font-bold">$12,000</p>
              </div>
            </div>
            <div className="col-span-2 flex bg-white rounded-lg shadow-lg p-10">
              <h3 className="text-lg font-semibold">Total Order</h3>
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg shadow-lg p-6 col-span-2">
              <div className="flex items-center space-x-4">
                <FaChartPie className="text-purple-500 text-2xl" />
                <h3 className="text-lg font-semibold">Best Selling Product</h3>
              </div>
              <div className="flex space-x-8">
                {/* Pie Chart */}
                <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  Pie Chart
                </div>

                {/* Legend */}
                <div className="flex flex-col space-y-2">
                  {pieChartData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className={`h-4 w-4 ${data.color} rounded-full`} />
                      <span className="text-gray-700">{data.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* New Users This Month Section */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">New Users This Month</h3>
            <p className="text-2xl font-bold text-blue-500">150</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
