import { USER_ROLE } from "@/constants";
import Header from "@/layouts/admin/Header";
import Sidebar from "@/layouts/admin/Sidebar";
import { useUserStore } from "@/stores/user.store";
import { Outlet, Navigate, useLocation, matchPath } from "react-router-dom";

const existPaths = [
    "/reports",
    "/advanced",
    "/vouchers",
    "/dashboard",
    "/users/:id?",
    "/orders/:id?",
    "/products/:id?",
];

export default function AdminRoute() {
    const user = useUserStore((state) => state.user);
    const location = useLocation();

    const isValidPath = existPaths.some((path) =>
        matchPath(
            {
                path: `/admin${path}`,
                end: true,
            },
            location.pathname
        )
    );

    if (user?.role === USER_ROLE.ADMIN)
        return (
            <>
                {isValidPath ? (
                    <div className="flex bg-gray-100 min-h-screen">
                        <aside className="w-72 bg-black text-white p-6">
                            <Sidebar />
                        </aside>
                        <div className="flex-1">
                            <Header />
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </>
        );
    else return <Navigate to="/home" />;
}
