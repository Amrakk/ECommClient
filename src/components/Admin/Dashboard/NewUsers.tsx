import { DashboardData } from "@/apis/services";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type Props = {
    data: DashboardData["newUserData"];
};

export default function NewUsers(props: Props) {
    const { users, total } = props.data;
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
            {/* Header Section */}
            <div className="relative border cursor-pointer overflow-hidden" onClick={() => navigate("/admin/users")}>
                <div className="absolute bg-gray-300 rounded-r-full bg-opacity-40 size-44 -translate-x-8 -top-16 " />
                <div className="p-6 w-full flex justify-between items-center">
                    <div>
                        <FaUserPlus className="text-black" size={48} />
                    </div>
                    <div className="">
                        <h3 className="text-lg font-semibold text-gray-700">New Users This Month</h3>
                        <p className="text-2xl font-bold text-blue-500 text-end">{users.length}</p>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="space-y-4 mt-4 p-6">
                {users.map((user, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="flex items-center gap-8 hover:bg-gray-100 p-2 rounded-md transition-all"
                    >
                        {/* Avatar */}
                        <img
                            src={user.avatarUrl}
                            alt={`${user.name}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover shadow-md"
                        />

                        {/* Name */}
                        <p className="text-gray-900 text-lg font-medium">{user.name}</p>
                    </div>
                ))}
            </div>

            {/* Showing X of Y Users */}
            <p className="text-sm text-gray-500 mt-4 text-center">
                Showing {Math.min(users.length, 15)} of {total} new users
            </p>

            {/* View All Button */}
            {users.length > 5 && (
                <button
                    className="w-full mt-4 py-2 bg-black text-white rounded-lg shadow-md hover:bg-opacity-80  transition"
                    onClick={() => navigate("/admin/users")}
                >
                    View All Users
                </button>
            )}
        </div>
    );
}
