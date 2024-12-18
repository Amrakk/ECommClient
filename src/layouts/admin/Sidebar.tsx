import { FaBox } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import ecommLogo from "@/assets/EComm-transparent-crop.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard className="text-lg transition-all" /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers className="text-lg transition-all" /> },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart className="text-lg transition-all" /> },
    { to: "/admin/products", label: "Products", icon: <FaBox className="text-lg transition-all" /> },
    { to: "/admin/vouchers", label: "Vouchers", icon: <RiDiscountPercentFill className="text-lg transition-all" /> },
    { to: "/admin/advanced", label: "Advanced", icon: <IoSettingsSharp className="text-lg transition-all" /> },
];

export default function Sidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="bg-black h-full select-none">
            <div className="cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                <img src={ecommLogo} className="mx-auto size-full object-center" />
            </div>

            <ul className="space-y-5">
                {menuItems.map((item) => (
                    <li key={item.to} className="w-full">
                        <Link
                            to={item.to}
                            className={`flex items-center space-x-3 cursor-pointer text-xl hover:text-white w-full ${
                                pathname.includes(item.to) ? "text-white font-bold" : "text-gray-400"
                            }`}
                        >
                            {item.icon}
                            <div>{item.label}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
