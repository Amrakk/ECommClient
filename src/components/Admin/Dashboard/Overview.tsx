import { FaChartPie, FaDollarSign, FaUsers } from "react-icons/fa";

export default function Overview() {
    return (
        <div className="grid grid-cols-2 gap-6 ">
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

                    {/* <div className="flex flex-col space-y-2">
                    {[].map((data, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span className={`h-4 w-4 ${data.color} rounded-full`} />
                            <span className="text-gray-700">{data.name}</span>
                        </div>
                    ))}
                </div> */}
                </div>
            </div>
        </div>
    );
}
