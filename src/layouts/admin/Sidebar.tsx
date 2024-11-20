import { RxDashboard } from "react-icons/rx";
import { FaBox, FaGear } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RiDiscountPercentFill } from "react-icons/ri";
import ecommLogo from "@/assets/EComm-transparent-crop.webp";
import { FaChartPie, FaUsers, FaShoppingCart } from "react-icons/fa";

const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <RxDashboard className="text-lg transition-all" /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers className="text-lg transition-all" /> },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart className="text-lg transition-all" /> },
    { to: "/admin/products", label: "Products", icon: <FaBox className="text-lg transition-all" /> },
    { to: "/admin/vouchers", label: "Vouchers", icon: <RiDiscountPercentFill className="text-lg transition-all" /> },
    { to: "/admin/reports", label: "Report & Analytics", icon: <FaChartPie className="text-lg transition-all" /> },
    { to: "/admin/settings", label: "Settings", icon: <FaGear className="text-lg transition-all" /> },
];

export default function Sidebar() {
    const { pathname } = useLocation();

    return (
        <div className="bg-black h-full">
            <div className="">
                <img src={ecommLogo} className="mx-auto size-full object-center " />
            </div>

            <ul className="space-y-5">
                {menuItems.map((item) => (
                    <li
                        key={item.to}
                        className={`flex items-center space-x-3 cursor-pointer text-xl hover:text-white ${
                            pathname.includes(item.to) ? "text-white font-bold" : "text-gray-400"
                        }`}
                    >
                        {item.icon}
                        <Link to={item.to}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
